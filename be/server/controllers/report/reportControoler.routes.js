module.exports = (router) => {
    var { authenticate } = require('../../middleware/authenticate');
    var permit = require('../../middleware/authoriseApi');
    var reportApi = require('./ReportControler.js');

    router.route('/yearWiseReport').get(authenticate, permit(['PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR'], 'yearWiseReport', false), reportApi.yearWiseReport);

    router.route('/yearWiseReportInExcel').get(authenticate, permit(['PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR'], 'yearWiseReport', false), reportApi.yearWiseReportInExcel);

    router.route('/mapDataByBasinId/:basinId').get(authenticate, permit(['PRINCIPAL_SECRETARY', 'ADDITIONAL_SECRETARY', 'DIRECTOR'], 'mapDataByBasinId', false), reportApi.mapDataByBasinId);
};