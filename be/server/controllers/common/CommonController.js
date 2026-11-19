const { check, validationResult } = require('express-validator');
var {authenticate} = require('../../middleware/authenticate')
const {logger} = require('./../../config/log-config');
const LOG = logger.getLogger('CommonController.js');
const commonServices = require('../../services/common/CommonServiceImpl');

const fileDownload = async (req, res) => {
    LOG.info('Inside fileDownload');
     res.setHeader('Content-Type', 'application/json');
    await commonServices.fileDownload(req,res);
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
        LOG.error(data);
        res.status(200);
        return data;
    }
};

//getCitizenDashboard
const getCitizenDashboard = async (req, res) => {
  LOG.info('Inside getCitizenDashboard at Common controller');
//   console.log('Role-----------------------=======---------:', req.role?.role_name);
  res.setHeader('Content-Type', 'application/json');

  let data = await commonServices.getCitizenDashboard(req);
  validateResult(data, res);
  res.send(data);
};

//allDashboardDataBasedOnType
const allDashboardDataBasedOnType = async (req, res) => {
    LOG.info('Inside allDashboardDataBasedOnType at Common controller');
    res.setHeader('Content-Type', 'application/json');
  
    let data = await commonServices.allDashboardDataBasedOnType(req);
    validateResult(data, res);
    res.send(data);
  };

    //landingDashboard
    const landingDashboard = async(req, res) => {
        console.log('Inside landingDashboard at Common controller');
        res.setHeader('Content-Type', 'application/json');
        let data = await commonServices.landingDashboard(req);
        // return(data);
        res.send(data);
    };

  const createFeedback = async (req, res) => {
    LOG.info('Inside createFeedback at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.createFeedback(req);
    validateResult(data, res);
    res.send(data);
  };

  const getFeedbackDetailsByName = async (req, res) => {
    LOG.info('inside getFeedbackDetailsByName at common controller', req.params);
    res.setHeader('Content-Type', 'application/json');
    let data = await commonServices.getFeedbackDetailsByName(req);
    validateResult(data, res);
    res.send(data);
  }
  
  const getPaymentDetailById = async (req, res) => {
    LOG.info('inside getPaymentDetailById at common controller', req.params);
    res.setHeader('Content-Type', 'application/json');
    let data = await commonServices.getPaymentDetailById(req);
    validateResult(data, res);
    res.send(data);
  }

  const setBankPaymentDetails = async(req, res) => {
    LOG.info('Inside setBankPaymentDetails at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.setBankPaymentDetails(req);
    // validateResult(data, res);
    res.send(data);
}
  const getHolidayList = async(req, res) => {
    // LOG.info('inside getHolidayList at common controller', req.params);
    res.setHeader('Content-Type', 'application/json');
    let data = await commonServices.getHolidayList();
    validateResult(data, res);
    res.send(data);
}

const holidayList = async(req, res) => {
    // LOG.info('inside getHolidayList at common controller', req.params);
    res.setHeader('Content-Type', 'application/json');
    let data = await commonServices.holidayList();
    validateResult(data, res);
    res.send(data);
}

const createHolidayList = async(req, res) => {
    LOG.info('Inside createHolidayList at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.createHolidayList(req);
    validateResult(data, res);
    res.send(data);
}


const createHolidayName = async(req, res) => {
    LOG.info('Inside createHolidayName at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.createHolidayName(req);
    validateResult(data, res);
    res.send(data);
}

const updateHolidayList = async(req, res) => {
    LOG.info('Inside update Holiday list at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.updateHolidayList(req);
    validateResult(data, res);
    res.send(data);
}

const deleteHolidayList = async(req, res) => {
    LOG.info('Inside delete Holiday list at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.deleteHolidayList(req);
    validateResult(data, res);
    res.send(data);
}

const getDistrict = async(req,res) => {
    let districtList = await commonServices.getDistrict();
    // console.log(districtList,'controller district');
    res.send (districtList);
}

const testTreasuryData = async(req, res) => {
    LOG.info('Inside sendTreasuryData at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            errors: errors.array()
        }).send();
        return;
    }
    let data = await commonServices.testTreasuryData(req.body);
    // validateResult(data, res);
    res.send(data);
}

const sendTreasuryData = async(req, res) => {
    console.log('send treasury');
    LOG.info('Inside sendTreasuryData at Common controller', req.body);
    res.setHeader('Content-Type', 'application/json');
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.status(400).json({
    //         errors: errors.array()
    //     }).send();
    //     return;
    // }
    let data = await commonServices.sendTreasuryData(req.body);
    // validateResult(data, res);
    res.send(data);
}

const treasuryRecieve = async(req,res) =>{
    let data = await commonServices.treasuryRecieve(req);
    console.log(data);
    // res.send(data);
    // const redirectUrl = `https://waterallocationod.nic.in/index.html#/payment-status?data=${data}`;
    // const redirectUrl = `http://localhost:3001/index.html#/payment-status?data=${data}`;
    const redirectUrl = `http://localhost:4200/index.html#/payment-status?data=${data}`;
    res.redirect(redirectUrl);
    // res.redirectUrl
}

const GettransactionDetails = async(req,res) =>{
    let data = await commonServices.GettransactionDetails(req);
    console.log(data);
    res.send(data);
}

const GetSCrollData = async(req,res) =>{
    let data = await commonServices.GetSCrollData(req);
    console.log(data);
    res.send(data);
}

//getTableData
const getTabledata = async(req, res) => {
    console.log('Inside TableData at Common controller');
    res.setHeader('Content-Type', 'application/json');
    let data = await commonServices.getTableData(req);
    res.send(data);
};

module.exports = {
    fileDownload,getCitizenDashboard,allDashboardDataBasedOnType,createFeedback, getFeedbackDetailsByName, getPaymentDetailById,createHolidayList,
    getHolidayList,
    holidayList,
    createHolidayName,
    updateHolidayList,
    deleteHolidayList,
    setBankPaymentDetails,
    testTreasuryData,
    landingDashboard,
    sendTreasuryData,
    treasuryRecieve,
    GetSCrollData,
    GettransactionDetails,
    getDistrict,
    getTabledata
  }