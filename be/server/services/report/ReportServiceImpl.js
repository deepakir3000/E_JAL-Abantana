const express = require('express');
var { cpool } = require('../../db/sql');
const hashing = require('../../middleware/sha512-hash');
const { logger } = require('./../../config/log-config');
var fileUploaded = require('../../utils/fileupload');
const { Status } = require('./../../models/uac/status.js');
const Excel = require('exceljs')
const { IndustrialWaterAllocation } = require('./../../models/mdm/industrialwaterallocation.js');
const LOG = logger.getLogger('ReportServiceImpl.js');

//yearWiseReport
const yearWiseReport = async(req) => {
    LOG.info("INSIDE yearWiseReport Service");
    let query = '';
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    if (req.query.status === 'null' ? false : req.query.status !== null) {
        if (query === '') {
            query = query + ' a.status_id = ' + req.query.status
        } else {
            query = query + 'and a.status_id = ' + req.query.status
        }
    }else{
        query = query + 'a.status_id != 4';
    }

    if (req.query.type === 'null' ? false : req.query.type !== null) {
        if (req.query.type === 'Ext') {
            if (query === '') {
                query = query + " a.type = 'EXT'"
            } else {
                query = query + " and a.type = 'EXT'"
            }
        } else {
            if (query === '') {
                query = query + " a.type = 'NEW'"
            } else {
                query = query + " and a.type = 'NEW'"
            }
        }
    }
    let innerQuery = '';
    if (req.query.year === 'null' ? false : req.query.year !== null) {
        if (innerQuery === '') {
            innerQuery = innerQuery + ' Year = ' + req.query.year
        } else {
            innerQuery = innerQuery + ' and Year = ' + req.query.year
        }
    }

    try {
        var paginated = req.query.isPaginationRequired === null ? false : req.query.isPaginationRequired;
        let innerQ = `SELECT count(*) as count
        FROM (
            SELECT 
                left(datename(month,a.created_on),3)as [month], year(a.created_on) as [year]
                ,a.id,a.[status_id],a.[industries_id],a.type
            FROM application_details a `
        if (query !== '') {
            innerQ = innerQ + 'where ' + query
        }
        innerQ = innerQ + ') as s '
        if (innerQuery !== '') {
            innerQ = innerQ + ' where ' + innerQuery
        }
        const totalCount = await cpool.query(innerQ)
        if (totalCount !== null) {
            let dataCount = totalCount.recordset;
            dataCount = dataCount[0].count;
            if (paginated === 'true' ? true : false) {
                data.totalElements = dataCount;
                data.totalPages = Math.floor((dataCount / req.pagination.limit) + (dataCount % (req.pagination.limit) > 0 ? 1 : 0));
            }
        }
        if (paginated === 'true' ? true : false) {
            if (innerQuery === '') {
                innerQuery = innerQuery + ' RowNum > ' + req.pagination.skip + ' AND RowNum <= ' + parseInt(req.pagination.limit + (req.pagination.skip))
            } else {
                innerQuery = innerQuery + ' and RowNum > ' + req.pagination.skip + ' AND RowNum <= ' + parseInt(req.pagination.limit + (req.pagination.skip))
            }
        }

        let expression = `SELECT  * FROM (SELECT    ROW_NUMBER() OVER ( ORDER BY a.id ) AS RowNum, 
        left(datename(month,a.created_on),3)as [month], year(a.created_on) as [year],
            a.*,b.status_name
            FROM  application_details as a
            inner join mst_status b on a.status_id = b.id `
        if (query !== '') {
            expression = expression + `where ${query} `
        }
        expression = expression + ') AS RowConstrainedResult '
        if (innerQuery !== '') {
            expression = expression + 'WHERE ' + innerQuery
        }
        expression = expression + ' ORDER BY RowNum'
        console.log('QUERY  ', expression);
        const totalRecord = await cpool.query(expression);
        if (totalRecord != null) {
            let dataRecord = totalRecord.recordset;
            data.data = dataRecord;
        } else {
            data.status = 'INVALID';
            data.message = 'Data not exist';
        }
    } catch (err) {
        data.status = 'INVALID';
        data.message = 'Something went wrong';
        LOG.debug(err);
        data.message = err.message;
    }
    if (data.data != null) {
        data.data = hashing.encrypt(JSON.stringify(data.data));
    } else {
        data.status = 'INVALID';
        data.message = 'Data not exist';
    }
    return data;
}

//mapDataByBasinId
const mapDataByBasinId = async(req) => {
    LOG.info('Inside FormActionService mapDataByBasinId');
    let { basinId } = req.params;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        const result = await IndustrialWaterAllocation.findAll({
            attributes: ['id', 'name_of_river_basin', 'avg_non_monsoon_flow_in_cusec', 'water_allocation_qty'],
            where: {
                id: basinId
            },
            raw: true
        });
        data.data = result;
        data.message = 'SUCCESS';
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
}

//yearWiseReportInExcel
const yearWiseReportInExcel = async(req, res) => {
    LOG.info('Inside FormActionService yearWiseReportInExcel');
    // let {basinId} = req.params;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        let workbook = new Excel.Workbook();
        let worksheet = workbook.addWorksheet('Debtors');

        worksheet.columns = [
            { header: 'First Name', key: 'firstName' },
            { header: 'Last Name', key: 'lastName' },
            { header: 'Date Of Birth', key: 'dob' },
        ]
        worksheet.columns.forEach(column => {
            column.width = column.header.length < 12 ? 12 : column.header.length
        })

        worksheet.getRow(1).font = { bold: true }

        worksheet.addRow({ firstName: 'Jayant', lastName: 'Kumar', dob: new Date(1970, 1, 1) });

        workbook.xlsx.writeFile('E://Debtors.xls')

        fileUploaded.download('E://', 'Debtors.xls', req, res);
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
}


module.exports = {
    yearWiseReport,
    mapDataByBasinId,
    yearWiseReportInExcel
}