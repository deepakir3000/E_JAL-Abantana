const { check, validationResult } = require('express-validator');
var {authenticate} = require('../../middleware/authenticate')
const reportService = require('../../services/report/ReportServiceImpl');
const {logger} = require('./../../config/log-config');
const LOG = logger.getLogger('ReportController.js');

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

//yearWiseReport
const yearWiseReport = async (req, res) => {
    LOG.info("INSIDE yearWiseReport Controller");
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
    query.isPaginationRequired = paginated;
    req.pagination = query;
    let data = await reportService.yearWiseReport(req);
    validateResult(data, res);
    res.send(data);
}

//yearWiseReport
const mapDataByBasinId = async (req, res) => {
    LOG.info("INSIDE mapDataByBasinId Controller");
    res.setHeader('Content-Type', 'application/json');
    let data = await reportService.mapDataByBasinId(req);
    validateResult(data, res);
    res.send(data);
}

//yearWiseReportInExcel
const yearWiseReportInExcel = async (req, res) => {
    LOG.info("INSIDE yearWiseReportInExcel Controller");
    res.setHeader('Content-Type', 'application/json');
    await reportService.yearWiseReportInExcel(req,res);
}

module.exports = {
    yearWiseReport,mapDataByBasinId,yearWiseReportInExcel
  }