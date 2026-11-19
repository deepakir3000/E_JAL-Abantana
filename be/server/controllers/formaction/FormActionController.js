const { check, validationResult } = require('express-validator');
var { authenticate } = require('../../middleware/authenticate')
const { logger } = require('./../../config/log-config');
const LOG = logger.getLogger('FormActionController.js');
const formActionServices = require('../../services/formaction/FormActionService');

//validate method
const validator = (method) => {
    LOG.debug("inside validator..");
    var arr;
    switch (method) {
        case 'createForm':
            {
                LOG.debug("initializing createForm validators..");
                arr = [
                    check('appType', 'Application Type doesn\'t exists').exists(),

                    check('email', 'Invalid email').exists().isEmail(),

                    check('name', 'name doesn\'t exists').exists(),

                    check('purpose').exists().isInt(),

                    check('ceName', 'Establishment name doesn\'t exists').exists(),

                    check('appFor').exists().isInt(),

                    check('indType', 'Industry type does\'t exist').exists().isInt(),

                    check('distId', 'District Id does\'t exist').exists().isInt(),

                    check('blockId', 'Block Id does\'t exist').exists().isInt(),

                    check('address', 'Address doesn\'t exists').exists(),

                    check('panNo', 'Pan Number doesn\'t exists').exists(),

                    check('presentCap', 'Present Capacity doesn\'t exists').exists().isFloat(),

                    check('futureCap', 'Future Capacity doesn\'t exists').exists().isFloat(),

                    check('quanIntended', 'Quantity intended for operation source does\'t exist').exists().isInt(),

                    check('opQuant', 'Quantity intended for operation does\'t exist').exists(),
                ];
                break;
            }
        case 'actionTaken':
            {
                LOG.debug("initializing updateState validators..");
                arr = [
                    check('appId', 'Application Id doesn\'t exists').exists(),

                    check('wfId', 'WorkFlow Id doesn\'t exists').exists(),

                    check('stId', 'WorkFlow Step Id doesn\'t exists').exists(),

                    check('trId', 'WorkFlow Step Transition Id doesn\'t exists').exists(),

                    check('toId', 'User To Id doesn\'t exists').exists(),
                ];
                break;
            }
        case 'createBankRequest':
            {
                LOG.debug("initializing updateState validators..");
                arr = [

                ];
                break;
            }
    }
    return arr;
};

//formSubmit
const formSubmit = async(req, res) => {
    LOG.info('Inside formSubmit');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };

    // const industryfile = req.files['industry'][0];
    // req.body.filename = file === undefined ? null : file.filename

    var data = await formActionServices.formSubmit(req)
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
    } else {
        res.status(201); //as new user is created
    }
    LOG.info(data);
    res.send(data);
};

//getApplicationData
const getApplicationData = async(req, res) => {
    LOG.info('Inside getApplicationData');
    res.setHeader('Content-Type', 'application/json');

    var data = await formActionServices.getApplicationData(req);
    if (data.message != 'SUCCESS') {
        res.status(500);
    } else if (data.data.length == 0) {
        data.message = 'No Data found.';
        res.status(404);
    } else {
        res.status(200);
    }
    LOG.info(data);
    res.send(data);
};

//changeApplicationStatus
const changeApplicationStatus = async(req, res) => {
    LOG.info('Inside changeApplicationStatus');
    res.setHeader('Content-Type', 'application/json');

    var data = await formActionServices.changeApplicationStatus(req);
    if (data.status == 'FAILURE') {
        res.status(500);
    } else if (data.status == 'INVALID') {
        data.message = 'Application Id is invalid';
        res.status(400);
    } else {
        res.status(200);
    }
    LOG.info(data);
    res.send(data);
};

//getAllApplication
const getAllApplication = async(req, res) => {
    LOG.info('Inside getAllApplication');
    res.setHeader('Content-Type', 'application/json');
    var pageNo = 0;
    var size = 0;
    var query = {
        status: 1,
        order: "ASC"
    };
    var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
    var order = (req.query.order != null && ["ASC", "DESC"].includes(req.query.order.toString().trim().toUpperCase())) ? req.query.order.toString().trim().toUpperCase() : "ASC";
    console.log(paginated);
    if (paginated) {
        pageNo = parseInt(req.query.pageNumber);
        size = parseInt(req.query.pageSize);

        if (pageNo < 0 || pageNo == 0) {
            res.status(404);
            res.send({
                "message": "invalid page number"
            });
            return;
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
    }
    req.query = query;
    var data = await formActionServices.getAllApplication(req);
    if (data.message != 'SUCCESS') {
        res.status(500);
    } else if (data.data.length == 0) {
        data.message = 'No Data found.';
        res.status(200);
    } else {
        res.status(200);
    }
    LOG.info(data);
    res.send(data);
};

//getApplicationDataById
const getApplicationDataById = async(req, res) => {
    LOG.info('Inside getApplicationDataById');
    res.setHeader('Content-Type', 'application/json');
    var data = await formActionServices.getApplicationDataById(req);
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
    } else {
        res.status(200); //as new user is created
    }
    LOG.info(data);
    res.send(data);
};

//getApplicationDataForTrack
const getApplicationDataForTrack = async(req, res) => {
    LOG.info('Inside getApplicationDataForTrack');
    res.setHeader('Content-Type', 'application/json');
    var data = await formActionServices.getApplicationDataForTrack(req);
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
        data.message = 'No Data found.';
        data.status = 'NOT_INITIALIZED';
    } else {
        res.status(201);
    }
    LOG.info(data);
    res.send(data);
};

//nextStep
const nextStep = async(req, res) => {
    LOG.info('Inside nextStep');
    res.setHeader('Content-Type', 'application/json');
    var data = await formActionServices.nextStep(req);
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
        data.message = 'No Data found.';
    } else {
        res.status(201);
    }
    LOG.info(data);
    res.send(data);
};

//actionTaken
const actionTaken = async(req, res) => {
    LOG.info('Inside actionTaken');
    console.log(req.body,'reqreq')
    res.setHeader('Content-Type', 'application/json');
    var data = await formActionServices.actionTaken(req);
    console.log(data.status,'data.status');
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
        data.message = 'No Data found.';
    } else {
        data.message = 'Transaction Completed Successfully.';
        res.status(201);
    }
    LOG.info(data);
    res.send(data);
};

//formEdit
const formEdit = async(req, res) => {
    LOG.info('Inside formSubmit');
    res.setHeader('Content-Type', 'application/json');
    LOG.error('RIVERRRR ', req.files['intake']);
    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };

    var data = await formActionServices.formEdit(req)
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
    } else {
        res.status(200); //as new user is created
    }
    LOG.info(data);
    res.send(data);
};

//getAllApplicationById
const getAllApplicationById = async(req, res) => {
    LOG.info('Inside getAllApplicationById');
    res.setHeader('Content-Type', 'application/json');
    var pageNo = 0;
    var size = 0;
    var query = {
        status: 1,
        order: "ASC"
    };
    var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
    var order = (req.query.order != null && ["ASC", "DESC"].includes(req.query.order.toString().trim().toUpperCase())) ? req.query.order.toString().trim().toUpperCase() : "ASC";
    console.log(paginated);
    if (paginated) {
        pageNo = parseInt(req.query.pageNumber);
        size = parseInt(req.query.pageSize);

        if (pageNo < 0 || pageNo == 0) {
            res.status(404);
            res.send({
                "message": "invalid page number"
            });
            return;
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        query.type = req.query.type;
    }
    req.query = query;
    var data = await formActionServices.getAllApplicationById(req);
    if (data.message != 'SUCCESS') {
        res.status(500);
    } else if (data.data.length == 0) {
        data.message = 'No Data found.';
        res.status(200);
    } else {
        res.status(200);
    }
    LOG.info(data);
    res.send(data);
};

//createBankRequest
const createBankRequest = async(req, res) => {
    LOG.info('Inside createBankRequest');
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req); // Finds the validationResult
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    };

    var data = await formActionServices.createBankRequest(req)
        // window.location.href = 'www.google.com';
    if (data.status === 'FAILURE') {
        // res.status(500);
        res.writeHead(301, { "Location": 'http://103.231.40.104:8080/waterResource/index.html#/payment-statuss' });
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        // res.status(400);
        res.writeHead(301, { "Location": 'http://103.231.40.104:8080/waterResource/index.html#/payment-status' });
    } else {
        // res.status(200); //as new user is created
        res.writeHead(301, { "Location": 'http://103.231.40.104:8080/waterResource/index.html#/payment-status' + data.message });
    }
    LOG.info(data);
    res.end();
};


 //-----------------------------------------------------------------------------

  
const eAppealApplicationData = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    let data = await formActionServices.getPendingApplicationsForAppealDashboard(req);
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
    } else {
        res.status(200); //as new user is created
    }
    // LOG.info(data);
    res.send(data);
};


const getacknowledgementDetails = async(req, res) => {
    LOG.info('Inside getacknowledgementDetails');
    res.setHeader('Content-Type', 'application/json');
    console.log(req.params,'5555')
    var data = await formActionServices.getacknowledgementDetails(req);
    if (data.status === 'FAILURE') {
        res.status(500);
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
        res.status(400);
    } else {
        res.status(200); //as new user is created
    }
    // LOG.info(data);
    res.send(data);
};
 
module.exports = {
    validator,
    formSubmit,
    getApplicationData,
    changeApplicationStatus,
    getAllApplication,
    getApplicationDataById,
    getApplicationDataForTrack,
    nextStep,
    actionTaken,
    formEdit,
    getAllApplicationById,
    createBankRequest,
    eAppealApplicationData,
    getacknowledgementDetails
}