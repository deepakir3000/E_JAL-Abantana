module.exports = (router) => {
  var {authenticate} = require('../../middleware/authenticate');
  var loginApi= require('./LoginController.js');

  //get captcha
  router.route('/users/captcha').get(loginApi.getCaptcha);
  //get applicationStatus
  router.route('/users/applicationStatus').post(loginApi.getApplicationStatus);
  // login Routes
  router.route('/users/login').post(loginApi.validator('login'), loginApi.login);

  router.route('/users/logout').get(authenticate, loginApi.logout);
  
  router.route('/users/createUser').post(loginApi.validator('createUser'), loginApi.createUser);

  router.route('/users/generateOtp').post(loginApi.validator('forgetPassword'), loginApi.generateOtp);

  router.route('/users/resendOtp').post(loginApi.validator('forgetPassword'), loginApi.resendOtp);

  router.route('/users/changePassword').post(loginApi.validator('changePassword'), loginApi.changePassword);
};
