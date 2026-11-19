const express = require('express');
var {cpool} = require('../../db/sql');
const {logger} = require('./../../config/log-config');
const {seqlize} = require('./../../config/seqlize');
const email = require('./../../config/email_sms/email');
const emailCron = require('./../../batchjobs/emailCronJobs');
const {Role} = require('./../../models/uac/role');
const {User} = require('./../../models/uac/user');
const {AuditTrail} = require('./../../models/uac/auditrail.js');
const hashing = require('../../middleware/sha512-hash');
const AppUtils = require('./../../utils/AppUtils')
const OtpStore = require('./../../utils/OtpStore')
const sendSms = require('../../config/email_sms/sendSms')
const {UserToken} = require('./../../models/uac/user_tokens');
const LOG = logger.getLogger('LoginServiceImpl.js');
var svgCaptcha = require('svg-captcha');
const {Application} = require('../../models/formaction/applicationdetails.js')
const { Status } = require('./../../models/uac/status.js');


async function checkPasswordValidity(data) {
  console.log(data, 'data');
  return new Promise(async resolve=> {
      console.log(data, 'data');
      let userDetails = await cpool.query(
          `SELECT user_name, updated_on FROM mst_users WHERE user_name='${data.userName}' COLLATE Latin1_General_CS_AS`
      );
  
      console.log(userDetails);
  
      // Assuming userDetails.recordset[0] contains the user data
      if (userDetails.recordset.length > 0) {
          const { updated_on } = userDetails.recordset[0];
          const currentDate = new Date();
  
          // Calculate the difference in time (milliseconds)
          const timeDifference = currentDate - new Date(updated_on);
  
          // Convert the time difference to days
          const daysDifference = timeDifference / (1000 * 3600 * 24);
  
          // Check if the difference exceeds 120 days
          if (daysDifference > 120) {
              console.log('Please change your password');
              resolve({status: false, message: 'Please change your password'})
          } else {
              console.log('Password is valid');
              resolve({status: true, message: 'Password is valid'})
          }
      } else {
          resolve({status: true, message: 'User not found'})
          console.log('User not found');
      }
  })
}

//login
const login = async (req) => {
  LOG.info('Inside login');
  const body = req.body;
  var checkDate= await checkPasswordValidity(req.body);
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {},
    status1:checkDate.status
  };
  try {
    let token = null;
    console.log(body.userName);
    let userDetails = await cpool.query(`select * from mst_users where user_name='${body.userName}' COLLATE Latin1_General_CS_AS `)
    userDetails = userDetails.recordset;

    if(userDetails.length != 0){
      const user = await User.findByCredentials(body.userName, body.password,body.captchaId);
      if(user !== undefined){
        if(user !== null){
          token = await user.generateAuthToken();
        }else{
          data.status = 'FAILURE';
          data.message = 'Username or password is wrong..';
        }
      }
      if(user !== null){
        LOG.info(user.id+" : "+token);
        const resultSaveToken = await UserToken.create({
          user_id: user.id,
          jwt_token: token
        });
        LOG.debug(resultSaveToken);
        data.message = 'Logged in successfully.';
        data.user = user;
        data.token = token;
        data.status1;
      }
      const result = await AuditTrail.create({
        event_action: 'LOG_IN',
        ip_add: AppUtils.getClientIp(req),
        user_name: body.userName,
        action_status: data.status
      });
    } else{
      data.message = 'Username is invalid.';
      data.user = {};
    }
  }catch (err) {
    data.status = 'FAILURE';
    data.message = err.message;
    throw err;
  }
  LOG.debug(data);
  return data;
  };

//logout
const logout = async (req) => {
  LOG.info('Inside logout');
  try {
    LOG.debug(req.user.id + " : " + req.token);
    const result = await UserToken.destroy({
      where: {
        user_id: req.user.id
      }
    });//for removing all the sessions(if need to logout specific token then pass token instead of id)
    //TODO:- Need to update user table login status & add application event
    if(result === 1){
      const trail = await AuditTrail.create({
        event_action: 'LOG_OUT',
        ip_add: AppUtils.getClientIp(req),
        user_name: req.user.user_name,
        action_status: 'SUCCESS'
      });
    }
    LOG.debug(result);
  } catch (err) {
    throw err;
  }
  return;
};

//createUser
const createUser = async (reqData) => {
  LOG.info('Inside UacServiceImpl createUser');
  var pass = AppUtils.makeid(6);
  let password = null;
  console.log('password ',pass);
  console.log('REQDATA______________________ ',reqData);
  password = hashing.getHashedPassword(hashing.getHashedPassword(pass))
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
        var maxId = await User.max('id');
        LOG.debug('Max ID-> '+ maxId);
        var role = await Role.findOne({
          where: {
            id: 3
          },
          raw: true
        });
        if(role == null){
          LOG.error("Role does not exists.");
          data.status = 'INVALID';
          data.message = 'Role not exists';
        }else{
          var result = await User.findAll({
            where: {
              user_name: reqData.userName
            },
            raw: true
          });
          LOG.debug('user data-> '+ result);
          console.log(result.length ,'result.length arati')
          if(result.length != 0){
            LOG.error("User already exist. result: " + result);
            data.status = 'DUPLICATE';
            data.message = 'User already exists';
            data.data = result;
          }else{
              maxId = isNaN(maxId) ? 1 : maxId + 1;
              LOG.debug(`Inserting user with id :${maxId} & ${JSON.stringify(reqData)}`);
              const result = await User.create({
                id: maxId,
                user_name: reqData.userName,
                email: reqData.email,
                role_id:role.id,
                mobile: reqData.phone,
                user_password: password,
                first_login: true,
                otp_secret: null,
                otp_validity: null,
                display_name: reqData.displayName,
                status: 1,
                created_by: maxId,
                updated_by:maxId,
            });
            console.log("RESULT-----",result);
            if(result != null)
            {              
              email.sendSimpleMail(reqData.email,"Successfully Registered", `Dear ${reqData.displayName}, \n\nYou have successfully registerd and your password is ${pass} \n\n Thanks \n Team WaterResource` );
              //sendSms.sendSms(`Dear ${reqData.displayName}, \n\nYou have successfully registerd and your password is ${pass} \n\n Thanks \n Team WaterResource`,reqData.phone,'sms');
              sendSms.sendSms(`Dear ${reqData.displayName}, \n\nYou have successfully registerd and your password is ${pass} \n\n Thanks \n Team WaterResource`,reqData.phone,'sms',function(cdata)
              {
                console.log('callback------------',cdata);
                if(cdata == "Phone number is undefined")
                {
                  LOG.debug(`User Phone number is undefined `,result);
                  console.log('callback1------------',cdata);
                }
                else if(cdata == 200)
                {
                  LOG.debug(`User Registered Successfully with creadential `,result);
                  console.log('callback2------------',cdata);
                }
                else if (cdata.includes("Error"))
                {
                  LOG.debug(`Sms Send Failed `,result);
                  console.log('callback3------------',cdata);
                }
                else
                {
                  LOG.debug(`Some Error Occured Sending SMS`,result);    
                }
              });
                            
              data.message = 'User created.';
              data.data = result;
            }
            else
            {
               data.message = 'Failed !!!.';
               data.data = result;
            }
          }
        }
    } catch (err) {
      LOG.error("SQL error!!!");
      data.status = 'FAILURE';
      data.message = err.message;
  }
  LOG.debug(data);
  return data;
};

//generateOtp
const generateOtp = async (body) => {
  LOG.info('Inside generateOtp');
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  var Today = new Date(); 
  var today = Today.getTime(); 
  try {
    LOG.debug(body.userName + " : ");
    const user = await User.findOne({
      where: {
        user_name: body.userName,
        mobile: body.mobileNo
      }
    });
    LOG.debug(user);
    if(user !== null){
      if(user.otp_validity != null) {
        if(today < Number(user.otp_validity)) 
        {
          LOG.error("You can not send otp before (5 Min)");
          data.status = 'INVALID';
          data.message = 'You can not send otp before (5 Min)';
        }
        else
        {
          var otp = await OtpStore.storeOtp(user);
          if(otp !== null){
            LOG.info('Otp Sent Successfully to email : ' + user.email);
            email.sendSimpleMail(user.email,"Otp Sent Successfully", `Dear ${user.display_name}, \n\nOtp for changing your password is ${otp} \n\n Thanks \n Team WaterResource` );
            sendSms.sendSms(`Dear ${body.userName}, \n\nOtp for changing your password is ${otp} \n\n Thanks \n Team WaterResource`,body.mobileNo,'otp',function(cdata)
            {
              console.log('callback------------',cdata);
              if(cdata == "Phone number is undefined")
              {
                LOG.debug(`User Phone number is undefined `,user.email);
                console.log('callback1------------',cdata);
              }
              else if(cdata == 200)
              {
                LOG.debug(`Otp Sent Successfully to email `,user.email);
                console.log('callback2------------',cdata);
              }
              else if (cdata.includes("Error"))
              {
                LOG.debug(`Some Error Occured in Otp `,user.email);
                console.log('callback3------------',cdata);
              }
              else
              {
                LOG.info('Otp Sent Failed : ' + user.email);
              }
            });
          }
        }
      }
      else
      {
        var otp = await OtpStore.storeOtp(user);
        if(otp !== null){
          LOG.info('Otp Sent Successfully to email : ' + user.email);
          email.sendSimpleMail(user.email,"Otp Sent Successfully", `Dear ${user.display_name}, \n\nOtp for changing your password is ${otp} \n\n Thanks \n Team WaterResource` );
          sendSms.sendSms(`Dear ${body.userName}, \n\nOtp for changing your password is ${otp} \n\n Thanks \n Team WaterResource`,body.mobileNo,'otp',function(cdata)
          {
            console.log('callback------------',cdata);
            if(cdata == "Phone number is undefined")
            {
              LOG.debug(`User Phone number is undefined `,user.email);
              console.log('callback1------------',cdata);
            }
            else if(cdata == 200)
            {
              LOG.debug(`Otp ReSent Successfully to email `,user.email);
              console.log('callback2------------',cdata);
            }
            else if (cdata.includes("Error"))
            {
              LOG.debug(`Some Error Occured in Otp Resend `,user.email);
              console.log('callback3------------',cdata);
            }
            else
            {
              LOG.info('Otp ReSent Failed : ' + user.email);
            }
          }); 
        }
      }
    }else{
      data.status = 'INVALID';
      data.message = 'Username is not exist';
    }
  } catch (err) {
    throw err;
  }
  return data;
};

//resendOtp
const resendOtp = async (userName) => {
  LOG.info('Inside resendOtp');
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  var today = new Date();
  var time = (today.getTime() + ((1000 * 60 * 60 * 1) / 15));
  try {
    LOG.debug(userName + " : ");
    const user = await User.findOne({
      where: {
        user_name: userName
      }
    });
    LOG.debug(user);
    if(user !== null){
      if(user.otp_validity != null) {
        if(time <= Number(user.otp_validity)) {
          LOG.error("You have not resend otp before (60 Sec)");
          data.status = 'INVALID';
          data.message = 'You have not resend otp before (60 Sec)';
        }else{
          var otp = await OtpStore.getUserDuplicateOtp(user);
          if(otp !== null){
            LOG.info('Otp Resend Successfully to email : ' + user.email);
            email.sendSimpleMail(user.email,"Otp Resend Successfully", `Dear ${user.display_name}, \n\nResnd Otp for changing your password is ${otp} \n\n Thanks \n Team WaterResource` );
          }
        }
      }
    }else{
      data.status = 'INVALID';
      data.message = 'Username is not exist';
    }
  } catch (err) {
    throw err;
  }
  return data;
};

//changePassword
const changePassword = async (req) => {
  LOG.info('Inside changePassword',req.body);
  var Today = new Date(); 
  var today = Today.getTime(); 
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
    LOG.debug(req.body.userName + " : ");
    const user = await User.findOne({
      where: {
        user_name: req.body.userName
      }
    });
    LOG.debug(user);
    if(user !== null){
      if(today > Number(user.otp_validity)) {
        LOG.error("You have entered expaired otp. Please enter the correct one.");
        data.status = 'INVALID';
        data.message = 'You have entered expaired otp. Please enter the correct one.';
      }else{
        var val = await OtpStore.isValidUserOtp(user,req.body.otp);
        if(val !== null){
          if(val === true){
            let result  = await User.update({
              user_password: req.body.password,
              first_login: false,
              otp_secret: null,
              otp_validity: null,
            },{
                where: {
                    user_name: user.user_name
                }
            })
            LOG.info('Password Changed Successfully : ' + user.email);
            data.message = 'Password Changed Successfully';
          }else{
            data.status = 'INVALID';
            data.message = 'Otp is not valid';
          }
        }else{
          data.status = 'INVALID';
          data.message = 'Otp is not valid';
        }
      }
    }else{
      data.status = 'INVALID';
      data.message = 'Username is not exist';
    }
  } catch (err) {
    throw err;
  }
  return data;
};

//getCaptcha
const getCaptcha = async (req,res) => {
  LOG.info('Inside getCaptcha');
  try {
    var captcha = svgCaptcha.create({
      size:6,
      noise:2
    });
    req.session.JSESSIONID = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
  } catch (err) {
    throw err;
  }
};

//get application status 
const getApplicationStatus = async (req, res) => {
  try {
    let id = parseInt(req);
    console.log('hit', typeof(id));
    var application = await Application.findOne({
      include: [{
          model: Status,
          as: 'Status',
          attributes: [],
      }],
      attributes: ['id','status_id', 'Status.status_name', 'name'],             

      // attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],             
      where: {
        id: id
      },
      raw: true
    });
      // console.log(application,'application');
    if (application) {
      console.log(application);
      // res.status(200).send(application);
      return(application);
    } else {
      console.log('Application not found');
    }
  } catch (error) {
    console.error('Error finding application:', error);
  }
};

module.exports = {
    login,
    logout,
    createUser,
    generateOtp,resendOtp,
    changePassword,getCaptcha,
    getApplicationStatus
}
