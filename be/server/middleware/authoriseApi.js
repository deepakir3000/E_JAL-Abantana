const {cpool} = require('./../db/sql');
const {logger} = require('./../config/log-config');
const {AuditTrail} = require('./../models/uac/auditrail.js');
const AppUtils = require('./../utils/AppUtils')
const LOG = logger.getLogger('authoriseApi.js');

function authorize(roles = [],action,isAudit) {
    return [
        // Author: Jayant
        // authenticate JWT token and attach user to request object (req.user)
        // authorize based on user role
        async function(req, res, next) {
            if(isAudit === null ? false : isAudit){
                const trail = await AuditTrail.create({
                    event_action: action,
                    ip_add: AppUtils.getClientIp(req),
                    user_name: req.user.user_name,
                    action_status: 'SUCCESS'
                });
            }
            if (roles.length &&  !roles.includes(req.role.role_name)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = authorize;