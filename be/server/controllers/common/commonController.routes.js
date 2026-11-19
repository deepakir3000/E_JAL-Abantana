module.exports = (router) => {
    var { authenticate } = require('../../middleware/authenticate');
    var permit = require('../../middleware/authoriseApi');
    var uploadFile = require('../../utils/fileupload');
    var commonApi = require('./CommonController.js');

    router.route('/mediaDownload/:imageCode').get(commonApi.fileDownload);
    
    router.route('/landingDashboard').post(commonApi.landingDashboard);

    router.route('/citizenDashboardData').get(authenticate, permit(['CITIZEN', 'SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.'], 'citizenDashboardData', false), commonApi.getCitizenDashboard);

    router.route('/allDashboardDataBasedOnType').get(authenticate, permit(['CITIZEN', 'SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.'], 'allDashboardDataBasedOnType', false), commonApi.allDashboardDataBasedOnType);

    router.route('/postFeedbackData').post(authenticate, permit(['CITIZEN'], 'INSERT_FEEDBACK', true), commonApi.createFeedback);

    router.route('/getFeedbackDetailsByName/:name').get(authenticate, permit(['CITIZEN', 'SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.'], 'getFeedbackDetailsByName', false), commonApi.getFeedbackDetailsByName);

    router.route('/getPaymentDetailById/:appID').get(authenticate, permit(['CITIZEN', 'SYSADMIN', 'PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR', 'EXECUTIVE_ENGINEER', 'CE_PLANNING', 'GOVT.'], 'getPaymentDetailById', false), commonApi.getPaymentDetailById);

    router.route('/setBankPaymentDetails').post(authenticate, commonApi.setBankPaymentDetails);

    // router.route('/testPaymentDetails').post(authenticate, commonApi.sendTreasuryData);

    router.route('/sendTreasuryData').post(authenticate, commonApi.sendTreasuryData);

    router.route('/treasuryRecieve').post( commonApi.treasuryRecieve);

    router.route('/getSCrollData').post( commonApi.GetSCrollData);

    router.route('/getDistrictList').get( commonApi.getDistrict);

    router.route('/getTable').post(commonApi.getTabledata);

    router.route('/GettransactionDetails/:data').get( commonApi.GettransactionDetails);
    
    // router.route('/testPaymentDetails').post(authenticate, commonApi.testTreasuryData);
    
    router.route('/createHolidayList').post(authenticate, permit(['ADDITIONAL_SECRETARY'], 'createHolidayList', false), commonApi.createHolidayList);

    router.route('/createHolidayName').post(authenticate, permit(['ADDITIONAL_SECRETARY'], 'createHolidayName', false), commonApi.createHolidayName);

    router.route('/updateHolidayList').post(authenticate, permit(['ADDITIONAL_SECRETARY'], 'updateHolidayList', false), commonApi.updateHolidayList);

    router.route('/deleteHolidayList').post(authenticate, permit(['ADDITIONAL_SECRETARY'], 'deleteHolidayList', false), commonApi.deleteHolidayList);

    router.route('/holidayList').get(authenticate, permit(['ADDITIONAL_SECRETARY'], 'holidayList', false), commonApi.holidayList);

    router.route('/getHolidayList').get(authenticate, permit(['ADDITIONAL_SECRETARY'], 'getHolidayList', false), commonApi.getHolidayList);

};