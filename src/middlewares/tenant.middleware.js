/**
 * Tenant Middleware for CandidateBackend
 * Extracts tenant identifier from headers or user object (from authMiddleware).
 */

const tenantMiddleware = (req, res, next) => {
    const tenantId =
        req.headers['x-user-cl'] ||
        req.headers['x-tenant-id'] ||
        req.headers['X-Tenant-Id'] ||
        req.user?.client ||
        req.query.tenantDb;

    // CandidateBackend primarily uses candidates_db (fixed), but we set req.tenantDb for consistency
    req.tenantDb = tenantId;
    next();
};

module.exports = tenantMiddleware;
