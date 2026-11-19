const sql = require('mssql');
const {
  cpool
} = require('./../db/sql');
const jwt = require('jsonwebtoken');
const { logger } = require('../config/log-config');
const LOG = logger.getLogger('authenticateAppeal.js');


var authenticateAppeal = async (req, res, next) => {
  var token = req.headers['x-auth'] || req.query['access-token'];
  LOG.debug('token:', token);

  try {
    var decoded = await jwt.verify(token, process.env.JWT_SECRET);
    LOG.debug(`decoded :${JSON.stringify(decoded)}`);

    // check token validity against user_tokens table (shared, generic check)
    const tokenRequest = cpool.request();
    tokenRequest.input('token', sql.VarChar, token);
    const userTokens = await tokenRequest.query(
      `SELECT count(*) as count FROM user_tokens WHERE jwt_token = @token`
    );

    if (userTokens.recordset[0].count === 0) {
      LOG.debug('Invalid auth token.');
      throw Error();
    }

    // look up the appeal user from eappeal_users, not mst_users
    const userRequest = cpool.request();
    userRequest.input('id', sql.Int, decoded.user_id);
    const userResult = await userRequest.query(
      `SELECT * FROM dbo.eappeal_users WHERE id = @id`
    );

    const user = userResult.recordset[0];
    if (!user) {
      LOG.debug('Appeal user not found.');
      throw Error();
    }

    req.user = user; // includes role_id, role_name directly from eappeal_users
    req.role = { role_name: user.role_name }; // shim so authorize() / req.role.role_name keep working
    req.token = token;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  authenticateAppeal
};