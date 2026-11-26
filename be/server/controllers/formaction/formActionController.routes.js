module.exports = (router) => {
    var { authenticate } = require('../../middleware/authenticate');
    const { authenticateAppeal } = require('../../middleware/authenticateAppeal');

    var permit = require('../../middleware/authoriseApi');
    var uploadFile = require('../../utils/fileupload');
    var formActionApi = require('./FormActionController');

    router.route('/formSubmit').post(authenticate, permit(['CITIZEN'], 'FORM_SUBMIT', true), uploadFile.upload.fields([
        { name: 'intake', maxCount: 1 }, { name: 'industry', maxCount: 1 }, { name: 'recomendation', maxCount: 1 },
        { name: 'mou', maxCount: 1 }, { name: 'certificate', maxCount: 1 }, { name: 'quantity', maxCount: 1 },
        { name: 'layout', maxCount: 1 }, { name: 'disposal', maxCount: 1 }, { name: 'scheme', maxCount: 1 },
        { name: 'waterMgmt', maxCount: 1 }, { name: 'allocationOrder', maxCount: 1 }, { name: 'cgwaCertificate', maxCount: 1 },
        { name: 'cgwa', maxCount: 1 }, { name: 'allocation', maxCount: 1 }, { name: 'renewal', maxCount: 1 }, { name: 'paymentDoc', maxCount: 1 },
        { name: 'indDetails', maxCount: 1 }, { name: 'jointReport', maxCount: 1 }
    ]), formActionApi.validator('createForm'), formActionApi.formSubmit);

    router.route('/formEdit').post(authenticate, permit(['CITIZEN'], 'FORM_UPDATE', true), uploadFile.upload.fields([
        { name: 'intake', maxCount: 1 }, { name: 'industry', maxCount: 1 }, { name: 'recomendation', maxCount: 1 },
        { name: 'mou', maxCount: 1 }, { name: 'certificate', maxCount: 1 }, { name: 'quantity', maxCount: 1 },
        { name: 'layout', maxCount: 1 }, { name: 'disposal', maxCount: 1 }, { name: 'scheme', maxCount: 1 },
        { name: 'waterMgmt', maxCount: 1 }, { name: 'allocationOrder', maxCount: 1 }, { name: 'cgwa', maxCount: 1 },
        { name: 'cgwaCertificate', maxCount: 1 }, , { name: 'allocation', maxCount: 1 }, { name: 'renewal', maxCount: 1 }, { name: 'paymentDoc', maxCount: 1 },
        { name: 'indDetails', maxCount: 1 }, { name: 'jointReport', maxCount: 1 }
    ]), formActionApi.validator('createForm'), formActionApi.formEdit);

    router.route('/getApplicationData').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getApplicationData', false), formActionApi.getApplicationData);

    router.route('/changeApplicationStatus/:appId').get(authenticate, permit(['CITIZEN', 'SYSADMIN'], 'INSERT_WORKFLOW', true), formActionApi.changeApplicationStatus);

    // router.route('/changeApplicationStatus/:appId').get(authenticate, permit(['CITIZEN'], 'INSERT_WORKFLOW', true), formActionApi.changeApplicationStatus);

    router.route('/getAllApplication/:status').get(authenticate, permit(['CITIZEN', 'SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getAllApplication', false), formActionApi.getAllApplication);

    router.route('/getApplicationDataById/:appId').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getApplicationDataById', false), formActionApi.getApplicationDataById);

    router.route('/getApplicationDataForTrack/:appId').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getApplicationDataForTrack', false), formActionApi.getApplicationDataForTrack);

    router.route('/workflow/nextStep').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'workflow/nextStep', false), formActionApi.nextStep);

    router.route('/workflow/actionTaken').post(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'FORM_ACTION_TAKEN', true), uploadFile.upload.fields([
        { name: 'allocation_order', maxCount: 1 }
    ]), formActionApi.validator('actionTaken'), formActionApi.actionTaken);

    router.route('/getAllApplicationById/:id').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getAllApplicationById', false), formActionApi.getAllApplicationById);

    router.route('/createBankRequest').post(formActionApi.validator('createBankRequest'), formActionApi.createBankRequest);
    //  router.route('/eAppealApplicationData').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getAllApplicationById', false), formActionApi.eAppealApplicationData);

    router.route('/eAppealApplicationData').get(authenticateAppeal, formActionApi.eAppealApplicationData);
    router.route('/getacknowledgementDetails/:appId').get(authenticate, permit(['CITIZEN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.', 'CE_GROUNDWATER'], 'getacknowledgementDetails', false), formActionApi.getacknowledgementDetails);

};