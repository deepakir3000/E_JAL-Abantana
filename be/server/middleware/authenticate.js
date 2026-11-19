const {
  User
} = require('./../models/uac/user');
const {
  Role
} = require('./../models/uac/role');
const {
  UserToken
} = require('./../models/uac/user_tokens');
const {
  cpool
} = require('./../db/sql');
const {
  logger
} = require('./../config/log-config');
const jwt = require('jsonwebtoken');
const LOG = logger.getLogger('authenticate.js');

//express middleware to authenticate
var authenticate = async (req, res, next) => {
  var token = req.headers['x-auth'] || req.query['access-token'];
  LOG.debug('token:', token);
  try {
    var decoded = await jwt.verify(token, process.env.JWT_SECRET);
    LOG.debug(`decoded :${JSON.stringify(decoded)}`);

    //find from user_tokens table
    const userTokens = await cpool.query(`SELECT count(*) as count FROM user_tokens where jwt_token = '${token}'`);

    // const userTokens = await UserToken.findOne({ //default id column is added by sequelize which is not good
    //   where: {
    //     jwt_token: token
    //   }
    // });
    if (userTokens.recordset[0].count === 0) {
      LOG.debug(`Invalid auth token.`);
      throw Error();
    }
    const user = await User.findOne({
      where: {
        id: decoded.user_id
      }
    });
    const role = await Role.findOne({
      where: {
        id: decoded.role_id
      }
    });
    req.user = user;
    req.role = role;
    req.token = token;
    next();
  } catch (e) {
   res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = {
  authenticate
};