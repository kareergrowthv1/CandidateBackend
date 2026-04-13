/**
 * Auth Middleware for CandidateBackend
 * Supports (1) Bearer JWT (from frontend or forwarded by AdminBackend),
 *         (2) X-Service-Token for service-to-service calls (e.g. AdminBackend),
 *         (3) headers from API Gateway (X-User-Id, X-Tenant-Id, etc.).
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        let userId = req.headers['x-user-id'] || req.headers['X-User-Id'] || req.headers['X-User-ID'];
        let userRole = req.headers['x-user-role'] || req.headers['X-User-Role'];
        let organizationId = req.headers['x-organization-id'] || req.headers['X-Organization-Id'] || req.headers['x-user-orgid'] || req.headers['X-User-OrgId'];
        let client = req.headers['x-user-cl'] || req.headers['X-User-Cl'] || req.headers['x-tenant-id'] || req.headers['X-Tenant-Id'];

        const serviceToken = req.headers['x-service-token'] || req.headers['X-Service-Token'];
        const expectedToken = process.env.INTERNAL_SERVICE_TOKEN;
        if (serviceToken && expectedToken && serviceToken === expectedToken) {
            userId = userId || 'service';
            req.user = { id: userId, role: userRole, organizationId, client };
            return next();
        }

        let emailFromToken = null;
        const authHeader = req.headers.authorization || req.headers.Authorization;
        let tokenSource = null;
        let token = null;
        if (authHeader && String(authHeader).startsWith('Bearer ')) {
            const rawToken = String(authHeader).slice(7).trim();
            if (rawToken && rawToken !== 'null' && rawToken !== 'undefined') {
                token = rawToken;
                tokenSource = 'header';
            }
        } 
        
        if (!token && req.cookies && req.cookies.accessToken) {
            token = req.cookies.accessToken;
            tokenSource = 'cookie';
        }

        if (token) {
            const secret = process.env.JWT_SECRET;
            if (secret) {
                try {
                    const decoded = jwt.verify(token, secret);
                    console.log(`[CandidateBackend] Auth Success via ${tokenSource} for user:`, decoded.userId || decoded.sub);
                    userId = decoded.userId || decoded.sub || decoded.id;
                    userRole = decoded.roleName || decoded.roleCode || decoded.role;
                    organizationId = decoded.organizationId || decoded.organization_id;
                    client = client || decoded.tenantDb || decoded.tenantId || decoded.client;
                    emailFromToken = decoded.sub || decoded.email;
                } catch (e) {
                    console.error('[CandidateBackend] JWT Error:', e.message, {
                        source: tokenSource,
                        tokenStart: token?.substring(0, 15),
                        secretLength: secret?.length
                    });
                    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
                }
            }
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Send Authorization: Bearer <token> or X-Service-Token.'
            });
        }

        req.user = {
            id: userId,
            email: emailFromToken,
            role: userRole,
            organizationId: organizationId,
            client: client
        };

        next();
    } catch (error) {
        console.error('[AuthMiddleware] Error:', error);
        return res.status(401).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

module.exports = authMiddleware;
