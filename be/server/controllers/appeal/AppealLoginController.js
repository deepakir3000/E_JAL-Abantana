const { check, validationResult } = require('express-validator');
const appealLoginServices = require('../../services/appeal/AppealLoginServiceImpl');
const { logger } = require('../../config/log-config');
const LOG = logger.getLogger('AppealLoginController.js');
const sql = require('mssql');
const { cpool } = require('../../db/sql'); 
const { AuditTrail } = require('./../../models/uac/auditrail.js');
const AppUtils = require('./../../utils/AppUtils');

const validator = (method) => {
  var arr;
  switch (method) {
    case 'login':
      {
        LOG.debug('initializing appeal login validators..');
        arr = [
          check('userName', 'invalid data.').exists(),
          check('password', 'invalid data.').exists()
        ];
        break;
      }
  }
  return arr;
};

const login = async (req, res) => {
  LOG.info('Inside appeal login controller.');
  res.setHeader('Content-Type', 'application/json');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() }).send();
    return;
  }

  try {
    let sessionData = req.session;

    if (sessionData === null || (sessionData.JSESSIONID === undefined || sessionData.JSESSIONID === null)) {
      LOG.debug('Captcha should not be blank.');
      res.status(400).send('Captcha should not be blank');
    } else {
      req.body.captcha = sessionData.JSESSIONID;

      sessionData.destroy(function (err) {
        if (err) {
          LOG.error('Error destroying session');
        } else {
          LOG.debug('Session destroyed successfully');
        }
      });

      if (req.body.captcha !== req.body.captchaId) {
        LOG.debug('Captcha is not valid.');
        res.status(400).send('Captcha is not valid.');
      } else {
        const data = await appealLoginServices.login(req);
        LOG.debug(data);
        res.header('x-auth', data.token).send(data);
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
};


const logout = async (req, res) => {
  LOG.info('Inside appeal logout.');
  try {
    LOG.debug(req.user.id + ' : ' + req.token);

    const request = cpool.request();
    request.input('token', sql.VarChar, req.token);
    const result = await request.query(
      `DELETE FROM user_tokens WHERE jwt_token = @token`
    );

    if (result.rowsAffected[0] >= 1) {
      await AuditTrail.create({
        event_action: 'LOG_OUT',
        ip_add: AppUtils.getClientIp(req),
        user_name: req.user.user_name,
        action_status: 'SUCCESS'
      });
    }

    res.status(200).send();
  } catch (err) {
    LOG.error('Appeal logout error:', err);
    res.status(400).send(err);
  }
};

// const getApplicationMovementHistory = async (req, res) => {
//     LOG.info('Inside getApplicationMovementHistory');
//     const { appId } = req.params;

//     try {
//         const request = cpool.request();
//         request.input('appId', sql.Int, appId);

//         const result = await request.query(`
//             WITH citizen_resubmit AS (
//                 SELECT MAX(wel.id) AS latest_citizen_row_id
//                 FROM dbo.workflow_execution_log wel
//                 INNER JOIN dbo.mst_users fu ON fu.id = wel.from_id
//                 WHERE wel.obj_id = @appId
//                   AND fu.role_id = 3
//             )
//             SELECT
//                 wel.id,
//                 wel.obj_id,
//                 wel.from_id,
//                 wel.to_id,
//                 wel.created_on,
//                 wel.remarks,
//                 fu.user_name  AS from_user_name,
//                 fu.role_id    AS from_role_id,
//                 tu.user_name  AS to_user_name,
//                 tu.role_id    AS to_role_id
//             FROM dbo.workflow_execution_log wel
//             LEFT JOIN dbo.mst_users fu ON fu.id = wel.from_id
//             LEFT JOIN dbo.mst_users tu ON tu.id = wel.to_id
//             CROSS JOIN citizen_resubmit cr
//             WHERE wel.obj_id = @appId
//               AND wel.id >= cr.latest_citizen_row_id
//             ORDER BY wel.created_on ASC
//         `);

//         const rows = result.recordset;

//         if (rows.length === 0) {
//             return res.status(200).json({ status: 'SUCCESS', data: [] });
//         }

//         // ---- Fetch holidays once, covering full step range ----
//         // from first step's date to today
//         const firstStepDate = new Date(rows[0].created_on);
//         const firstStepUTC = new Date(Date.UTC(
//             firstStepDate.getUTCFullYear(),
//             firstStepDate.getUTCMonth(),
//             firstStepDate.getUTCDate()
//         ));

//         const now = new Date();
//         const todayUTCMidnight = new Date(Date.UTC(
//             now.getFullYear(),
//             now.getMonth(),
//             now.getDate()
//         ));

//         const holidayRequest = cpool.request();
//         holidayRequest.input('fromDate', sql.DateTime, firstStepUTC);
//         holidayRequest.input('toDate', sql.DateTime, todayUTCMidnight);
//         const holidayResult = await holidayRequest.query(`
//             SELECT hol_date
//             FROM dbo.mst_holidays
//             WHERE hol_date >= @fromDate
//               AND hol_date <= @toDate
//         `);

//         // normalize to Set of 'YYYY-MM-DD' UTC strings for fast lookup
//         const holidayDateSet = new Set(
//             holidayResult.recordset.map(row => {
//                 const d = new Date(row.hol_date);
//                 return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
//             })
//         );

//         LOG.debug(`Movement history holidays in range: ${holidayDateSet.size}`);

//         // ---- Helper: calendar days between two UTC-midnight dates, holidays excluded ----
//         function calcWorkingDays(fromUTC, toUTC) {
//             const diffMs = toUTC.getTime() - fromUTC.getTime();
//             const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

//             let holidayCount = 0;
//             const cursor = new Date(fromUTC);
//             while (cursor < toUTC) {
//                 cursor.setUTCDate(cursor.getUTCDate() + 1);
//                 const key = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, '0')}-${String(cursor.getUTCDate()).padStart(2, '0')}`;
//                 if (holidayDateSet.has(key)) {
//                     holidayCount++;
//                 }
//             }

//             return {
//                 totalDays,
//                 holidayCount,
//                 workingDays: totalDays - holidayCount
//             };
//         }

//         // ---- role_id → display name ----
//         const roleDisplayNames = {
//             1: 'Citizen',
//             2: 'Principal Secretary',
//             3: 'Citizen',
//             4: 'Additional Secretary',
//             5: 'Director',
//             6: 'Executive Engineer',
//             7: 'CE Planning'
//         };

//         function resolveDisplayName(userName, roleId) {
//             if (roleDisplayNames[roleId]) {
//                 if (roleId === 6) {
//                     return `Executive Engineer (${userName})`;
//                 }
//                 return roleDisplayNames[roleId];
//             }
//             return userName || 'Unknown';
//         }

//         // ---- Build steps with per-step duration ----
//       const steps = rows.map((row, index) => {
//     const isLast = index === rows.length - 1;

//     const stepStart = new Date(row.created_on);
//     const stepStartUTC = new Date(Date.UTC(
//         stepStart.getUTCFullYear(),
//         stepStart.getUTCMonth(),
//         stepStart.getUTCDate()
//     ));

//     const stepEndUTC = isLast
//         ? todayUTCMidnight
//         : (() => {
//             const next = new Date(rows[index + 1].created_on);
//             return new Date(Date.UTC(
//                 next.getUTCFullYear(),
//                 next.getUTCMonth(),
//                 next.getUTCDate()
//             ));
//         })();

//     const duration = calcWorkingDays(stepStartUTC, stepEndUTC);

//     return {
//         id: row.id,
//         // to_id is the holder — display this as the step title
//         holderUserId: row.to_id,
//         holderUserName: resolveDisplayName(row.to_user_name, row.to_role_id),
//         // from_id kept for reference
//         fromUserId: row.from_id,
//         fromUserName: resolveDisplayName(row.from_user_name, row.from_role_id),
//         createdOn: row.created_on,
//         remarks: row.remarks || null,
//         isCurrent: isLast,
//         daysAtStep: duration.workingDays,
//         totalDaysAtStep: duration.totalDays,
//         holidaysAtStep: duration.holidayCount
//     };
// });

//         res.status(200).json({ status: 'SUCCESS', data: steps });
//     } catch (err) {
//         LOG.error('getApplicationMovementHistory error:', err);
//         res.status(400).json({ status: 'FAILED', message: err.message });
//     }
// };

const getApplicationMovementHistory = async (req, res) => {
    LOG.info('Inside getApplicationMovementHistory');
    const { appId } = req.params;

    try {
        const request = cpool.request();
        request.input('appId', sql.Int, appId);

        const result = await request.query(`
            WITH citizen_resubmit AS (
                SELECT MAX(wel.id) AS latest_citizen_row_id
                FROM dbo.workflow_execution_log wel
                INNER JOIN dbo.mst_users fu ON fu.id = wel.from_id
                WHERE wel.obj_id = @appId
                  AND fu.role_id IN (1, 3)
            )
            SELECT
                wel.id,
                wel.obj_id,
                wel.from_id,
                wel.to_id,
                wel.created_on,
                wel.remarks,
                fu.user_name  AS from_user_name,
                fu.role_id    AS from_role_id,
                tu.user_name  AS to_user_name,
                tu.role_id    AS to_role_id
            FROM dbo.workflow_execution_log wel
            LEFT JOIN dbo.mst_users fu ON fu.id = wel.from_id
            LEFT JOIN dbo.mst_users tu ON tu.id = wel.to_id
            CROSS JOIN citizen_resubmit cr
            WHERE wel.obj_id = @appId
              AND wel.id >= cr.latest_citizen_row_id
            ORDER BY wel.created_on ASC
        `);

        const rows = result.recordset;

        if (rows.length === 0) {
            return res.status(200).json({ status: 'SUCCESS', data: [] });
        }

        // ---- Fetch holidays once, covering full step range ----
        // from first step's date to today
        const firstStepDate = new Date(rows[0].created_on);
        const firstStepUTC = new Date(Date.UTC(
            firstStepDate.getUTCFullYear(),
            firstStepDate.getUTCMonth(),
            firstStepDate.getUTCDate()
        ));

        const now = new Date();
        const todayUTCMidnight = new Date(Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        ));

        const holidayRequest = cpool.request();
        holidayRequest.input('fromDate', sql.DateTime, firstStepUTC);
        holidayRequest.input('toDate', sql.DateTime, todayUTCMidnight);
        const holidayResult = await holidayRequest.query(`
            SELECT hol_date
            FROM dbo.mst_holidays
            WHERE hol_date >= @fromDate
              AND hol_date <= @toDate
        `);

        // normalize to Set of 'YYYY-MM-DD' UTC strings for fast lookup
        const holidayDateSet = new Set(
            holidayResult.recordset.map(row => {
                const d = new Date(row.hol_date);
                return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
            })
        );

        LOG.debug(`Movement history holidays in range: ${holidayDateSet.size}`);

        // ---- Helper: calendar days between two UTC-midnight dates, holidays excluded ----
        function calcWorkingDays(fromUTC, toUTC) {
            const diffMs = toUTC.getTime() - fromUTC.getTime();
            const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

            let holidayCount = 0;
            const cursor = new Date(fromUTC);
            while (cursor < toUTC) {
                cursor.setUTCDate(cursor.getUTCDate() + 1);
                const key = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, '0')}-${String(cursor.getUTCDate()).padStart(2, '0')}`;
                if (holidayDateSet.has(key)) {
                    holidayCount++;
                }
            }

            return {
                totalDays,
                holidayCount,
                workingDays: totalDays - holidayCount
            };
        }

        // ---- role_id → display name ----
        const roleDisplayNames = {
            1: 'Citizen', 
            2: 'Principal Secretary',
            3: 'Citizen',
            4: 'Additional Secretary',
            5: 'Director',
            6: 'Executive Engineer',
            7: 'CE Planning'
        };

        function resolveDisplayName(userName, roleId) {
            if (roleDisplayNames[roleId]) {
                if (roleId === 6) {
                    return `Executive Engineer (${userName})`;
                }
                return roleDisplayNames[roleId];
            }
            return userName || 'Unknown';
        }

        // ---- Build steps with per-step duration ----
        const steps = rows.map((row, index) => {
            const isLast = index === rows.length - 1;

            // this step's window: from this row's created_on to next row's created_on
            // (or today if it's the last/current step)
            const stepStart = new Date(row.created_on);
            const stepStartUTC = new Date(Date.UTC(
                stepStart.getUTCFullYear(),
                stepStart.getUTCMonth(),
                stepStart.getUTCDate()
            ));

            const stepEndUTC = isLast
                ? todayUTCMidnight
                : (() => {
                    const next = new Date(rows[index + 1].created_on);
                    return new Date(Date.UTC(
                        next.getUTCFullYear(),
                        next.getUTCMonth(),
                        next.getUTCDate()
                    ));
                })();

            const duration = calcWorkingDays(stepStartUTC, stepEndUTC);

            return {
                id: row.id,
                fromUserId: row.from_id,
                fromUserName: resolveDisplayName(row.from_user_name, row.from_role_id),
                toUserId: row.to_id,
                toUserName: resolveDisplayName(row.to_user_name, row.to_role_id),
                createdOn: row.created_on,
                remarks: row.remarks || null,
                isCurrent: isLast,
                daysAtStep: duration.workingDays,       // holiday-excluded working days
                totalDaysAtStep: duration.totalDays,    // raw calendar days (for reference)
                holidaysAtStep: duration.holidayCount   // holidays subtracted
            };
        });

        res.status(200).json({ status: 'SUCCESS', data: steps });
    } catch (err) {
        LOG.error('getApplicationMovementHistory error:', err);
        res.status(400).json({ status: 'FAILED', message: err.message });
    }
};


const getProfile = async (req, res) => {
    LOG.info('Inside getProfile');
    try {
        const request = cpool.request();
        request.input('id', sql.Int, req.user.id);
        const result = await request.query(`
            SELECT id, user_name, name, role_name, role_id, hrms_id, mobile, email , is_new_user
            FROM dbo.eappeal_users
            WHERE id = @id
        `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ status: 'FAILED', message: 'User not found' });
        }

        res.status(200).json({ status: 'SUCCESS', data: result.recordset[0] });
    } catch (err) {
        LOG.error('getProfile error:', err);
        res.status(400).json({ status: 'FAILED', message: err.message });
    }
};



///////////////////////admin////////////////////////////////////


// const updateProfile = async (req, res) => {
//     LOG.info('Inside updateProfile');

//     const { name, mobile, email, hrms_id } = req.body;

//     try {

//         // Check current onboarding status first
//         const existingUser = await cpool.request()
//             .input('id', sql.Int, req.user.id)
//             .query(`
//                 SELECT is_new_user
//                 FROM dbo.eappeal_users
//                 WHERE id = @id
//             `);

//         const isNewUser =
//             existingUser.recordset.length > 0 &&
//             existingUser.recordset[0].is_new_user;

//         const request = cpool.request();

//         request.input('id', sql.Int, req.user.id);
//         request.input('name', sql.VarChar, name || null);
//         request.input('mobile', sql.VarChar, mobile || null);
//         request.input('email', sql.VarChar, email || null);
//         request.input('hrmsId', sql.VarChar, hrms_id || null);
//         request.input('updatedBy', sql.Int, req.user.id);

//         await request.query(`
//             UPDATE dbo.eappeal_users
//             SET
//                 name        = @name,
//                 mobile      = @mobile,
//                 email       = @email,
//                 hrms_id     = @hrmsId,
//                 updated_by  = @updatedBy,
//                 updated_on  = GETDATE(),
//                 is_new_user = CASE
//                                 WHEN is_new_user = 1 THEN 0
//                                 ELSE is_new_user
//                               END
//             WHERE id = @id
//         `);

//         // Write audit entry only when onboarding flag was actually cleared
//         if (isNewUser) {

//             await cpool.request()
//                 .input('userId', sql.Int, req.user.id)
//                 .input('action', sql.VarChar(100), 'FLAG_CLEARED')
//                 .input('details', sql.VarChar(500),
//                     'Flag automatically cleared after profile update.'
//                 )
//                 .query(`
//                     INSERT INTO dbo.eappeal_audit_log (
//                         user_id,
//                         action,
//                         performed_by,
//                         performed_by_name,
//                         details
//                     )
//                     VALUES (
//                         @userId,
//                         @action,
//                         NULL,
//                         'System',
//                         @details
//                     )
//                 `);
//         }

//         res.status(200).json({
//             status: 'SUCCESS',
//             message: 'Profile updated successfully.'
//         });

//     } catch (err) {

//         LOG.error('updateProfile error:', err);

//         res.status(400).json({
//             status: 'FAILED',
//             message: err.message
//         });
//     }
// };

const updateProfile = async (req, res) => {
    LOG.info('Inside updateProfile');

    const { name, mobile, email, hrms_id } = req.body;

    try {

        // Fetch current user details before update
        const existingUser = await cpool.request()
            .input('id', sql.Int, req.user.id)
            .query(`
                SELECT
                    name,
                    mobile,
                    email,
                    hrms_id,
                    is_new_user
                FROM dbo.eappeal_users
                WHERE id = @id
            `);

        if (existingUser.recordset.length === 0) {
            return res.status(404).json({
                status: 'FAILED',
                message: 'User not found.'
            });
        }

        const currentUser = existingUser.recordset[0];

        const isNewUser = currentUser.is_new_user;

        const oldValues = {
            name: currentUser.name,
            mobile: currentUser.mobile,
            email: currentUser.email,
            hrms_id: currentUser.hrms_id
        };

        const newValues = {
            name: name || null,
            mobile: mobile || null,
            email: email || null,
            hrms_id: hrms_id || null
        };

        // Update profile
        const request = cpool.request();

        request.input('id', sql.Int, req.user.id);
        request.input('name', sql.VarChar, name || null);
        request.input('mobile', sql.VarChar, mobile || null);
        request.input('email', sql.VarChar, email || null);
        request.input('hrmsId', sql.VarChar, hrms_id || null);
        request.input('updatedBy', sql.Int, req.user.id);

        await request.query(`
            UPDATE dbo.eappeal_users
            SET
                name        = @name,
                mobile      = @mobile,
                email       = @email,
                hrms_id     = @hrmsId,
                updated_by  = @updatedBy,
                updated_on  = GETDATE(),
                is_new_user = CASE
                                WHEN is_new_user = 1 THEN 0
                                ELSE is_new_user
                              END
            WHERE id = @id
        `);

        // Store profile update audit entry
        await cpool.request()
            .input('userId', sql.Int, req.user.id)
            .input('action', sql.VarChar(100), 'PROFILE_UPDATED')
            .input('performedBy', sql.Int, req.user.id)
            .input(
                'performedByName',
                sql.VarChar(150),
                req.user.name || req.user.user_name
            )
            .input(
                'oldValues',
                sql.NVarChar(sql.MAX),
                JSON.stringify(oldValues)
            )
            .input(
                'newValues',
                sql.NVarChar(sql.MAX),
                JSON.stringify(newValues)
            )
            .query(`
                INSERT INTO dbo.eappeal_audit_log (
                    user_id,
                    action,
                    performed_by,
                    performed_by_name,
                    old_values,
                    new_values
                )
                VALUES (
                    @userId,
                    @action,
                    @performedBy,
                    @performedByName,
                    @oldValues,
                    @newValues
                )
            `);

        // If this was a new joinee, log flag clearance
        if (isNewUser) {

            await cpool.request()
                .input('userId', sql.Int, req.user.id)
                .input('action', sql.VarChar(100), 'FLAG_CLEARED')
                .input(
                    'details',
                    sql.VarChar(500),
                    'Flag automatically cleared after profile update.'
                )
                .query(`
                    INSERT INTO dbo.eappeal_audit_log (
                        user_id,
                        action,
                        performed_by,
                        performed_by_name,
                        details
                    )
                    VALUES (
                        @userId,
                        @action,
                        NULL,
                        'System',
                        @details
                    )
                `);
        }

        res.status(200).json({
            status: 'SUCCESS',
            message: 'Profile updated successfully.'
        });

    } catch (err) {

        LOG.error('updateProfile error:', err);

        res.status(400).json({
            status: 'FAILED',
            message: err.message
        });
    }
};

const getAllUsers = async (req, res) => {
    LOG.info('Inside getAllUsers');

    try {

        const result = await cpool.request().query(`
            SELECT
                id,
                user_name,
                name,
                role_name,
                role_id,
                hrms_id,
                mobile,
                email,
                is_new_user,
                created_on,
                updated_on
            FROM dbo.eappeal_users
            ORDER BY name
        `);

        res.status(200).json({
            status: 'SUCCESS',
            data: result.recordset
        });

    } catch (err) {

        LOG.error('getAllUsers error:', err);

        res.status(400).json({
            status: 'FAILED',
            message: err.message
        });
    }
};


const getUserAuditHistory = async (req, res) => {
    LOG.info('Inside getUserAuditHistory');

    try {

        const request = cpool.request();

        request.input(
            'userId',
            sql.Int,
            parseInt(req.params.userId)
        );

        const result = await request.query(`
            SELECT
                id,
                action,
                performed_by_name,
                performed_on,
                details
            FROM dbo.eappeal_audit_log
            WHERE user_id = @userId
            ORDER BY performed_on DESC
        `);

        res.status(200).json({
            status: 'SUCCESS',
            data: result.recordset
        });

    } catch (err) {

        LOG.error('getUserAuditHistory error:', err);

        res.status(400).json({
            status: 'FAILED',
            message: err.message
        });
    }
};

 const setNewUserFlag = async (req, res) => {
    LOG.info('Inside setNewUserFlag');

    const { userId, isNewUser } = req.body;

    try {

        const request = cpool.request();

        request.input('userId', sql.Int, userId);
        request.input('isNewUser', sql.Bit, isNewUser);

        await request.query(`
            UPDATE dbo.eappeal_users
            SET
                is_new_user = @isNewUser,
                updated_on = GETDATE(),
                updated_by = ${req.user.id}
            WHERE id = @userId
        `);

        const action = isNewUser
            ? 'FLAG_SET'
            : 'FLAG_CLEARED';

        const details = isNewUser
            ? 'User marked as new user.'
            : 'New user flag cleared.';

        const auditRequest = cpool.request();

        auditRequest.input('userId', sql.Int, userId);
        auditRequest.input('action', sql.VarChar(100), action);
        auditRequest.input('performedBy', sql.Int, req.user.id);
        auditRequest.input(
            'performedByName',
            sql.VarChar(150),
            req.user.name || req.user.user_name
        );
        auditRequest.input(
            'details',
            sql.VarChar(500),
            details
        );

        await auditRequest.query(`
            INSERT INTO dbo.eappeal_audit_log (
                user_id,
                action,
                performed_by,
                performed_by_name,
                details
            )
            VALUES (
                @userId,
                @action,
                @performedBy,
                @performedByName,
                @details
            )
        `);

        res.status(200).json({
            status: 'SUCCESS',
            message: 'User flag updated successfully.'
        });

    } catch (err) {

        LOG.error('setNewUserFlag error:', err);

        res.status(400).json({
            status: 'FAILED',
            message: err.message
        });
    }
};




module.exports = {
    validator,
    login,
    logout,
    getApplicationMovementHistory,
     getProfile,
    updateProfile,
    getAllUsers,
    getUserAuditHistory,
    setNewUserFlag
};
