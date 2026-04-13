/**
 * Tenant Middleware for CandidateBackend
 * Extracts tenant identifier from headers or user object (from authMiddleware).
 */

const { authQuery } = require('../config/db');

const tenantMiddleware = async (req, res, next) => {
    let tenantId =
        req.headers['x-user-cl'] ||
        req.headers['x-tenant-id'] ||
        req.headers['X-Tenant-Id'] ||
        req.user?.client ||
        req.query.tenantDb;

    // Global Override: If it's auth_db or superadmin_db, or a UUID (organization ID), we MUST resolve it to a real tenant DB name
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(tenantId);
    const isGenericDb = !tenantId || tenantId === 'auth_db' || tenantId === 'superadmin_db' || tenantId === 'undefined' || tenantId === 'candidates_db' || isUuid;
    const orgIdFromHeader = req.headers['x-organization-id'] || req.headers['X-Organization-Id'] || req.user?.organizationId;

    if (isGenericDb) {
        // Use the tenantId itself if it's a UUID, otherwise fallback to headers
        const resolutionId = isUuid ? tenantId : orgIdFromHeader;
        const userId = req.user?.id;

        if (resolutionId) {
            try {
                // Try resolving via organizations table (id = orgUuid, name = dbName)
                const orgs = await authQuery(
                    'SELECT name as client FROM organizations WHERE id = ? AND is_active = true LIMIT 1',
                    [resolutionId]
                );
                
                if (orgs.length > 0 && orgs[0].client) {
                    tenantId = orgs[0].client;
                } else if (!isUuid) {
                    // Fallback to legacy user-client lookup if not a direct UUID resolution
                    const userCli = await authQuery(
                        'SELECT client FROM users WHERE organization_id = ? AND client IS NOT NULL AND is_active = true LIMIT 1',
                        [resolutionId]
                    );
                    if (userCli.length > 0 && userCli[0].client) {
                        tenantId = userCli[0].client;
                    }
                }
            } catch (err) {
                console.error('[TenantMiddleware] Resolution failed:', err.message);
            }
        }

        // If still generic/auth, try resolving via userId
        if ((!tenantId || tenantId === 'auth_db' || tenantId === 'candidates_db') && userId) {
            try {
                const users = await authQuery(
                    'SELECT client FROM users WHERE id = ? AND is_active = true LIMIT 1',
                    [userId]
                );
                if (users.length > 0 && users[0].client) {
                    tenantId = users[0].client;
                }
            } catch (err) {
                console.error('[TenantMiddleware] User fallback lookup failed:', err.message);
            }
        }
    }

    if (!tenantId) {
        console.warn(`[TenantMiddleware] Missing tenant identity for ${req.method} ${req.url}`);
        // Fallback to CANDIDATE_DB_NAME if still missing, or throw error?
        // Let's fallback to candidates_db as a last resort since all candidate tables exist there too in some setups.
        tenantId = process.env.CANDIDATE_DB_NAME || 'candidates_db';
    }

    req.tenantDb = tenantId;
    next();
};

module.exports = tenantMiddleware;
