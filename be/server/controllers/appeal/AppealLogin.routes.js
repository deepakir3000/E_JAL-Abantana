module.exports = (router) => {
  var appealLoginApi = require('./AppealLoginController'); // adjust path to match your folder
  const { authenticateAppeal } = require('../../middleware/authenticateAppeal');

  // get captcha - reuse existing captcha endpoint, no need to duplicate
  // (frontend already calls /users/captcha via LoginService.getCaptchaImage())

  // appeal login route
  router.route('/appeal/login').post(appealLoginApi.validator('login'), appealLoginApi.login);
  router.route('/appeal/logout').get(authenticateAppeal, appealLoginApi.logout);
  router.route('/appeal/movement-history/:appId').get(authenticateAppeal, appealLoginApi.getApplicationMovementHistory);

  router.route('/appeal/profile')
    .get(authenticateAppeal, appealLoginApi.getProfile)
    .post(authenticateAppeal, appealLoginApi.updateProfile);




    router.route('/appeal/admin/users')
        .get(authenticateAppeal, appealLoginApi.getAllUsers);

router.route('/appeal/admin/audit-history/:userId')
    .get(authenticateAppeal, appealLoginApi.getUserAuditHistory);

router.route('/appeal/admin/user-flag')
    .post(authenticateAppeal, appealLoginApi.setNewUserFlag);
};





