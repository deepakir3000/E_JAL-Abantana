const {
    check,
    validationResult
} = require('express-validator');
let {
    authenticate
} = require('../../middleware/authenticate');
const mdmService = require('../../services/mdm/mdmService');
const {
    logger
} = require('./../../config/log-config');
const LOG = logger.getLogger('mdmController.js');

//validate method
const validator = (method) => {
    LOG.debug("inside validator..");
    let arr;
    switch (method) {
        case 'createState': {
            LOG.debug("initializing createState validators..");
            arr = [
                check('stateName', 'stateName doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateState': {
            LOG.debug("initializing updateState validators..");
            arr = [
                check('id', 'state Id doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createDistrict': {
            LOG.debug("initializing createDistrict validators..");
            arr = [
                check('districtName', 'districtName doesn\'t exists').exists(),
                check('stateId', 'stateId doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateDistrict': {
            LOG.debug("initializing createDistrict validators..");
            arr = [
                check('districtId', 'districtId doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createBlock': {
            LOG.debug("initializing createDistrict validators..");
            arr = [
                check('blockName', 'blockName doesn\'t exists').exists(),
                check('districtId', 'districtId doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateBlock': {
            LOG.debug("initializing updateBlock validators..");
            arr = [
                check('blockId', 'blockId doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createIndustry': {
            LOG.debug("initializing createIndustry validators..");
            arr = [
                check('industryName', 'industryName doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateIndustry': {
            LOG.debug("initializing updateIndustry validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createPurpose': {
            LOG.debug("initializing createPurpose validators..");
            arr = [
                check('purposeName', 'purposeName doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updatePurpose': {
            LOG.debug("initializing updatePurpose validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createApplicationType': {
            LOG.debug("initializing createApplicationType validators..");
            arr = [
                check('applicationType', 'applicationType doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateApplicationType': {
            LOG.debug("initializing updateApplicationType validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createOperationalSource': {
            LOG.debug("initializing createOperationalSource validators..");
            arr = [
                check('operationalSource', 'operationalSource doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateoperationalSource': {
            LOG.debug("initializing updateoperationalSource validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }
        case 'createRiver': {
            LOG.debug("initializing createRiver validators..");
            arr = [
                check('riverName', 'riverName doesn\'t exists').exists(),
                check('basinId', 'basinId doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateRiver': {
            LOG.debug("initializing createRiver validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }

        case 'createBasin': {
            LOG.debug("initializing createBasin validators..");
            arr = [
                check('basinName', 'basinName doesn\'t exists').exists(),
            ];
            break;
        }

        case 'updateBasin': {
            LOG.debug("initializing updateBasin validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }
        
        case 'createDam': {
            LOG.debug("initializing createRiver validators..");
            arr = [
                check('damName', 'damName doesn\'t exists').exists(),
                check('basinId', 'basinId doesn\'t exists').exists(),
            ];
            break;
        }
        case 'updateDam': {
            LOG.debug("initializing createRiver validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),
            ];
            break;
        }case 'actionForIndustries': {
            LOG.debug("initializing actionForIndustries validators..");
            arr = [
                check('id', 'id doesn\'t exists').exists(),

                check('userId', 'Eeecutive Engineer doesn\'t exists').exists(),
            ];
            break;
        }
    }
    return arr;
};

let validateResult = (data, res) => {
    LOG.debug("INSIDE VALIDATE RESULT");
    if (data.status === 'FAILURE') {
        LOG.error(data);
        res.status(500);
        return data;
    } else if (data.status === 'DUPLICATE' || data.status === 'INVALID' || data.status === 'NOT FOUND') {
        LOG.error(data);
        res.status(400);
        return data;
    } else {
        LOG.info(data);
        res.status(200);
        return data;
    }
};

//createState
const createState = async (req, res) => {
    LOG.info('Inside createState');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createState(req);
    validateResult(data, res);
    res.send(data);
};

//updateState
const updateState = async (req, res) => {
    LOG.info('Inside createState');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateState(req);
    validateResult(data, res);
    res.send(data);
};

//getAllState
const getAllState = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    var pageNo = 0;
    var size = 0;
    var query = {
      status: 1,
      order: "ASC"
    };
    var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
    var order = (req.query.orderField != null && ["ASC", "DESC"].includes(req.query.orderField.toString().trim().toUpperCase())) ? req.query.orderField.toString().trim().toUpperCase() : "ASC";
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

    let data = await mdmService.getAllStates(req);
    validateResult(data, res);
    res.send(data);
};

//createDistrict
const createDistrict = async (req, res) => {
    LOG.info('Inside createDistrict at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createDistrict(req);
    validateResult(data, res);
    res.send(data);
};

//getAllDistrict
const getAllDistrict = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllDistrict(req);
    validateResult(data, res);
    res.send(data);
};

//updateDistrict
const updateDistrict = async (req, res) => {
    LOG.info('Inside updateDistrict');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateDistrict(req);
    validateResult(data, res);
    res.send(data);
};

//createBlock
const createBlock = async (req, res) => {
    LOG.info('Inside createBlock at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createBlock(req);
    validateResult(data, res);
    res.send(data);
};

//updateBlock
const updateBlock = async (req, res) => {
    LOG.info('Inside updateDistrict');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateBlock(req);
    validateResult(data, res);
    res.send(data);
};

//getAllBlocks
const getAllBlocks = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllBlocks(req);
    validateResult(data, res);
    res.send(data);
};

//createIndustry
const createIndustry = async (req, res) => {
    LOG.info('Inside createIndustry at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createIndustry(req);
    validateResult(data, res);
    res.send(data);
};

//getALlIndustries
const getALlIndustries = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getALlIndustries(req);
    validateResult(data, res);
    res.send(data);
};

//updateIndustry
const updateIndustry = async (req, res) => {
    LOG.info('Inside updateIndustry');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateIndustry(req);
    validateResult(data, res);
    res.send(data);
};

//createPurpose
const createPurpose = async (req, res) => {
    LOG.info('Inside createPurpose at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createPurpose(req);
    validateResult(data, res);
    res.send(data);
};

//updatePurpose
const updatePurpose = async (req, res) => {
    LOG.info('Inside updatePurpose');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updatePurpose(req);
    validateResult(data, res);
    res.send(data);
};

//getAllPurpose
const getAllPurpose = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    var pageNo = 0;
    var size = 0;
    var query = {
      status: 1,
      order: "ASC"
    };
    var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
    var order = (req.query.orderField != null && ["ASC", "DESC"].includes(req.query.orderField.toString().trim().toUpperCase())) ? req.query.orderField.toString().trim().toUpperCase() : "ASC";
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
    let data = await mdmService.getAllPurpose(query);
    validateResult(data, res);
    res.send(data);
};

//createPurpose
const createApplicationType = async (req, res) => {
    LOG.info('Inside createApplicationType at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createApplicationType(req);
    validateResult(data, res);
    res.send(data);
};

//updateApplicationType
const updateApplicationType = async (req, res) => {
    LOG.info('Inside updateApplicationType');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateApplicationType(req);
    validateResult(data, res);
    res.send(data);
};

//getAllPurpose
const getAllApplicationType = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllApplicationType(req);
    validateResult(data, res);
    res.send(data);
};

//createOperationalSource
const createOperationalSource = async (req, res) => {
    LOG.info('Inside createOperationalSource at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createOperationalSource(req);
    validateResult(data, res);
    res.send(data);
};

//updateoperationalSource
const updateoperationalSource = async (req, res) => {
    LOG.info('Inside updateoperationalSource');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateoperationalSource(req);
    validateResult(data, res);
    res.send(data);
};

//getAllOperationalSource
const getAllOperationalSource = async (req, res) => {
    LOG.info('Inside getAllState');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllOperationalSource(req);
    validateResult(data, res);
    res.send(data);
};

//getAllBlocksByDistrict
const getAllBlocksByDistrict = async (req, res) => {
    LOG.info('Inside getAllBlocksByDistrict');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllBlocksByDistrict(req);
    validateResult(data, res);
    res.send(data);
};

//getALlIndustriesDetails
const getALlIndustriesDetails = async (req, res) => {
    LOG.info('Inside getALlIndustriesDetails');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getALlIndustriesDetails(req);
    validateResult(data, res);
    res.send(data);
};

//getAllIndustriesDetailsByStatus
const getAllIndustriesDetailsByStatus = async (req, res) => {
    LOG.info('Inside getAllIndustriesDetailsByStatus');
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
    let data = await mdmService.getAllIndustriesDetailsByStatus(req);
    validateResult(data, res);
    res.send(data);
};

//createRiver
const createRiver = async (req, res) => {
    LOG.info('Inside createRiver at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createRiver(req);
    validateResult(data, res);
    res.send(data);
};

//updateRiver
const updateRiver = async (req, res) => {
    LOG.info('Inside updateRiver at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateRiver(req);
    validateResult(data, res);
    res.send(data);
};

//getAllRivers
const getAllRivers = async (req, res) => {
    LOG.info('Inside getAllRivers');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllRivers(req);
    res.send(data);
};

//createBasin
const createBasin = async (req, res) => {
    LOG.info('Inside createBasin at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createBasin(req);
    validateResult(data, res);
    res.send(data);
};

//updateBasin
const updateBasin = async (req, res) => {
    LOG.info('Inside updateBasin at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateBasin(req);
    validateResult(data, res);
    res.send(data);
};

//getAllBasins
const getAllBasins = async (req, res) => {
    LOG.info('Inside getAllBasins');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllBasins(req);
    res.send(data);
};

//createDam
const createDam = async (req, res) => {
    LOG.info('Inside createDam at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createDam(req);
    validateResult(data, res);
    res.send(data);
};

//updateDam
const updateDam = async (req, res) => {
    LOG.info('Inside updateDam at MDM controller');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.updateDam(req);
    validateResult(data, res);
    res.send(data);
};

//getAllDams
const getAllDams = async (req, res) => {
    LOG.info('Inside getAllDams');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllDams(req);
    res.send(data);
};

//actionForIndustries
const actionForIndustries = async (req, res) => {
    LOG.info('Inside actionForIndustries at MDM controller');
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.actionForIndustries(req);
    validateResult(data, res);
    res.send(data);
};

//getAllDamsByRiver
const getAllDamsByRiver = async (req, res) => {
    LOG.info('Inside getAllDamsByRiver');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getAllDamsByRiver(req);
    validateResult(data, res);
    res.send(data);
};

const getFeedbackQuestions = async(req, res) =>{
    LOG.info('Inside getFeedbackQuestions');
    res.setHeader('Content-Type', 'application/json');
    let data = await mdmService.getFeedbackQuestions(req);
    validateResult(data, res);
    res.send(data);
}
const createFeedbackQuestion = async (req, res) => {
    LOG.info('Inside createFeedbackQuestion');
    res.setHeader('Content-Type', 'application/json');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await mdmService.createFeedbackQuestion(req);
    validateResult(data, res);
    res.send(data);
};


module.exports = {
    createState,
    updateState,
    getAllState,
    createDistrict,
    getAllDistrict,
    updateDistrict,
    createBlock,
    updateBlock,
    getAllBlocks,
    getAllBlocksByDistrict,
    createIndustry,
    getALlIndustries,
    updateIndustry,
    createPurpose,
    updatePurpose,
    getAllPurpose,
    createApplicationType,
    updateApplicationType,
    getAllApplicationType,
    createOperationalSource,
    updateoperationalSource,
    getAllOperationalSource,
    validator,
    getALlIndustriesDetails,
    getAllIndustriesDetailsByStatus,
    createRiver,
    updateRiver,
    getAllRivers,
    createBasin,
    updateBasin,
    getAllBasins,
    createDam,
    updateDam,
    getAllDams,
    actionForIndustries,
    getAllDamsByRiver,
    getFeedbackQuestions,
    createFeedbackQuestion
};