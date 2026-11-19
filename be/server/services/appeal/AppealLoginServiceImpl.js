const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sql = require('mssql');

var {cpool} = require('../../db/sql'); // adjust path to match your existing mssql pool
const {UserToken} = require('./../../models/uac/user_tokens'); // adjust path - reused from existing app
const {AuditTrail} = require('./../../models/uac/auditrail.js'); // adjust path - reused from existing app
const AppUtils = require('./../../utils/AppUtils') // adjust path - for getClientIp
const {logger} = require('./../../config/log-config');
const LOG = logger.getLogger('AppealLoginServiceImpl.js');

// ---- Hashing helpers (SHA512 hex, matches existing hashing module behavior) ----
function getHashedPassword(data) {
  return crypto.createHash('sha512').update(data).digest('hex');
}

function compare(a, b) {
  // plain string equality, consistent with existing hashing.compare usage
  return a === b;
}

// ---- Core credential check against dbo.subapp_users ----
async function findByCredentials(userName, password, salt) {
  const request = cpool.request();
  request.input('userName', sql.VarChar, userName);

  const result = await request.query(
    `SELECT * FROM dbo.eappeal_users WHERE user_name = @userName COLLATE Latin1_General_CS_AS`
  );

  const user = result.recordset[0];
  if (!user) {
    return null;
  }

  let storedHash = user.user_password;

  if (salt !== undefined && salt !== null && salt !== 'change') {
    storedHash = getHashedPassword(storedHash + '#' + salt);
  }

  const isMatch = compare(password, storedHash);
  return isMatch ? user : null;
}

function generateAuthToken(user) {
  const access = 'auth';
  let token = null;
  try {
    token = jwt.sign(
      {
        user_id: user.id,
        role_id: user.role_id,
        access
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    ).toString();
  } catch (err) {
    LOG.error(err);
  }
  return token;
}

// ---- Main login entry point ----
const login = async (req) => {
  LOG.info('Inside appeal login');
  const body = req.body;

  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };

  try {
    let token = null;
    const request = cpool.request();
    request.input('userName', sql.VarChar, body.userName);

    const userCheck = await request.query(
      `SELECT id FROM dbo.eappeal_users WHERE user_name = @userName COLLATE Latin1_General_CS_AS`
    );

    if (userCheck.recordset.length !== 0) {
      const user = await findByCredentials(body.userName, body.password, body.captchaId);

      if (user !== null) {
        token = generateAuthToken(user);

        LOG.info(user.id + ' : ' + token);

        const resultSaveToken = await UserToken.create({
          user_id: user.id,
          jwt_token: token
        });
        LOG.debug(resultSaveToken);

        data.message = 'Logged in successfully.';
        data.user = {
          id: user.id,
          user_name: user.user_name,
          role_id: user.role_id,
          role_name: user.role_name,
          hrms_id: user.hrms_id,
          mobile: user.mobile,
          email: user.email,
          is_new_user: user.is_new_user
        };
        data.token = token;
      } else {
        data.status = 'FAILURE';
        data.message = 'Username or password is wrong.';
      }

      await AuditTrail.create({
        event_action: 'LOG_IN',
        ip_add: AppUtils.getClientIp(req),
        user_name: body.userName,
        action_status: data.status
      });

    } else {
      data.status = 'FAILURE';
      data.message = 'Username is invalid.';
      data.user = {};
    }
  } catch (err) {
    data.status = 'FAILURE';
    data.message = err.message;
    throw err;
  }

  LOG.debug(data);
  return data;
};



// const getAllUsers = async () => {

//     const pool = await db;

//     const result = await pool.request().query(`
//         SELECT
//             id,
//             user_name,
//             name,
//             role_name,
//             role_id,
//             hrms_id,
//             mobile,
//             email,
//             is_new_user,
//             created_on,
//             updated_on
//         FROM dbo.eappeal_users
//         ORDER BY name
//     `);

//     return result.recordset;
// };

// const getUserAuditHistory = async (userId) => {

//     const pool = await db;

//     const result = await pool.request()
//         .input('userId', sql.Int, userId)
//         .query(`
//             SELECT
//                 id,
//                 action,
//                 performed_by_name,
//                 performed_on,
//                 details
//             FROM dbo.eappeal_audit_log
//             WHERE user_id = @userId
//             ORDER BY performed_on DESC
//         `);

//     return result.recordset;
// };

// const setNewUserFlag = async (
//     userId,
//     isNewUser,
//     loggedInUser
// ) => {

//     const pool = await db;

//     const transaction = new sql.Transaction(pool);

//     await transaction.begin();

//     try {

//         await transaction.request()
//             .input('userId', sql.Int, userId)
//             .input('isNewUser', sql.Bit, isNewUser)
//             .query(`
//                 UPDATE dbo.eappeal_users
//                 SET
//                     is_new_user = @isNewUser,
//                     updated_on = GETDATE()
//                 WHERE id = @userId
//             `);

//         const action = isNewUser
//             ? 'FLAG_SET'
//             : 'FLAG_CLEARED';

//         const details = isNewUser
//             ? 'User marked as new user.'
//             : 'New user flag cleared.';

//         await transaction.request()
//             .input('userId', sql.Int, userId)
//             .input('action', sql.VarChar(100), action)
//             .input('performedBy', sql.Int, loggedInUser.id)
//             .input(
//                 'performedByName',
//                 sql.VarChar(150),
//                 loggedInUser.name || loggedInUser.user_name
//             )
//             .input(
//                 'details',
//                 sql.VarChar(500),
//                 details
//             )
//             .query(`
//                 INSERT INTO dbo.eappeal_audit_log (
//                     user_id,
//                     action,
//                     performed_by,
//                     performed_by_name,
//                     details
//                 )
//                 VALUES (
//                     @userId,
//                     @action,
//                     @performedBy,
//                     @performedByName,
//                     @details
//                 )
//             `);

//         await transaction.commit();

//         return true;

//     } catch (error) {

//         await transaction.rollback();

//         throw error;
//     }
// };
module.exports = {
  login,

};