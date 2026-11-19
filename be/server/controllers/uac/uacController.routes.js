module.exports = (router) => {
    var { authenticate } = require('../../middleware/authenticate');
    var permit = require('../../middleware/authoriseApi');
    var uploadFile = require('../../utils/fileupload');
    var uacApi = require('./UacController.js');
    // login Routes
    // router.route('/demo').get(uacApi.demo);
    router.route('/getRoles').get(authenticate, permit(['SYSADMIN'], 'getRoles', false), uacApi.getRoles);
    router.route('/createRole').post(authenticate, permit(['SYSADMIN'], 'INSERT_ROLE', true), uacApi.validator('createRole'), uacApi.createRole);
    router.route('/editRole').post(authenticate, permit(['SYSADMIN'], 'UPDATE_ROLE', true), uacApi.validator('editRole'), uacApi.editRole);
    router.route('/createResource').post(authenticate, permit(['SYSADMIN'], 'INSERT_RESOURCE', true), uacApi.validator('createResource'), uacApi.createResource);
    router.route('/editResource').post(authenticate, permit(['SYSADMIN'], 'UPDATE_RESOURCE', true), uacApi.validator('editResource'), uacApi.editResource);
    router.route('/getResource').get(authenticate, permit(['SYSADMIN'], 'getResource', false), uacApi.getResource);
    router.route('/createUser').post(authenticate, permit(['SYSADMIN'], 'INSERT_USER', true), uacApi.validator('createUser'), uacApi.createUser);
    router.route('/editUser').post(authenticate, permit(['SYSADMIN'], 'UPDATE_USER', true), uploadFile.upload.single('file'), uacApi.validator('editUser'), uacApi.editUser);
    router.route('/getUsers').get(authenticate, permit(['SYSADMIN'], 'getUsers', false), uacApi.getUsers);
    router.route('/roleResourceMapping').post(authenticate, permit(['SYSADMIN'], 'ROLE_RESOURCE_MAPPING', true), uacApi.validator('resourceMapping'), uacApi.mapRoleResource);
    router.route('/getRoleResource').get(authenticate, permit(['SYSADMIN'], 'getRoleResource', false), uacApi.getRoleResource);
    router.route('/getParentResource').get(authenticate, permit(['SYSADMIN'], 'getParentResource', false), uacApi.getParentResource);
    router.route('/getUIResource').get(authenticate, uacApi.getUIResource);
    router.route('/getAllEE').get(authenticate, permit(['SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR'], 'getAllEE', false), uacApi.getAllEE);
    router.route('/changePassword').post(authenticate, permit(['CITIZEN', 'SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.'], 'PASSWORD_CHANGE', true), uacApi.validator('changePassword'), uacApi.changePassword);
};