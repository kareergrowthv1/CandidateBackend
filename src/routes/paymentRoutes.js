const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middlewares/auth.middleware');

// Public route to get plans (needed during selection)
router.get('/plans', paymentController.getPlans);
router.get('/status', authMiddleware, paymentController.getSubscriptionStatus);

// Protected routes for payment
router.post('/create-order', authMiddleware, paymentController.createOrder);
router.put('/create-order', authMiddleware, paymentController.createOrder); // Use same controller for now, or specific one
router.post('/verify-payment', authMiddleware, paymentController.verifyPayment);
router.get('/history', authMiddleware, paymentController.getPaymentHistory);
router.get('/credits/overview', authMiddleware, paymentController.getCandidateCredits);
router.post('/credits/deduct', authMiddleware, paymentController.deductCredits);

module.exports = router;
