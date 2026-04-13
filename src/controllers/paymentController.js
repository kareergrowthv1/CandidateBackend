const Razorpay = require('razorpay');
const crypto = require('crypto');
const { pool, DB_NAME } = require('../config/db');

/**
 * Get active subscription plans for candidates
 * GET /payments/plans
 */
exports.getPlans = async (req, res, next) => {
    try {
        const query = 'SELECT * FROM superadmin_db.candidate_plans WHERE is_active = 1 ORDER BY sort_order ASC';
        const [plans] = await pool.query(query);
        
        // Parse features JSON if it's a string
        const formattedPlans = plans.map(plan => ({
            ...plan,
            features: typeof plan.features === 'string' ? JSON.parse(plan.features) : (plan.features || [])
        }));

        res.status(200).json({
            success: true,
            data: formattedPlans
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create a Razorpay order
 * POST /payments/create-order
 */
exports.createOrder = async (req, res, next) => {
    try {
        const { planId, organizationId, candidateId, email } = req.body;

        if (!planId || !organizationId || !candidateId || !email) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // 1. Fetch plan details
        const [plans] = await pool.query('SELECT * FROM superadmin_db.candidate_plans WHERE id = ?', [planId]);
        const plan = plans[0];
        if (!plan) {
            return res.status(404).json({ success: false, message: 'Plan not found' });
        }

        const amountInPaise = Math.round(parseFloat(plan.price) * 100);

        // 2. Initialize Razorpay (only if price > 0)
        let orderId = 'ORD_FREE_' + Date.now();
        let razorpayKeyId = process.env.RAZORPAY_KEY_ID;

        if (amountInPaise > 0) {
            // Check for placeholder keys
            if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes('your_key_id') || 
                !process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET.includes('your_key_secret')) {
                console.error('[paymentController] Error: Placeholder credentials detected');
                return res.status(500).json({ 
                    success: false, 
                    message: 'Razorpay credentials are not configured or are using placeholders.' 
                });
            }

            const razorpay = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET,
            });

            const options = {
                amount: amountInPaise,
                currency: 'INR',
                receipt: `receipt_cand_${candidateId.slice(0, 8)}_${Date.now()}`,
                notes: {
                    candidate_id: candidateId,
                    plan_id: planId,
                    email: email
                }
            };

            try {
                const order = await razorpay.orders.create(options);
                orderId = order.id;
            } catch (rzpError) {
                console.error('[paymentController] Razorpay Order Creation Error:', rzpError);
                return res.status(500).json({
                    success: false,
                    message: 'Razorpay order creation failed',
                    error: rzpError.message || rzpError
                });
            }
        }

        // 3. Save pending payment record in superadmin_db.payments (unified table)
        const paymentId = crypto.randomUUID();
        const idBuffer = Buffer.from(paymentId.replace(/-/g, ''), 'hex');
        
        // Generate sequential Invoice Number
        const [countRows] = await pool.query('SELECT COUNT(*) as count FROM superadmin_db.payments');
        const paymentCount = (countRows[0]?.count || 0) + 1;
        const invoiceNumber = `INV-C-${String(paymentCount).padStart(6, '0')}`;
        
        const amountInDecimal = parseFloat(plan.price);
        const currency = 'INR';

        await pool.query(`
            INSERT INTO superadmin_db.payments 
            (id, admin_user_id, admin_email, user_type, plan_id, client_schema, payment_type, amount, currency, payment_status, transaction_id, invoice_number, created_at, updated_at)
            VALUES (?, ?, ?, 'CANDIDATE', ?, ?, 'SUBSCRIPTION', ?, ?, ?, ?, ?, NOW(), NOW())
        `, [
            idBuffer, candidateId, email, planId, organizationId, 
            amountInDecimal, currency, amountInPaise > 0 ? 'PENDING' : 'COMPLETED', 
            orderId, invoiceNumber
        ]);

        // 4. If free plan, update candidate immediately and deactivate previous ones
        if (amountInPaise === 0) {
            // Deactivate all previous active candidate plans in unified table
            await pool.query('UPDATE superadmin_db.payments SET is_active = FALSE WHERE admin_user_id = ? AND user_type = \'CANDIDATE\' AND is_active = TRUE', [candidateId]);
            
            // Mark the new one as active
            await pool.query('UPDATE superadmin_db.payments SET is_active = TRUE WHERE transaction_id = ?', [orderId]);

            const duration = plan.duration_months || 1;

            // 4a. ENSURE CANDIDATE EXISTS (Upsert)
            const [existing] = await pool.query('SELECT 1 FROM candidates_db.college_candidates WHERE candidate_id = ?', [candidateId]);
            if (existing.length === 0) {
                const candidateCode = 'CAN-' + candidateId.slice(0, 8).toUpperCase();
                await pool.query(`
                    INSERT INTO candidates_db.college_candidates 
                    (candidate_id, organization_id, candidate_code, candidate_name, email, registration_paid, plan_id, subscription_expiry)
                    VALUES (?, ?, ?, ?, ?, TRUE, ?, DATE_ADD(NOW(), INTERVAL ? MONTH))
                `, [candidateId, organizationId, candidateCode, 'Candidate', email, planId, duration]);
            } else {
                await pool.query(`
                    UPDATE candidates_db.college_candidates 
                    SET registration_paid = TRUE, plan_id = ?, subscription_expiry = DATE_ADD(NOW(), INTERVAL ? MONTH)
                    WHERE candidate_id = ?
                `, [planId, duration, candidateId]);
            }
            
            return res.status(200).json({
                success: true,
                message: 'Free plan activated',
                isFree: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            data: {
                orderId: orderId,
                key: razorpayKeyId,
                amount: amountInDecimal,
                currency: currency,
                invoiceNumber: invoiceNumber
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Verify Razorpay payment signature
 * POST /payments/verify-payment
 */
exports.verifyPayment = async (req, res, next) => {
    let paymentRec = null;
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, candidateId } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Invalid payment details' });
        }

        // 1. Verify signature
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const generated_signature = crypto
            .createHmac('sha256', secret)
            .update(razorpay_order_id + '|' + razorpay_payment_id)
            .digest('hex');

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        // 2. Update payment record and deactivate previous ones (in unified table)
        // Deactivate all previous active candidate plans
        await pool.query('UPDATE superadmin_db.payments SET is_active = FALSE WHERE admin_user_id = ? AND user_type = \'CANDIDATE\' AND is_active = TRUE', [candidateId]);
        
        // Mark the new one as active and completed
        await pool.query(`
            UPDATE superadmin_db.payments 
            SET transaction_reference = ?, gateway_response = ?, payment_status = 'COMPLETED', is_active = TRUE, updated_at = NOW(), payment_date = NOW()
            WHERE transaction_id = ?
        `, [razorpay_payment_id, JSON.stringify(req.body), razorpay_order_id]);

        // 3. Fetch payment details for response and candidate update
        const [pRows] = await pool.query('SELECT admin_email as email, client_schema as organizationId, invoice_number as invoiceNumber, amount, plan_id FROM superadmin_db.payments WHERE transaction_id = ?', [razorpay_order_id]);
        paymentRec = pRows[0];
        const planId = paymentRec?.plan_id;

        if (planId) {
            const [plans] = await pool.query('SELECT name, duration_months FROM superadmin_db.candidate_plans WHERE id = ?', [planId]);
            const plan = plans[0];
            const duration = plan?.duration_months || 1;

            // 3a. ENSURE CANDIDATE EXISTS (Upsert)
            const [existing] = await pool.query('SELECT 1 FROM candidates_db.college_candidates WHERE candidate_id = ?', [candidateId]);
            if (existing.length === 0) {
                const candidateCode = 'CAN-' + candidateId.slice(0, 8).toUpperCase();
                await pool.query(`
                    INSERT INTO candidates_db.college_candidates 
                    (candidate_id, organization_id, candidate_code, candidate_name, email, registration_paid, plan_id, subscription_expiry)
                    VALUES (?, ?, ?, ?, ?, TRUE, ?, DATE_ADD(NOW(), INTERVAL ? MONTH))
                `, [candidateId, paymentRec?.organizationId || null, candidateCode, 'Candidate', paymentRec?.email || 'N/A', planId, duration]);
            } else {
                await pool.query(`
                    UPDATE candidates_db.college_candidates 
                    SET registration_paid = TRUE, plan_id = ?, subscription_expiry = DATE_ADD(NOW(), INTERVAL ? MONTH)
                    WHERE candidate_id = ?
                `, [planId, duration, candidateId]);
            }

            res.status(200).json({
                success: true,
                message: 'Payment verified and plan activated',
                data: {
                    id: razorpay_order_id,
                    organizationId: paymentRec?.organizationId || null,
                    invoiceNumber: paymentRec?.invoiceNumber || null,
                    amount: paymentRec?.amount || 0,
                    paymentStatus: 'COMPLETED',
                    paymentMethod: 'RAZORPAY',
                    razorpayOrderId: razorpay_order_id,
                    razorpayPaymentId: razorpay_payment_id,
                    paymentDate: new Date(),
                    creditsExpiryDate: new Date(new Date().setMonth(new Date().getMonth() + duration)),
                    validTill: new Date(new Date().setDate(new Date().getDate() + 30)),
                    planId: planId,
                    planName: plan?.name || 'Unknown',
                    isActive: true
                }
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Payment verified but no plan details found'
            });
        }
    } catch (error) {
        next(error);
    }
};

/**
 * Get current subscription status for a candidate
 * GET /payments/status
 */
exports.getSubscriptionStatus = async (req, res, next) => {
    try {
        const candidateId = req.user.id || req.user.candidate_id;

        if (!candidateId) {
            return res.status(400).json({ success: false, message: 'Candidate ID not found in session' });
        }

        const query = `
            SELECT plan_id, is_active, payment_date, created_at 
            FROM superadmin_db.payments 
            WHERE admin_user_id = ? AND user_type = 'CANDIDATE' AND is_active = TRUE
            ORDER BY created_at DESC LIMIT 1
        `;
        const [rows] = await pool.query(query, [candidateId]);
        const payment = rows[0];

        if (!payment) {
            return res.status(200).json({
                success: true,
                isActive: false,
                message: 'No active subscription found'
            });
        }

        // For candidates, we also check college_candidates for registration_paid and expiry
        const [candidateRows] = await pool.query('SELECT subscription_expiry, registration_paid FROM candidates_db.college_candidates WHERE candidate_id = ?', [candidateId]);
        const candidate = candidateRows[0];

        if (!candidate || !candidate.registration_paid) {
            return res.status(200).json({
                success: true,
                isActive: false,
                message: 'Registration not marked as paid'
            });
        }

        // Check if expired
        const expiryDate = new Date(candidate.subscription_expiry);
        const now = new Date();
        const isActive = now < expiryDate;

        res.status(200).json({
            success: true,
            isActive: isActive,
            planId: payment.plan_id,
            expiryDate: candidate.subscription_expiry,
            message: isActive ? 'Subscription is active' : 'Subscription has expired'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get payment history for a candidate
 * GET /payments/history
 */
exports.getPaymentHistory = async (req, res, next) => {
    try {
        const candidateId = req.user.id || req.user.candidate_id;

        if (!candidateId) {
            return res.status(400).json({ success: false, message: 'Candidate ID not found' });
        }

        const query = `
            SELECT 
                id, 
                transaction_id, 
                transaction_reference as razorpay_payment_id,
                invoice_number,
                amount,
                currency,
                payment_status as status,
                payment_date,
                valid_till,
                created_at,
                plan_id,
                is_active
            FROM superadmin_db.payments 
            WHERE admin_user_id = ? AND user_type = 'CANDIDATE'
            ORDER BY created_at DESC
        `;
        const [rows] = await pool.query(query, [candidateId]);

        // Fetch plan names for these payments
        const planIds = [...new Set(rows.map(r => r.plan_id).filter(Boolean))];
        let plans = {};
        if (planIds.length > 0) {
            const [pRows] = await pool.query('SELECT id, name FROM superadmin_db.candidate_plans WHERE id IN (?)', [planIds]);
            plans = pRows.reduce((acc, p) => ({ ...acc, [p.id]: p.name }), {});
        }

        const history = rows.map(r => ({
            ...r,
            id: r.id.toString('hex'), // Convert binary ID to hex string if it's a buffer
            planName: plans[r.plan_id] || 'Unknown Plan'
        }));

        res.status(200).json({
            success: true,
            data: history
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get candidate credits overview
 * GET /payments/credits/overview
 */
exports.getCandidateCredits = async (req, res, next) => {
    try {
        const candidateId = req.user.id || req.user.candidate_id;

        // Resolve candidateId (handle SSO email sessions)
        let resolvedId = candidateId;
        if (candidateId && (candidateId.includes('@') || !candidateId.includes('-'))) {
            const [lookup] = await pool.query(
                `SELECT candidate_id FROM candidates_db.college_candidates WHERE LOWER(email) = LOWER(?) OR candidate_id = ? LIMIT 1`,
                [candidateId, candidateId]
            );
            if (lookup.length > 0) {
                resolvedId = lookup[0].candidate_id;
            }
        }

        if (!resolvedId) {
            return res.status(400).json({ success: false, message: 'Candidate identity resolution failed' });
        }

        // 1. Fetch active subscription summary from candidates_db.candidate_subscriptions
        const queryActive = `
            SELECT plan_name, valid_till, total_credits as totalAllocated, utilized_credits as utilized, status
            FROM candidates_db.candidate_subscriptions
            WHERE candidate_id = ? AND status = 'ACTIVE'
            ORDER BY created_at DESC LIMIT 1
        `;
        const [activeRows] = await pool.query(queryActive, [resolvedId]);
        
        if (activeRows.length === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    hasActivePlan: false,
                    totalAllocated: 0,
                    utilized: 0,
                    remaining: 0
                }
            });
        }

        const activeSub = activeRows[0];
        
        res.status(200).json({
            success: true,
            data: {
                hasActivePlan: true,
                planName: activeSub.plan_name,
                validTill: activeSub.valid_till,
                totalAllocated: activeSub.totalAllocated,
                utilized: activeSub.utilized,
                remaining: Math.max(0, activeSub.totalAllocated - activeSub.utilized),
                status: activeSub.status
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Deduct credits for a specific service
 * POST /payments/credits/deduct
 */
exports.deductCredits = async (req, res, next) => {
    try {
        const candidateId = req.user.id || req.user.candidate_id;
        const { serviceType, serviceName, creditsToDeduct, metadata } = req.body;

        if (!candidateId || !serviceType || !serviceName || creditsToDeduct === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Resolve candidateId (handle SSO email sessions)
        let resolvedId = candidateId;
        if (candidateId && (candidateId.includes('@') || !candidateId.includes('-'))) {
            const [lookup] = await pool.query(
                `SELECT candidate_id FROM candidates_db.college_candidates WHERE LOWER(email) = LOWER(?) OR candidate_id = ? LIMIT 1`,
                [candidateId, candidateId]
            );
            if (lookup.length > 0) {
                resolvedId = lookup[0].candidate_id;
            }
        }

        if (!resolvedId) {
            return res.status(400).json({ success: false, message: 'Candidate identity resolution failed' });
        }

        // 1. Check current balance from summary table
        const querySub = 'SELECT id, total_credits, utilized_credits FROM candidates_db.candidate_subscriptions WHERE candidate_id = ? AND status = "ACTIVE" ORDER BY created_at DESC LIMIT 1';
        const [subRows] = await pool.query(querySub, [resolvedId]);
        
        if (subRows.length === 0) {
            return res.status(400).json({ success: false, message: 'No active plan found. Please purchase a subscription to continue.' });
        }

        const activeSub = subRows[0];
        const remaining = activeSub.total_credits - activeSub.utilized_credits;

        if (remaining < creditsToDeduct) {
            return res.status(400).json({ 
                success: false, 
                message: `Insufficient credits. You have ${remaining} but this service requires ${creditsToDeduct}.`,
                remaining: remaining
            });
        }

        // 2. Deduct and log usage (Transactionally)
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const usageId = crypto.randomUUID();
            
            // Log History
            await connection.query(`
                INSERT INTO candidates_db.candidate_credits 
                (id, candidate_id, service_type, service_name, credits_used, metadata, created_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW())
            `, [usageId, resolvedId, serviceType, serviceName, creditsToDeduct, metadata ? JSON.stringify(metadata) : null]);

            // Update Summary (Auto-increment utilized_credits)
            await connection.query(`
                UPDATE candidates_db.candidate_subscriptions 
                SET utilized_credits = utilized_credits + ?, updated_at = NOW()
                WHERE id = ?
            `, [creditsToDeduct, activeSub.id]);

            await connection.commit();

            res.status(200).json({
                success: true,
                message: 'Credits deducted successfully',
                data: {
                    usageId,
                    remaining: remaining - creditsToDeduct
                }
            });
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    } catch (error) {
        next(error);
    }
};
