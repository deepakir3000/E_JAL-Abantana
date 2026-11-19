const express = require('express');
var { cpool } = require('../../db/sql');
const { Sequelize } = require('sequelize');
const sql = require('mssql');
const { logger } = require('./../../config/log-config');
var PropertiesReader = require('properties-reader');
const { AppConstants } = require('./../../utils/AppConstants');
var properties = PropertiesReader('./server/utils/application.properties');
var fileUploaded = require('../../utils/fileupload');
const { User } = require('../../models/uac/user');
const { Purpose } = require('./../../models/mdm/purpose');
const { Status } = require('./../../models/uac/status.js');
const { AllocationType } = require('./../../models/mdm/allocationType.js');
const { WorkFlowStepTransitonTypeMst } = require('./../../models/workflow/workflowsteptransitiontypemst.js');
const { LocationDetails } = require('./../../models/formaction/locationdetails.js');
const { Application } = require('./../../models/formaction/applicationdetails.js');
const { WorkflowExecutionLog } = require('./../../models/workflow/workflowexecutionlog.js');
const { WaterManagement } = require('./../../models/formaction/watermgmt.js');
const { PhaseWise } = require('./../../models/formaction/phasewisereq.js');
const { WaterRequisirion } = require('./../../models/formaction/waterrequisition.js');
const { feedback } = require('./../../models/feedback/feedback.js');
const { payment_jform } = require('./../../models/payment/paymentDetails.js');
const { Holidays } = require('./../../models/uac/holidayslist');
const { Holidayname } = require('./../../models/uac/holidayname');
const {
    TreasuryTransaction,
  } = require("./../../models/payment/TreasuryTransaction.js");
const LOG = logger.getLogger('CommonServiceImpl.js');
const Op = Sequelize.Op; 
const ORTPSAClient = require('./../../services/webclientortpsa/ORTPSAClient.js');
const EncryptDecrypt = require('./../../services/webclientortpsa/encryptDecrypt.js');
const ORTPSATransaction = require('./../../services/webclientortpsa/ORTPSATransaction.js')
const crypto = require('crypto');
const https = require('https');
const request = require('request');
const fs = require("fs");
    //fileDownload
  const { WorkFlowStepTransition } = require('./../../models/workflow/workflowsteptransitions.js');
const { WorkFlowStep } = require('./../../models/workflow/workflowstep.js');
const { WorkFlowConfig } = require('./../../models/workflow/applicationtypeworkflowconfig.js');  
const fileDownload = async(req, res) => {
    LOG.info('Inside CommonServiceImpl fileDownload');
    let path = null;
    let basePath = properties.get('media.file');
    let { imageCode } = req.params;
    var user = null;
    var code = null;
    if (imageCode !== null) {
        code = imageCode.split('_');
    }
    if (code[0] === 'user') {
        user = await User.findOne({
            where: {
                id: code[1]
            },
            raw: true
        });
        if (user != null) {
            path = user.profile_image_url;
        }
        basePath = basePath + properties.get('profile.image') + properties.get('path.seperator') + code[1] + properties.get('path.seperator')
    } else if (code[0] === 'intake' || code[0] === 'industry' || code[0] === 'recomendation' || code[0] === 'mou') {
        let loc = await LocationDetails.findOne({
            attributes: ['id', 'intake_loc', 'industry_loc', 'recomend_letter', 'mou_signed', 'intake_latitude', 'intake_longitude', 'industry_latitude', 'industry_longitude'],
            where: {
                application_id: parseInt(code[1])
            },
            raw: true
        });
        console.log(loc);
        if (loc != null) {
            if (code[0] === 'intake') {
                path = loc.intake_loc;
            } else if (code[0] === 'industry') {
                path = loc.industry_loc;
            } else if (code[0] === 'recomendation') {
                path = loc.recomend_letter;
            } else if (code[0] === 'mou') {
                path = loc.mou_signed;
            }
        }
    } else if (code[0] === 'certificate' || code[0] === 'quantity' || code[0] === 'cgwaCertificate' || code[0] === 'jointReport') {
        let water = await WaterRequisirion.findOne({
            attributes: ['id', 'op_quantity', 'certificate', 'cal_of_quantity', 'cgwa_certificate', 'joint_report'],
            where: {
                application_id: code[1]
            },
            raw: true
        });
        if (water != null) {
            if (code[0] === 'certificate') {
                path = water.certificate;
            } else if (code[0] === 'quantity') {
                path = water.cal_of_quantity;
            } else if (code[0] === 'cgwaCertificate') {
                path = water.cgwa_certificate;
            } else if (code[0] === 'jointReport') {
                path = water.joint_report;
            }
        }
    } else if (code[0] === 'indDetails' || code[0] === 'layout' || code[0] === 'disposal' || code[0] === 'scheme' || code[0] === 'waterMgmt' || code[0] === 'allocationOrder') {
        let waterMgmt = await WaterManagement.findOne({
            attributes: ['id', 'layout_drawal', 'disposal_method', 'drawal_water', 'water_mgmt', 'allocation_order', 'industry_details'],
            where: {
                application_id: code[1]
            },
            raw: true
        });
        console.log(waterMgmt);
        if (waterMgmt != null) {
            if (code[0] === 'layout') {
                path = waterMgmt.layout_drawal;
            } else if (code[0] === 'disposal') {
                path = waterMgmt.disposal_method;
            } else if (code[0] === 'scheme') {
                path = waterMgmt.drawal_water;
            } else if (code[0] === 'waterMgmt') {
                path = waterMgmt.water_mgmt;
            } else if (code[0] === 'allocationOrder') {
                path = waterMgmt.allocation_order;
            } else if (code[0] === 'indDetails') {
                path = waterMgmt.industry_details;
            }
        }
    } else if (code[0] === 'cgwa') {

         console.log('========== CGWA DOWNLOAD ==========');
    console.log('imageCode:', imageCode);
    console.log('code:', code);
    console.log('Phase ID:', code[1]);

        let phase = await PhaseWise.findOne({
            attributes: ['id', 'cgwa_certificate'],
            where: {
                id: code[1]
            },
            raw: true
        });

         console.log('Phase record:', phase);
        if (phase != null) {
            if (code[0] === 'cgwa') {
                path = phase.cgwa_certificate;
            }
              console.log('CGWA path:', path);
        }
    } else if (code[0] === 'allocation' || code[0] === 'renewal' || code[0] === 'paymentDoc') {
        const app = await Application.findOne({
            attributes: ['id', 'cur_aloc_order', 'renewal_recom', 'payment_doc'],
            where: {
                id: code[1]
            },
            raw: true
        });
        if (app != null) {
            if (code[0] === 'allocation') {
                path = app.cur_aloc_order;
            } else if (code[0] === 'renewal') {
                path = app.renewal_recom;
            } else if (code[0] === 'paymentDoc') {
                path = app.payment_doc;
            }
        }
    } else if (code[0] === 'wfAllocation') {
        const app = await WorkflowExecutionLog.findOne({
            attributes: ['id', 'allocation_file'],
            where: {
                id: code[1]
            },
            raw: true
        });
        if (app != null) {
            if (code[0] === 'wfAllocation') {
                path = app.allocation_file;
            }
        }
    }
    console.log('PATH===============>', basePath, path);
    fileUploaded.download(basePath, path, req, res);
};

//getCitizenDashboard
const getCitizenDashboard = async(req) => {
    LOG.info('Inside CommonServiceImpl getCitizenDashboard');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        const app = await Application.findAll({
                include: [{
                    model: Purpose,
                    as: 'Purpose',
                    attributes: [],
                }, {
                    model: WorkFlowStepTransitonTypeMst,
                    as: 'WorkFlowStepTransitonTypeMst',
                    attributes: [],
                }, {
                    model: AllocationType,
                    as: 'AllocationType',
                    attributes: [],
                }, {
                    model: Status,
                    as: 'Status',
                    attributes: [],
                }],
                attributes: ['id', 'app_type', 'name', 'email', 'ce_name', 'created_on', 'industries_id', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'type'],
                where: {
                    status_id: {
                        [Op.ne]: AppConstants.DRAFT,
                    }
                },
                raw: true
            })
            //need update
        var extConApp = new Array();
        var extConRej = new Array();
        var extConPen = new Array();
        var extCon = new Array();
        var newConApp = new Array();
        var newConRej = new Array();
        var newConPen = new Array();
        var newCon = new Array();
        var purDrinking = new Array();
        var purComm = new Array();
        var purInd = new Array();
        var purOthers = new Array();
        var allCon = new Array();
        var allOp = new Array();
        var allBoth = new Array();
        if (app != null) {
            app.forEach((item) => {
                //Purpose wise data is fiven here
                if (item.purpose_name === 'DRINKING') {
                    purDrinking.push(item.id)
                } else if (item.purpose_name === 'COMMERCIAL') {
                    purComm.push(item.id)
                } else if (item.purpose_name === 'INDUSTRIAL') {
                    purInd.push(item.id)
                } else if (item.purpose_name === 'OTHERS') {
                    purOthers.push(item.id)
                }
                //Purpose wise data is fiven here
                if (item.application_type === 'CONSTRUCTIONAL') {
                    allCon.push(item.id)
                } else if (item.application_type === 'OPERATIONAL') {
                    allOp.push(item.id)
                } else if (item.application_type === 'BOTH') {
                    allBoth.push(item.id)
                }

                //Application Status Is Calculate here
                if (item.type === 'NEW') {
                    if (item.status_name === 'PENDING') {
                        newConPen.push(item.id)
                    } else if (item.status_name === 'COMPLETED') {
                        newConApp.push(item.id)
                    } else if (item.status_name === 'REJECTED') {
                        newConRej.push(item.id)
                    }
                    newCon.push(item.id)
                } else if (item.type === 'EXT') {
                    if (item.status_name === 'PENDING') {
                        extConPen.push(item.id)
                    } else if (item.status_name === 'COMPLETED') {
                        extConApp.push(item.id)
                    } else if (item.status_name === 'REJECTED') {
                        extConRej.push(item.id)
                    }
                    extCon.push(item.id)
                }
            })
            const totalRecord = await cpool.query(`select * from workflow_execution_log s join (select obj_id,max(id) id from workflow_execution_log group by obj_id) f1 on f1.id = s.id and f1.obj_id = s.obj_id join application_details a on s.obj_id = a.id join workflow_step_transitions c on s.wf_step_transition_id = c.id`);
            var prApp = new Array();
            var prPend = new Array();
            var spApp = new Array();
            var spPend = new Array();
            var drApp = new Array();
            var drPend = new Array();
            var eeApp = new Array();
            var eePen = new Array();
            var ceApp = new Array();
            var cePen = new Array();
            var govtApp = new Array();
            var govtPen = new Array();
            if (totalRecord != null) {
                let dataRecord = totalRecord.recordset;
                dataRecord.forEach((item) => {
                    //Condition for principle Secratery
                    if (item.from_id === '8' && item.to_id === null) {
                        prApp.push(item.id)
                    } else if (item.to_id === '8') {
                        prPend.push(item.id)
                    }
                    //Condition for Special Secratery
                    if (item.to_id === '9') {
                        spPend.push(item.id)
                    } else if (item.from_id === '9') {
                        spApp.push(item.id)
                    }
                    //Condition for Director Secratery
                    if (item.to_id === '10') {
                        drPend.push(item.id)
                    } else if (item.from_id === '10') {
                        drApp.push(item.id)
                    }
                    //Condition for EE
                    if (item.wf_step_to_id === '$EE_ID') {
                        eePen.push(item.id)
                    } else if (item.wf_step_from_id === '$EE_ID') {
                        eeApp.push(item.id)
                    }
                    //Condition for CE
                    if (item.wf_step_to_id === '50') {
                        govtPen.push(item.id)
                    } else if (item.wf_step_from_id === '50') {
                        govtApp.push(item.id)
                    }
                    //Condition for CE
                    if (item.wf_step_to_id === '$CE_ID') {
                        cePen.push(item.id)
                    } else if (item.wf_step_from_id === '$CE_ID') {
                        ceApp.push(item.id)
                    }
                })
            }
        }
        data = {
            newConnection: newCon.length,
            newConnectionPen: newConPen.length,
            newConnectionRej: newConRej.length,
            newConnectionApp: newConApp.length,
            extConnection: extCon.length,
            extConnectionPen: extConPen.length,
            extConnectionRej: extConRej.length,
            extConnectionApp: extConApp.length,
            purDrinking: purDrinking.length,
            purComm: purComm.length,
            purInd: purInd.length,
            purOthers: purOthers.length,
            allCon: allCon.length,
            allOp: allOp.length,
            allBoth: allBoth.length,
            prApp: prApp.length,
            prPend: prPend.length,
            spApp: spApp.length,
            spPen: spPend.length,
            drApp: drApp.length,
            drPen: drPend.length,
            eeApp: eeApp.length,
            eePen: eePen.length,
            ceApp: ceApp.length,
            cePen: cePen.length,
            govtApp: govtApp.length,
            govtPen: govtPen.length
        }
    } catch (err) {
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//allDashboardDataBasedOnType
const allDashboardDataBasedOnType = async(req) => {
    LOG.info('Inside CommonServiceImpl allDashboardDataBasedOnType');
    let type = req.query.type;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        const app = await Application.findAll({
                include: [{
                    model: Purpose,
                    as: 'Purpose',
                    attributes: [],
                }, {
                    model: WorkFlowStepTransitonTypeMst,
                    as: 'WorkFlowStepTransitonTypeMst',
                    attributes: [],
                }, {
                    model: AllocationType,
                    as: 'AllocationType',
                    attributes: [],
                }, {
                    model: Status,
                    as: 'Status',
                    attributes: [],
                }],
                attributes: ['id', 'app_type', 'name', 'email', 'ce_name', 'created_on', 'industries_id', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'type'],
                raw: true
            })
            //need update
        var extConApp = new Array();
        if (app != null) {
            app.forEach((item) => {
                    //Purpose wise data is fiven here
                    if (item.purpose_name === 'DRINKING' && type === 'DRINKING') {
                        extConApp.push(item)
                    } else if (item.purpose_name === 'COMMERCIAL' && type === 'COMMERCIAL') {
                        extConApp.push(item)
                    } else if (item.purpose_name === 'INDUSTRIAL' && type === 'INDUSTRIAL') {
                        extConApp.push(item)
                    } else if (item.purpose_name === 'OTHERS' && type === 'OTHERS') {
                        extConApp.push(item)
                    }
                    //Purpose wise data is fiven here
                    if (item.application_type === 'CONSTRUCTIONAL' && type === 'CONSTRUCTIONAL') {
                        extConApp.push(item)
                    } else if (item.application_type === 'OPERATIONAL' && type === 'OPERATIONAL') {
                        extConApp.push(item)
                    } else if (item.application_type === 'BOTH' && type === 'BOTH') {
                        extConApp.push(item)
                    }

                    //Application Status Is Calculate here
                    if (item.type === 'NEW') {
                        if (type === 'NEWAPPLIED') {
                            extConApp.push(item)
                        } else if ((item.status_name === 'DRAFT' || item.status_name === 'PENDING') && type === 'NEWPENDING') {
                            extConApp.push(item)
                        } else if (item.status_name === 'COMPLETED' && type === 'NEWCOMPLETED') {
                            extConApp.push(item)
                        } else if (item.status_name === 'REJECTED' && type === 'NEWREJECTED') {
                            extConApp.push(item)
                        }
                    } else if (item.industries_id !== null) {
                        if (type === 'EXTAPPLIED') {
                            extConApp.push(item)
                        } else if ((item.status_name === 'DRAFT' || item.status_name === 'PENDING') && type === 'EXTPENDING') {
                            extConApp.push(item)
                        } else if (item.status_name === 'COMPLETED' && type === 'EXTCOMPLETED') {
                            extConApp.push(item)
                        } else if (item.status_name === 'REJECTED' && type === 'EXTREJECTED') {
                            extConApp.push(item)
                        }
                    }
                })
                /*  const totalRecord = await cpool.query(`select * from workflow_execution_log s join (select obj_id,max(id) id from workflow_execution_log group by obj_id) f1 on f1.id = s.id and f1.obj_id = s.obj_id join application_details a on s.obj_id = a.id join workflow_step_transitions c on s.wf_step_transition_id = c.id`);
                 if(totalRecord != null){
                     let dataRecord = totalRecord.recordset;
                     dataRecord.forEach((item)=>{
                         //Condition for principle Secratery
                         if(item.from_id === '8' && item.to_id === null){
                           prApp.push(item)
                         }else if(item.to_id === '8'){
                           prPend.push(item)
                         }
                        //Condition for Special Secratery
                         if(item.to_id === '9'){
                           spPend.push(item)
                         }else if(item.from_id === '9'){
                           spApp.push(item)
                         }
                        //Condition for Director Secratery
                         if(item.to_id === '10'){
                           drPend.push(item)
                         }else if(item.from_id === '10'){
                           drApp.push(item)
                         }
                         //Condition for EE
                         if(item.wf_step_to_id === '$EE_ID'){
                           eePen.push(item)
                         }else if(item.wf_step_from_id === '$EE_ID'){
                           eeApp.push(item)
                         }
                     })
                 } */
        }
        data = extConApp
    } catch (err) {
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};



//landing dashboard
const landingDashboard = async (req) => {
    console.log("hitted", req.body);
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let district = req.body.district;
    var code = 6;
    try {
        let latestquery = `
        SELECT
        (SELECT COUNT(*) FROM [jform].[dbo].[application_details]) AS TotalApplication,
        COUNT(CASE WHEN status_name = 'ACTIVE' THEN 1 END) AS Active,
        COUNT(CASE WHEN status_name = 'INACTIVE' THEN 1 END) AS Inactive,
        COUNT(CASE WHEN status_name = 'DRAFT' THEN 1 END) AS Draft,
        COUNT(CASE WHEN status_name = 'PENDING' THEN 1 END) AS Pending,
        COUNT(CASE WHEN status_name = 'COMPLETED' THEN 1 END) AS Completed,
        COUNT(CASE WHEN status_name = 'REJECTED' THEN 1 END) AS Rejected,
        MIN(duration_in_days) AS min_duration,
        MAX(duration_in_days) AS max_duration,
        AVG(duration_in_days) AS mean,
        SUM(CASE WHEN duration_in_days > 180 THEN 1 ELSE 0 END) AS count_gr_180
         --(SELECT duration_in_days FROM DurationRank WHERE RowNum = (SELECT CEILING(COUNT(*) / 2.0) FROM DurationRank)) AS median_duration
    FROM (
        SELECT 
            ot.id,
            DATEDIFF(DAY, MIN(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END), 
                MAX(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END)) AS duration_in_days,
            status_table.status_name
        FROM 
            [jform].[dbo].[workflow_execution_log] AS wel 
        Right Outer JOIN 
            [jform].[dbo].[application_details] AS ot ON wel.obj_id = ot.id
        JOIN 
            [jform].[dbo].[mst_status] AS status_table ON ot.status_id = status_table.id
        GROUP BY 
            ot.id, status_table.status_name
    ) AS SubQuery;
        `;
     
  
      let queryTest=`
      DECLARE @startDate datetimeoffset = '${startDate}';
      DECLARE @endDate datetimeoffset = '${endDate}';
      
      SELECT
          COUNT(DISTINCT obj_id) AS TotalApplication,
          COUNT(CASE WHEN status_name = 'ACTIVE' THEN 1 END) AS Active,
          COUNT(CASE WHEN status_name = 'INACTIVE' THEN 1 END) AS Inactive,
          COUNT(CASE WHEN status_name = 'DRAFT' THEN 1 END) AS Draft,
          COUNT(CASE WHEN status_name = 'PENDING' THEN 1 END) AS Pending,
          COUNT(CASE WHEN status_name = 'COMPLETED' THEN 1 END) AS Completed,
          COUNT(CASE WHEN status_name = 'REJECTED' THEN 1 END) AS Rejected
      FROM (
          SELECT 
              ot.id,
              ot.created_on,
              wel.created_on AS created_onwel,
              DATEDIFF(DAY, 
                  MIN(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END), 
              MAX(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END)
              ) AS duration_in_days,
              status_table.status_name,wel.obj_id as obj_id,
              DENSE_RANK() OVER (PARTITION BY ot.id ORDER BY wel.created_on DESC) AS toprec 
          FROM 
              [jform].[dbo].[workflow_execution_log ] AS wel 
          LEFT JOIN 
              [jform].[dbo].[application_details] AS ot ON wel.obj_id = ot.id
          JOIN 
              [jform].[dbo].[mst_status] AS status_table ON ot.status_id = status_table.id
          WHERE 
              wel.created_on >= @startDate AND wel.created_on <= @endDate
          GROUP BY 
              ot.id, ot.created_on, wel.created_on, status_table.status_name, wel.obj_id
      ) AS SubQuery 
      WHERE toprec = 1;`;
      let queryTest1=`
      DECLARE @startDate datetimeoffset = '${startDate}';
      DECLARE @endDate datetimeoffset = '${endDate}';
      select 
      MIN(ISNULL(duration_in_days,0)) AS min_duration,
      MAX(ISNULL(duration_in_days,0)) AS max_duration,
      AVG(ISNULL(duration_in_days,0)) AS mean,
      SUM(CASE WHEN duration_in_days > 180 THEN 1 ELSE 0 END) AS count_gr_180
      from
      (
       SELECT 
          ot.id, status_table.status_name,DENSE_RANK() OVER (PARTITION BY ot.id ORDER BY wel.created_on DESC) AS toprec ,DATEDIFF(DAY,lt.created_on,st.created_on) duration_in_days
      FROM 
          [jform].[dbo].[workflow_execution_log ] AS wel 
      inner JOIN 
          [jform].[dbo].[application_details] AS ot ON wel.obj_id = ot.id
          left join (select obj_id,created_on, DENSE_RANK() OVER (PARTITION BY obj_id ORDER BY created_on DESC) AS fst from [jform].[dbo].[workflow_execution_log ]) st on st.obj_id=wel.obj_id and fst=1
          left join (select obj_id,created_on, DENSE_RANK() OVER (PARTITION BY obj_id ORDER BY created_on ASC) AS lst from [jform].[dbo].[workflow_execution_log ]) lt on lt.obj_id=wel.obj_id and lst=1
      JOIN 
          [jform].[dbo].[mst_status] AS status_table ON ot.status_id = status_table.id
          WHERE 
          wel.created_on >= @startDate AND wel.created_on <= @endDate
  
  ) tbl where toprec=1
  `;

//   let querybyDistrict=`
//     DECLARE @startDate datetimeoffset = '${startDate}';
//     DECLARE @endDate datetimeoffset = '${endDate}';
//     DECLARE @district varchar(10) = '${district}';

// SELECT
//     COUNT(CASE WHEN  min_created_on BETWEEN @startDate AND @endDate THEN obj_id END) AS TotalApplication,
//     COUNT(CASE WHEN status_name = 'ACTIVE' THEN 1 END) AS Active,
//     COUNT(CASE WHEN status_name = 'INACTIVE' THEN 1 END) AS Inactive,
//     COUNT(CASE WHEN status_name = 'DRAFT' THEN 1 END) AS Draft,
//     COUNT(CASE WHEN status_name = 'PENDING' THEN 1 END) AS Pending,
//     COUNT(CASE WHEN status_name = 'COMPLETED' THEN 1 END) AS Completed,
//     COUNT(CASE WHEN status_name = 'REJECTED' THEN 1 END) AS Rejected,
//     district_name
// FROM (
//    SELECT 
//         ot.id,
//         ot.created_on,
//         district.district_name,
//         DATEDIFF(DAY, 
//             MIN(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END), 
//         MAX(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END)
//         ) AS duration_in_days,
//         status_table.status_name,
//         wel.obj_id as obj_id,
//         DENSE_RANK() OVER (PARTITION BY ot.id ORDER BY wel.created_on DESC) AS toprec,
//         MIN(ot.created_on) AS min_created_on
//     FROM 
//         [jform].[dbo].[workflow_execution_log] AS wel 
//     LEFT JOIN 
//         [jform].[dbo].[application_details] AS ot ON wel.obj_id = ot.id
//     JOIN 
//         [jform].[dbo].[mst_status] AS status_table ON ot.status_id = status_table.id
//     INNER JOIN 
//         [jform].[dbo].[industries_details] AS ind_detail ON ind_detail.application_id = ot.id
//     INNER JOIN 
//         [jform].[dbo].[mst_districts] AS district ON district.id = ind_detail.district_id
//     WHERE 
//         ind_detail.district_id = @district
//     GROUP BY 
//         ot.id, 
//         ot.created_on, 
//         status_table.status_name, 
//         ind_detail.application_id, 
//         district.district_name,
//         wel.obj_id,
//         wel.created_on
//     HAVING
//         MIN(ot.created_on) BETWEEN @startDate AND @endDate
// ) AS SubQuery 
// WHERE 
//     toprec = 1
// GROUP BY 
//     district_name;`;


let querybyDistrict = `
DECLARE @startDate datetimeoffset = '${startDate}';
DECLARE @endDate datetimeoffset = '${endDate}';
DECLARE @district varchar(10) = '${district}';

SELECT
COUNT(DISTINCT obj_id) AS TotalApplication,
COUNT(CASE WHEN status_name = 'ACTIVE' THEN 1 END) AS Active,
COUNT(CASE WHEN status_name = 'INACTIVE' THEN 1 END) AS Inactive,
COUNT(CASE WHEN status_name = 'DRAFT' THEN 1 END) AS Draft,
COUNT(CASE WHEN status_name = 'PENDING' THEN 1 END) AS Pending,
COUNT(CASE WHEN status_name = 'COMPLETED' THEN 1 END) AS Completed,
COUNT(CASE WHEN status_name = 'REJECTED' THEN 1 END) AS Rejected,
district_name
FROM (
SELECT 
    ot.id,
    ot.created_on,
    wel.created_on AS created_onwel,
    district.district_name,
    DATEDIFF(DAY, 
        MIN(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END), 
    MAX(CASE WHEN ot.status_id IN (5, 6) THEN wel.created_on END)
    ) AS duration_in_days,
    status_table.status_name,
    wel.obj_id as obj_id,
    DENSE_RANK() OVER (PARTITION BY ot.id ORDER BY wel.created_on DESC) AS toprec 
FROM 
    [jform].[dbo].[workflow_execution_log] AS wel 
LEFT JOIN 
    [jform].[dbo].[application_details] AS ot ON wel.obj_id = ot.id
JOIN 
    [jform].[dbo].[mst_status] AS status_table ON ot.status_id = status_table.id
INNER JOIN 
    [jform].[dbo].[industries_details] AS ind_detail ON ind_detail.application_id = ot.id
INNER JOIN 
    [jform].[dbo].[mst_districts] AS district ON district.id = ind_detail.district_id
WHERE 
    wel.created_on >= @startDate AND wel.created_on <= @endDate AND ind_detail.district_id = @district
GROUP BY 
    ot.id, ot.created_on, wel.created_on, status_table.status_name, wel.obj_id, district.district_name
) AS SubQuery 
WHERE 
toprec = 1
GROUP BY 
district_name;`;

    let querybyDistrict1=`
    DECLARE @startDate datetimeoffset = '${startDate}';
    DECLARE @endDate datetimeoffset = '${endDate}';
    DECLARE @district varchar(10) = '${district}';
    select 
    MIN(ISNULL(duration_in_days,0)) AS min_duration,
    MAX(ISNULL(duration_in_days,0)) AS max_duration,
    AVG(ISNULL(duration_in_days,0)) AS mean,
    SUM(CASE WHEN duration_in_days > 180 THEN 1 ELSE 0 END) AS count_gr_180,
    district_name
    from
    (
     SELECT 
        ot.id, status_table.status_name,district.district_name,DENSE_RANK() OVER (PARTITION BY ot.id ORDER BY wel.created_on DESC) AS toprec ,DATEDIFF(DAY,lt.created_on,st.created_on) duration_in_days
    FROM 
        [jform].[dbo].[workflow_execution_log ] AS wel 
    inner JOIN 
        [jform].[dbo].[application_details] AS ot ON wel.obj_id = ot.id
        left join (select obj_id,created_on, DENSE_RANK() OVER (PARTITION BY obj_id ORDER BY created_on DESC) AS fst from [jform].[dbo].[workflow_execution_log ]) st on st.obj_id=wel.obj_id and fst=1
        left join (select obj_id,created_on, DENSE_RANK() OVER (PARTITION BY obj_id ORDER BY created_on ASC) AS lst from [jform].[dbo].[workflow_execution_log ]) lt on lt.obj_id=wel.obj_id and lst=1
    JOIN 
        [jform].[dbo].[mst_status] AS status_table ON ot.status_id = status_table.id
    INNER JOIN 
        [jform].[dbo].[industries_details] AS ind_detail ON ind_detail.application_id = ot.id
    INNER JOIN 
        [jform].[dbo].[mst_districts] AS district ON district.id = ind_detail.district_id
    WHERE 
        lt.created_on >= @startDate AND st.created_on <= @endDate AND 
        ind_detail.district_id = @district
) tbl where toprec=1 
GROUP BY 
    district_name;
    `;
    let latestArrDur = `
    SELECT distinct 
         w.durationInDays
         FROM [jform].[dbo].[workflow_execution_log] AS l
         INNER JOIN [jform].[dbo].[application_details] AS d ON l.obj_id = d.id
         INNER JOIN [jform].[dbo].[mst_status] AS s ON s.id = d.status_id
         INNER JOIN (
         SELECT obj_id,
             DATEDIFF(DAY, MIN(created_on), MAX(created_on)) AS durationInDays
         FROM [jform].[dbo].[workflow_execution_log]
         GROUP BY obj_id
         ) AS w ON l.obj_id = w.obj_id where s.status_name IN ('COMPLETED' , 'REJECTED') order by durationInDays desc`;
    let durationbydate = `
    DECLARE @startDate datetimeoffset = '${startDate}';
        DECLARE @endDate datetimeoffset = '${endDate}';
        DECLARE @district varchar(10) = '${district}';
    SELECT DISTINCT 
    w.durationInDays,
    s.status_name,
    d.id,
    dist.district_name
FROM 
    [jform].[dbo].[workflow_execution_log] AS l
INNER JOIN 
    [jform].[dbo].[application_details] AS d ON l.obj_id = d.id
INNER JOIN 
    [jform].[dbo].[mst_status] AS s ON s.id = d.status_id
INNER JOIN 
    [jform].[dbo].[industries_details] AS ind ON ind.application_id = d.id
INNER JOIN 
    [jform].[dbo].[mst_districts] AS dist ON dist.id = ind.district_id
INNER JOIN (
    SELECT 
        obj_id,
        DATEDIFF(DAY, MIN(created_on), MAX(created_on)) AS durationInDays
    FROM 
        [jform].[dbo].[workflow_execution_log]
    GROUP BY 
        obj_id
    HAVING 
        MIN(created_on) BETWEEN @startDate AND @endDate
) AS w ON l.obj_id = w.obj_id
WHERE 
    s.status_name IN ('COMPLETED', 'REJECTED')
    AND l.created_on >= @startDate
    AND l.created_on <= @endDate
    AND dist.id = @district
ORDER BY 
    w.durationInDays DESC;`;
      var durationQuery;
      var arrDuration;
      console.log(startDate, endDate);
      if (
        startDate == "" ||
        endDate == "" ||
        startDate == undefined ||
        endDate == undefined ||
        startDate == null ||
        endDate == null
      ) {
        console.log("latest");
        durationQuery = await cpool.query(latestquery);
      } else {
        console.log("bydate");
        let testQuery = await cpool.query(querybyDistrict);
        let testQuery1 = await cpool.query(querybyDistrict1);
        var mergedResult = [{
          ...testQuery.recordset[0],
          ...testQuery1.recordset[0]
        }];
        
        console.log(mergedResult, 'mergedResult');
        console.log(testQuery, 'testquery');
        console.log(testQuery1, 'testquery1');
        // durationQuery = await cpool.query(querybyDate);
      }
  
      if (
        startDate == "" ||
        endDate == "" ||
        startDate == undefined ||
        endDate == undefined ||
        startDate == null ||
        endDate == null
      ) {
        console.log("latest");
        arrDuration = await cpool.query(latestArrDur);
      } else {
        console.log("bydate");
        arrDuration = await cpool.query(durationbydate);
      }
  
      // const arrDuration = await cpool.query(`
      // DECLARE @startDate datetimeoffset = '${startDate}';
      //     DECLARE @endDate datetimeoffset = '${endDate}';
      // SELECT distinct
      //      w.durationInDays
      //      FROM [jform].[dbo].[workflow_execution_log] AS l
      //      INNER JOIN [jform].[dbo].[application_details] AS d ON l.obj_id = d.id
      //      INNER JOIN [jform].[dbo].[mst_status] AS s ON s.id = d.status_id
      //      INNER JOIN (
      //      SELECT obj_id,
      //          DATEDIFF(DAY, MIN(created_on), MAX(created_on)) AS durationInDays
      //      FROM [jform].[dbo].[workflow_execution_log]
      //      GROUP BY obj_id
      //      ) AS w ON l.obj_id = w.obj_id where s.status_name ='COMPLETED'AND l.created_on >= @startDate
      //      AND l.created_on <= @endDate order by durationInDays desc`);
  
        // console.log(durationQuery.recordset,123456);
        if (
          startDate == "" ||
          endDate == "" ||
          startDate == undefined ||
          endDate == undefined ||
          startDate == null ||
          endDate == null
        ) {
          var dataDuration = durationQuery.recordset;
        }else{
  
          var dataDuration = mergedResult;
      }
      let dataValue = arrDuration.recordset;
      console.log(dataValue, "dataValue");
      const durationValues = dataValue.map((item) => item.durationInDays);
      // Check if the length of durationValues array is odd or even
      const isOddLength = durationValues.length % 2 !== 0;
  
      // Sort the array in ascending order
      const sortedValues = durationValues.sort((a, b) => a - b);
  
      // Calculate the median
      let median;
      if (isOddLength) {
        median = sortedValues[Math.floor(sortedValues.length / 2)];
      } else {
        const midIndex = sortedValues.length / 2;
        median = (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2;
      }
      median = median === isNaN ? 0 : median;
      // console.log(median, "median");
      let mergeValue = { ...dataDuration, median };
      dataDuration[0].median = median;
      console.log(dataDuration, "mergeValue");
      var modified = Object.keys(dataDuration[0]).map((e) => {
        if (isNaN(dataDuration[0][e])  || dataDuration[0][e] == null || dataDuration[0][e] == "" ) {
          dataDuration[0][e] = 0;
        }
        return dataDuration[e];
      });
      console.log(dataDuration, "dataDuration");
      // console.log(modified,'modified');
      return dataDuration;
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };

  const getDistrict = async()=>{
    let query = ` select [id],[district_name] FROM [jform].[dbo].[mst_districts]`;
    let districtList = await cpool.query(query);
    console.log(districtList.recordset,'districtlist');
    return districtList.recordset;
  }

//create feedback
const createFeedback = async(req) => {
    LOG.info('Inside common service create feedback');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Feedback Details ===> ", req.body);
        var DATA = req.body;

        let result = await feedback.findAll({
            where: {
                user_id: DATA[0].userId
            },
            raw: true
        });
        console.log(result, 'Count data');
        // console.log(result.length, 'data inserted');
        if (result.length != 0) {
            LOG.error("Feedback Already Given");
            data.status = 'DUPLICATE';
            data.message = 'Feedback Already Given';
            data.data = {};
        } else {
            for (var key in DATA) {
                await feedback.create({
                    id: isNaN(await feedback.max('id')) ? 1 : await feedback.max('id') + 1,
                    question_id: DATA[key].id,
                    questions: DATA[key].feedback__questions,
                    answer: DATA[key].answer,
                    user_id: DATA[key].userId
                }).then(success => {
                    LOG.info("SUCCESS ====> ", success.dataValues);
                }, rejection => {
                    LOG.info("REJECTION ====> ", rejection);
                    LOG.error("SQL error!!!");
                    data.status = 'FAILURE';
                    data.message = "Error Occured";
                });
            }
            data.message = 'Feedback created.';
            data.data = {};
        }

    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

const getFeedbackDetailsByName = async(req) => {
    LOG.info("INSIDE getFeedbackDetailsByName Service");
    let name = req.params.name;
    var query;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    try {
        console.log('VALUE===========>', name);
        if (req.params.name === 'null' ? false : req.params.name !== null) {
            // console.log('VALUE===========>',NAME_TO_FIND);
            query = `SELECT
            [question_id]
            ,[questions]
            ,[answer]
            ,[user_id]
            ,[display_name]
            FROM [jform].[dbo].[feedback] a, mst_users b where b.id = a.user_id and b.display_name LIKE N'%${name}%'`
        } else {
            query = `SELECT
            [question_id]
            ,[questions]
            ,[answer]
            ,[user_id]
            ,[display_name]
            FROM [jform].[dbo].[feedback] a, mst_users b where b.id = a.user_id`
        }
        console.log('VALUE===========>', query);
        const totalRecord = await cpool.query(query);
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
    return data;
}

const getPaymentDetailById = async(req) => {
    LOG.info('Inside CommonService getPaymentDetailById', req.params);
    let data = {
        message: '',
        data: {},
    };
    try {
        var DATA = req.params.appID;
        let getPaymentDetail = await payment_jform.findAll({
            order: [
                ['chalan_dt_process', "ASC"]
            ],
            attributes: ['app_id', 'trsid', 'trs_head_process', 'trs_head_secu', 'amount_process', 'amount_secu', 'status', 'bank_transaction_id', 'ref_no', 'dept_ref_id', 'bank_trs_dt', 'chalan_no_process', 'chalan_dt_process', 'chalan_no_secu', 'chalan_dt_secu'],
            where: {
                app_id: DATA
            },
            raw: true
        });
        LOG.info("FIND ALL feedback RESULT =====> ", getPaymentDetail);
        data.message = 'SUCCESS';
        data.data = getPaymentDetail;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//Getting the list of day to be added in the hoilday table

const holidayList = async() => {
    LOG.info('Inside common service getting days of holiday');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Getting days holiday name ===> ");

        let result = await Holidayname.findAll({
            order: [
                ['holiday_name', "ASC"]
            ],
        });
        data.message = 'Holiday name list Extracted Successfully.';
        data.data = result;

    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE in catch';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;

};

// Getting Holiday list
console.log(new Date().getFullYear());
const getHolidayList = async() => {
    LOG.info('Inside common service getting holiday list');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Getting holiday list Details ===> ");

        let result = await cpool.query(`select * from [mst_holidays] where YEAR(hol_date) = YEAR(GETDATE()) order by hol_date asc`);
        data.message = 'Holiday list Extracted Successfully.';
        data.data = result.recordset;

    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE in catch';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;

};

// updating the holiday table

const updateHolidayList = async(req) => {
    LOG.info('Inside common service updating holiday list');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Updatting holiday list Details ===> ");
        let DATA = req.body;
        let result = await Holidays.update({
            name: DATA.name,
            week_day: DATA.week_day
        }, {
            where: { id: DATA.id }
        }).then(function(result) {
            LOG.info(result);
            data.message = 'Holiday list updated Successfully.';
            data.data = result;
        });
        // data.message = 'Holiday list updated Successfully.';
        // data.data = result;

    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE in catch';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;

};

//Deleting holiday list from holidays table

const deleteHolidayList = async(req) => {
    LOG.info('Inside common service deleting holiday list');
    let data = {
        status: '',
        message: '',
        data: {}
    };
    try {
        LOG.info("Deleting holiday list Details ===> ");
        let DATA = req.body;
        let result = await Holidays.findOne({
            where: { id: DATA.id }
        });
        if (result) {
            await Holidays.destroy({
                where: { id: DATA.id }
            }).then(function(result) {
                LOG.info(result);
                data.status = "SUCCESS"
                data.message = 'Holiday list deleted Successfully.';
                data.data = result;
            });
        } else {
            data.status = "Failed"
            data.message = 'No data Found';
            // data.data = result;
        }

    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE in catch';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;

};

// Adding holiday list

const createHolidayList = async(req) => {
    LOG.info('Inside common service Adding holiday list');
    let data = {
        status: '',
        message: '',
    };
    let countData;
    try {
        LOG.info("Adding holiday list Details ===> ", req.body);
        var DATA = req.body;
        if (DATA) {
            await Holidays.findAndCountAll({
                where: {
                    hol_date: DATA.hol_date + ' 00:00:00.0000000 +00:00'
                }
            }).then((result => {
                countData = result.count;
                LOG.info('result checking', result);
            }));

            if (countData != 0) {
                data.status = 'Failed'
                data.message = 'Duplicate Value Already Exist';
            } else {
                Holidays.create({
                    id: isNaN(await Holidays.max('id')) ? 1 : await Holidays.max('id') + 1,
                    status_id: 1,
                    name: DATA.name,
                    hol_date: DATA.hol_date,
                    saka_era: DATA.week_day,
                    week_day: DATA.week_day,
                    no_of_days: 1,
                    created_by: 1,
                    created_on: new Date(),
                    updated_by: 1,
                    updated_on: new Date(),

                }).then(success => {
                    // LOG.info("SUCCESS ====> ", success.dataValues);
                    console.log("SUCCESS ====> ", success);

                }, rejection => {
                    LOG.info("REJECTION ====> ", rejection);
                    LOG.error("SQL error!!!");
                    data.status = 'FAILURE';
                    data.message = "Error Occured";
                });
                data.status = 'SUCCESS';
                data.message = 'Holiday list Added.';

            }
        } else {
            data.message = 'Data Is Not Valid';
        }
    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE in catch';
        data.message = err.message;
    }

    LOG.debug(data);
    return data;
};

// adding new holiday name in the Holiday name table

const createHolidayName = async(req) => {
    LOG.info('Inside common service Adding holiday list');
    let data = {
        status: '',
        message: '',
    };
    let countData;
    try {
        LOG.info("Adding holiday Name list Details ===> ", req.body);
        var DATA = req.body;
        if (DATA) {
            await Holidayname.findAndCountAll({
                where: {
                    holiday_name: DATA.holiday_name
                }
            }).then((result => {
                countData = result.count;
                LOG.info('result checking', result);
            }));

            if (countData != 0) {
                data.status = 'Failed'
                data.message = 'Duplicate Value Already Exist';
            } else {
                Holidayname.create({
                    id: isNaN(await Holidayname.max('id')) ? 1 : await Holidayname.max('id') + 1,
                    holiday_name: DATA.holiday_name,

                }).then(success => {
                    // LOG.info("SUCCESS ====> ", success.dataValues);
                    LOG.info("SUCCESS ====> ", success);

                }, rejection => {
                    LOG.info("REJECTION ====> ", rejection);
                    LOG.error("SQL error!!!");
                    data.status = 'FAILURE';
                    data.message = "Error Occured";
                });

                data.status = 'SUCCESS';
                data.message = 'Holiday Name Added.';

            }
        } else {
            data.message = 'Data Is Not Valid';
        }
    } catch (err) {
        console.log(err);
        LOG.error("SQL error!!!");
        data.status = 'FAILURE in catch';
        data.message = err.message;
    }

    LOG.debug(data);
    return data;
};

async function EncryptString(data, key) {
    return new Promise(async resolve => {
      // console.log(key.length, key);
      if (!data || data.length <= 0)
        throw new Error("plainText cannot be null or empty");
  
      if (!key || key.length <= 0)
        throw new Error("Key cannot be null or empty");
      var iv = "";
      var clearEncoding = 'utf8';
      var cipherEncoding = 'base64';
      var cipherChunks = [];
      var cipher = crypto.createCipheriv('aes-256-ecb', key, iv);
      cipher.setAutoPadding(true);
      cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
      cipherChunks.push(cipher.final(cipherEncoding));
      // return cipherChunks.join('');
      resolve(cipherChunks.join(''));
    });
  }
  
  async function decryption(encryptedData, key) {
    return new Promise(async resolve => {
      if (!encryptedData || encryptedData.length <= 0)
        throw new Error("plainText cannot be null or empty");
  
      if (!encryptedData || encryptedData.length <= 0)
        throw new Error("Key cannot be null or empty");
      var iv = "";
      var clearEncoding = 'utf8';
      var cipherEncoding = 'base64';
      const decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
      let decryptedData = decipher.update(encryptedData, cipherEncoding, clearEncoding);
      decryptedData += decipher.final(clearEncoding);
      resolve(decryptedData);
    });
  }

const querystring = require('querystring');



const  testTreasuryData = async(data) => {
    return new Promise(async resolve => {
        LOG.info("Inside sendTreasuryData", data);
        // const Base64Key = "of9dA5slkSpXoCRnvS2D5agAomMksSpXRhWar2T2bLg=";
        //const binaryKey = "¡ÿ]›%‘*W $g½-ƒå¨ ¢c$±*WFš¯döl¸";
	const binaryKey = fs.readFileSync("WAR_binary_test.key");
        // const EncryptionKey = "÷ÚâÊÖÞ?¥6â™â×j›«eH¦iI-È&‘é–±";
        //let totalAmount = parseInt(data.Amount_Proces) + parseInt(data.Amount_Secu);
        // let query = `select TrsID from [jform].[dbo].[TreasuryTransaction] where appId = ${data.applicationid}`;
        // // console.log(query,"6dausnxampoja");
        // let result = await cpool.query(query);
        // console.log(result.recordset[0], "68984357570980980");
        //let dept_ref_id = "WAR" + "-" + result.recordset[0].TrsID;
        //console.log(totalAmount, dept_ref_id, "total amount");
        let transactiondetail;
        let farmnm = "RWSS";
        let address = "NIC, Sachivalaya Marg"
        // if (data.Amount_Secu !== 0) {
            //     transactiondetail = `${data.Trs_Head_Proces}|Processing Fee|${data.Amount_Proces}|${data.Trs_Head_Secu}|Security Money|${data.Amount_Secu}|||||||||||||${totalAmount}`;
            // }
            // else {
                //     transactiondetail = `${data.Trs_Head_Proces}|Processing Fee|${data.Amount_Proces}|${data.Trs_Head_Secu}|||||||||||||||${totalAmount}`;
        // }
        console.log(data, "transactiondetail");
        // transactiondetail = req.body;
        
        // const redirect_url = "http://localhost:4200/pages/citizen/proposal/p4";
        // const redirect_url = "http://industrialwaterod.nic.in/Est_Pay/GetPaymentDet";
        const redirect_url = "https://waterallocationod.nic.in/index.html#/login";
        // const url = "https://www.odishatreasury.gov.in/echallan/dept-intg";
        
        const postURL = "https://uat.odishatreasury.gov.in/echallan/dept-intg";
        
        // const pipe = `WAR|${dept_ref_id}|${transactiondetail}|${farmnm}|${address}||Odisha|${data.District}|${data.Pin}|${data.Contact}
        //                 |${data.EmailID}|||${result.recordset[0].TrsID}||||${redirect_url}`;
        const pipe = data.data;
        console.log(pipe, "testing pipe");
        const checksum = await checkSum(pipe, binaryKey);
        console.log(checksum, "checksum");
        const finalpipe = `${pipe}|${checksum}`;
        console.log(finalpipe, "final pipe");
        // const msg = "lQTIL40z/U/ZbQajeGsZeKCWAmQXJJkxRGdBWQd9cNX+Sh5n8FQ/dTHeJXrZrcsaJJVQUfbOq4Slxn4bxRn++Lw+bwxKVORbnXw/+j1tHE155YiYq+S3jpqIORn//jzKCKgJxVPGs3GI5VPFxMV7xIyn6K9PG4uWn97TH6XTE3RU7vCuOxNUcmU/xkW8/xNRUekYmpsmHW7tUIJ206ZIsSS3SPcakverHAgJSs7uStcDnp6NxJFOwZ4Mz/KGMq7CEyvGN5y22rBUztRVUDiXkoamxRXQlewOwS1JST8Q6BDFnZGh/KxrnQrUl/Ii5Fv2RDziBt+ZAdM7SsN7LXRkhDjdI3M0lJwJAqON0xKcGtHfqXjmOP5Z8+L857pGKLAxA2CmHmu4w/kyt5BvNj9iyCVRM2pvZINISsWwf4SbXI/dIKMaB3DAXNOJ+BnPg45I"
        const msg = await EncryptString(finalpipe, binaryKey);
        console.log(msg, "message");

        // const treasuryData = querystring.stringify({
            //     deptcode: "WAR",
            //     msg: msg
            // });
            
            // const postOptions = {
                //     method: 'POST',
        //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         'Content-Length': Buffer.byteLength(treasuryData),
        //     },
        //     // Allow self-signed certificates (for development only)
        //     rejectUnauthorized: false,
        // };
        
        // const req = https.request(postURL, postOptions, (res) => {
        //     let data = '';
        
        //     res.on('data', (chunk) => {
            //         data += chunk;
        //     });

        //     res.on('end', () => {
            //         console.log("POST request successful:", data);
        //         resolve();
        //     });
        // });

        // req.on('error', (error) => {
            //     console.error("Error making POST request:", error.message);
            //     resolve(error);
            // });

        // req.write(treasuryData);
        // req.end();

        const treasuryData = {
            deptcode: "WAR",
            msg: msg
        };
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Content-Length': Buffer.byteLength(treasuryData),
            },
            // Allow self-signed certificates (for development only)
            rejectUnauthorized: false,
        };
        // Constructing the HTML form
        //   let formInputs = '';
        //   for (let key in Inputs) {
        //     formInputs += `<input name="${key}" type="hidden" value="${Inputs[key]}">`;
        //   }
        
        //   const htmlForm = `<html><head></head><body onload="document.form1.submit()"><form name="form1" method="POST" action="${postURL}">${formInputs}</form></body></html>`;
  
        // //   const agent = new https.Agent({
        // //     rejectUnauthorized: false
        // //   });
        //   // Making the request
        //   request.post({
        //     url: postURL, // URL to submit the form
        //     body: htmlForm,// HTML form data
        //     // httpsAgent: agent
        //     rejectUnauthorized: false
        //   }, (error, response, body) => {
            //     if (error) {
                //       console.error(error, "error");
        //     } else {
            //       console.log(body, 'Response Body:');
            //       // console.log(response,"Response :");
        //     }
        //   });
        resolve(treasuryData);
    });
}

//create for adding bank response in the database jForm

const sendTreasuryData = async (data) => {
    return new Promise(async (resolve) => {
      LOG.info("Inside sendTreasuryData", data);
      const binaryKey = fs.readFileSync("WAR_binary_test.key");
      console.log(binaryKey.length,'binary key');
      let totalAmount = parseInt(data.Amount_Proces) + parseInt(data.Amount_Secu);
      let query = `select TrsID from [jform].[dbo].[TreasuryTransaction] where appId = ${data.applicationid} ORDER BY TrsID  DESC`;
      console.log(query,"6dausnxampoja");
      let result = await cpool.query(query);
      console.log(result.recordset[0], "68984357570980980");
      let dept_ref_id = "WAR" + "-" + result.recordset[0].TrsID;
      console.log(totalAmount, dept_ref_id, "total amount");
      let transactiondetail;
      let farmnm = data.IndustryName;
      let address = data.Address;
      if (data.Amount_Secu !== 0) {
          transactiondetail = `${data.Trs_Head_Proces}|Processing Fee|${data.Amount_Proces}|${data.Trs_Head_Secu}|Security Money|${data.Amount_Secu}|||||||||||||${totalAmount}`;
      }
      else {
          transactiondetail = `${data.Trs_Head_Proces}|Processing Fee|${data.Amount_Proces}||||||||||||||||${totalAmount}`;
      }
      console.log(data, "transactiondetail");
  
    //   const redirect_url = "https://waterallocationod.nic.in/dowr/api/treasuryRecieve";
      const redirect_url = "http://localhost:3001/dowr/api/treasuryRecieve";
  
    //   const postURL = "https://uat.odishatreasury.gov.in/echallan/dept-intg";
  
      const pipe = `WAR|${dept_ref_id}|${transactiondetail}|${farmnm}|${address}||Odisha|${data.District}|${data.Pin}|${data.Contact}|${data.EmailID}|||${result.recordset[0].TrsID}||||${redirect_url}`;
      console.log(data, 868);
      console.log(pipe,'pipe');
      console.log(pipe, "testing pipe");
      const checksum = crypto.createHmac('sha256', binaryKey).update(pipe).digest('base64');
      console.log(checksum, "checksum");
      const finalpipe = `${pipe}|${checksum}`;
      console.log(finalpipe, "final pipe");
      const msg = await EncryptString(finalpipe, binaryKey);
      console.log(msg, "message");
  
      var treasuryData = {
        deptCode: "WAR",
        msg: msg,
      };
  
      resolve(treasuryData);
    });
  };


  //create new TRSID
  const getNewTrsID = async (previousTrsID) => {
  // Get the current year and month in "YYYYMM" format
  previousTrsID = previousTrsID.toString();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');

  // Extract the previous year, month, and last 4 digits from the previous TrsID
  const previousYear = previousTrsID.slice(0, 4);
  const previousMonth = previousTrsID.slice(4, 6);
  let lastFourDigits = parseInt(previousTrsID.slice(-4), 10);

  // Check if the year has changed
  if (currentYear === previousYear) {
    // Increment last 4 digits if within the same year
    lastFourDigits += 1;
  } else {
    // Reset last 4 digits to 1 if the year has changed
    lastFourDigits = 1;
  }

  // Format last four digits as a four-digit string (e.g., "0001")
  const newLastFourDigits = String(lastFourDigits).padStart(4, '0');

  // Combine year, month, and the new last four digits
  return `${currentYear}${currentMonth}${newLastFourDigits}`;
}

  const setBankPaymentDetails = async (req) => {
    LOG.info("Inside common service create Bank payment Response");
    let data = {
      status: "SUCCESS",
      message: "",
      data: {},
    };
    try {
      LOG.info("Bank Payment Response Details ===> ", req.body);
      var DATA = req.body;
      let query = `select TrsID from [jform].[dbo].[TreasuryTransaction] ORDER BY TrsID desc`;
    let result1 = await cpool.query(query);
    console.log(result1.recordset[0].TrsID, "result1------------------------>");
    let TransactionID = result1.recordset[0].TrsID;
    const trsid_new = await getNewTrsID(TransactionID);
    const newTrsID  = parseInt(trsid_new);
    console.log(newTrsID, typeof(newTrsID) ,'newTrsID---------------------->');
    let TrsID = newTrsID;
    //console.log(TrsID, '545646465465');
      let currentDate = new Date();
      let formattedDate = `${currentDate.getFullYear()}-${(
        currentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDate
        .getDate()
        .toString()
        .padStart(2, "0")} ${currentDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}.${currentDate
        .getMilliseconds()
        .toString()
        .padStart(3, "0")}`;
      console.log(formattedDate, "formatted Date");
        if (DATA.Amount_Proces < 0 || DATA.Amount_Proces > 1001) {
      throw new Error("Amount_Proces cannot be negative. or  more than 1000");
    }
        let newData = {
          TrsID: TrsID,
          Industry_Code: null,
          Trs_Head_Proces: DATA.Trs_Head_Proces,
          Trs_Head_Secu: DATA.Trs_Head_Secu,
          Amount_Proces: DATA.Amount_Proces,
          Amount_Secu: DATA.Amount_Secu,
          GWS: null,
          GW: null,
          IW: null,
          Status: "O",
          EE_Code: null,
          IP_Address: null,
          Created_DT: formattedDate,
          PaymentTowards: DATA.PaymentTowards,
          Purpose_cd: null,
          deptRefId: null,
          appId: DATA.applicationid,
          jtoken: DATA.jtoken,
        };
        console.log(newData, 'newData ======================================>')
        let result = await TreasuryTransaction.create(newData);
        console.log( result.toJSON(),"Data inserted:============================>");
        data.message = " DATA INSERTED SUCCESSFULLY.";
    } catch (err) {
      console.log(err);
      LOG.error("SQL error!!!");
      data.status = "FAILURE";
      data.message = err.message;
    }
    LOG.debug(data);
    return data;
  };

  //get transaction detail
 const GettransactionDetails = async (req) =>{
    let trsid = req.params.data;
    console.log(req.params,"paramssssssss");
  
    let query = `SELECT tr.[TrsID]
    ,tr.[Industry_Code]
    ,[BankTransactionId]
    ,[Ref_No]
    ,tr.[Status] as 'status'
    ,[Dt_Time]
    ,tr.[IP_Address]
    ,[InsertDT]
    ,tr.[deptRefId]
    ,[PayMode]
    ,[BankName]
    ,tt.[Amount_Proces] as 'Amount'
    ,[BnkTranMsg]
    ,[UpdateDT], tt.appId FROM [jform].[dbo].[TransactionReceive] as tr join  [jform].[dbo].[TreasuryTransaction] as tt on tr.TrsID = tt.TrsID where tt.[TrsID] = ${trsid}`
    let result = await cpool.query(query);
    console.log("resultioi",result);
    return (result.recordset);
   }
  
// --------------------------------------previous code -----------------------------------------------
//   const GetSCrollData = async (req) => {
//     return new Promise(async (resolve, reject) => {
//       let ip = req.ip;
//       let responseValue = req.body || req;
//       let Updatedate = new Date().toISOString();
//       try {
//           if (
//           responseValue.deptCode != "WAR" &&
//           responseValue.scrollData.length == 0 
//         ) {
//           resolve("Invalid deptCode or Scroll Data!!!");
//         } else {
//           for (const item of responseValue.scrollData) {
//             console.log(item, "Items");
//             if (item.challanDtls.length > 0 && item.bankTransStatus == "S") {
//               if (item.challanDtls[0].hoa == "0700-80-800-0097-02240-000") {
//                 // console.log(item.departmentRefId, item.departmentRefId.split('-')[1], "departmentRefId");
//                 let dataobj = {
//                   trs_id: parseInt(item.departmentRefId.split("-")[1]),
//                   challan_reference_no: String(item.challanRefId),
//                   bank_transaction_id: String(item.bankTransId),
//                   bank_transaction_ts: String(item.bankTransTime),
//                   bankTransStatus: item.bankTransStatus,
//                   deptrefid: item.departmentRefId,
//                   ip_adrress: ip ? ip.toString() : "Unknown IP",
//                 };
//                 function escapeForSQL(value) {
//                   if (value === null) {
//                     return "NULL";
//                   }
//                   if (typeof value === "string") {
//                     return `'${value.replace(/'/g, "''")}'`;
//                   }
//                   return value;
//                 }
//                 console.log(dataobj, "dataobjjjjjj");
//                 let part1data;
  
//                 let query = `select TrsID FROM [jform].[dbo].[TransactionReceive] where TrsID = ${dataobj.trs_id}`;
//                 console.log(query);
//                 let result = await cpool.query(query);
//                 console.log(result.recordset.length, "8667ghjvb");
//                 if (result.recordset.length === 0) {
//                   let query1 = `INSERT INTO [jform].[dbo].[TransactionReceive](
//                   TrsID, BankTransactionId, Ref_No, Status, Dt_Time, IP_Address, InsertDT)
//                       VALUES (${dataobj.trs_id}, ${escapeForSQL(dataobj.bank_transaction_id)}, ${escapeForSQL(dataobj.challan_reference_no)},
//                          ${escapeForSQL(dataobj.bankTransStatus)}, ${escapeForSQL(dataobj.bank_transaction_ts)}, ${escapeForSQL(dataobj.ip_adrress)}, ${escapeForSQL(Updatedate)})`;
  
//                   console.log(query1, "query11");
//                   let result1 = await cpool.query(query1);
  
//                   console.log(result1.command, "result1");
//                 } else {
//                   let query1 = `UPDATE [jform].[dbo].[TransactionReceive]
//                   SET BankTransactionId = ${escapeForSQL(
//                     dataobj.bank_transaction_id
//                   )}, Ref_No = ${escapeForSQL(dataobj.challan_reference_no)}, 
//                   Status = ${escapeForSQL(
//                     dataobj.bankTransStatus
//                   )}, Dt_Time =${escapeForSQL(
//                     dataobj.bank_transaction_ts
//                   )}, IP_Address =${escapeForSQL(
//                     dataobj.ip_adrress
//                   )}, UpdateDT = ${escapeForSQL(Updatedate)}
//                   WHERE TrsID = ${dataobj.trs_id}`;
  
//                   console.log(query1, "uquery1");
//                   let result1 = await cpool.query(query1);
//                   console.log(query1, result1.command, "result1");
//                 }
//                 for (const D of item.challanDtls) {
//                   dataobj.challan_number = D.challanNo;
//                   dataobj.challan_date = D.challanDt;
//                   dataobj.challan_amt = D.challanAmt;
//                 }
//                 // if (part1data == true) {
//                 let query1 = ` select TRSID from [jform].[dbo].[TransactionRec_RBIChallan] where TRSID = ${dataobj.trs_id}`;
//                 // console.log(query);
//                 let result1 = await cpool.query(query1);
//                 console.log(result1.recordset, 9878908);
//                 if (result1.recordset.length == 0) {
//                   let query2 = `INSERT INTO [jform].[dbo].[TransactionRec_RBIChallan] (TRSID, challan_no_Proces, date_Proces)
//                   VALUES (${escapeForSQL(dataobj.trs_id)}, ${escapeForSQL(
//                     dataobj.challan_number
//                   )}, ${escapeForSQL(dataobj.challan_date)})`;
  
//                   let result2 = await cpool.query(query2);
//                   console.log(result2.command, 4765868);
//                 }
//                 let query3 = ` select TRSID from [jform].[dbo].[ChallanEntry] where TRSID = ${dataobj.trs_id}`;
  
//                 // console.log(query);
//                 let result3 = await cpool.query(query3);
//                 console.log(result3.recordset, 3655778785);
//                 if (result3.recordset.length === 0) {
//                   let query1 = `Select PaymentTowards from [jform].[dbo].[TreasuryTransaction] where TRSID = ${dataobj.trs_id}`;
  
//                   // console.log(query);
//                   let result1 = await cpool.query(query1);
//                   let data = result1.recordset[0];
//                   console.log(result1.recordset, 323435285);
//                   if (result1.recordset.length === 0) {
//                     let query1 = `INSERT INTO [jform].[dbo].[ChallanEntry]( Challan_No_Proces, Challan_Dt_Proces, Challan_Amt_Proces,Tot_Challan_Amt, IP_Address, TRSID)
//                         VALUES(${escapeForSQL(
//                       dataobj.challan_number
//                     )}, ${escapeForSQL(dataobj.challan_date)},${escapeForSQL(
//                       dataobj.challan_amt
//                     )},${escapeForSQL(dataobj.challan_amt)},${escapeForSQL(
//                       dataobj.ip_adrress
//                     )},${escapeForSQL(dataobj.trs_id)})`;
  
//                     console.log(query1, "challanentry");
//                     let result1 = await cpool.query(query1);
//                     // console.log(result1, 365509080778785);
//                     if (result1.rowsAffected[0] == 1) {
//                       resolve("Challan Entry Successfully");
//                     }
//                   }
//                   resolve("Challan Number already Exist");
//                 }
//                 resolve("Challan Entry UnSuccessfully");
//               } else{
//                 console.log("data not availabe");
//               }
//             }
//             else {
//               resolve("Server side error");
//             }
//           }
//         }
//       } catch (error) {
//         console.log(error, "Error");
//         reject("Server side error");
//       }
//     //   try {
  
//     //     // console.log(responseValue,"response value 1");
//     //     // let responseValue = {"deptCode":"WAR","scrollData":[{"departmentRefId":"WAR-63463","challanRefId":"37ED7D454E","totalAmt":"2867.00","bankTransId":"IK0CQCIOQ5","bankTransStatus":"S","bankTransTime":"2024-02-07 08:05:00","challanDtls":[{"hoa":"0700-04-103-0128-02063-000","challanNo":"070038","challanDt":"2024-02-08","challanAmt":"2867.00"}],"agencyDtls":[]},{"departmentRefId":"WAR-63465","challanRefId":"37ED7D466C","totalAmt":"2867.00","bankTransId":"IK0CQCJDF2","bankTransStatus":"S","bankTransTime":"2024-02-07 08:16:42","challanDtls":[{"hoa":"0700-04-103-0128-02063-000","challanNo":"070040","challanDt":"2024-02-08","challanAmt":"2867.00"}],"agencyDtls":[]},{"departmentRefId":"WAR-63461","challanRefId":"37ED7D4ACF","totalAmt":"325947.00","bankTransId":"2402OD227737173","bankTransStatus":"S","bankTransTime":"2024-02-07 06:12:25","challanDtls":[{"hoa":"0701-80-800-0097-02063-000","challanNo":"070189","challanDt":"2024-02-08","challanAmt":"325947.00"}],"agencyDtls":[]},{"departmentRefId":"WAR-63462","challanRefId":"37ED7D5183","totalAmt":"5699.00","bankTransId":"2402OD227789616","bankTransStatus":"S","bankTransTime":"2024-02-07 06:56:15","challanDtls":[{"hoa":"0700-04-103-0128-02063-000","challanNo":"070037","challanDt":"2024-02-08","challanAmt":"5699.00"}],"agencyDtls":[]},{"departmentRefId":"WAR-63464","challanRefId":"37ED7D5B5F","totalAmt":"2867.00","bankTransId":"IK0CQCIVT7","bankTransStatus":"S","bankTransTime":"2024-02-07 08:10:53","challanDtls":[{"hoa":"0700-04-103-0128-02063-000","challanNo":"070039","challanDt":"2024-02-08","challanAmt":"2867.00"}],"agencyDtls":[]}]};
//     //     if (responseValue.deptCode != 'WAR' && responseValue.scrollData.length == 0) {
//     //       resolve("Invalid deptCode or Scroll Data!!!")
//     //     }
//     //     else {
//     //       for (const item of responseValue.scrollData) {
//     //         console.log(item, "Items");
//     //         if (item.challanDtls.length > 0 && item.bankTransStatus == 'S') {
//     //           // console.log(item.departmentRefId, item.departmentRefId.split('-')[1], "departmentRefId");
//     //           let dataobj = {
//     //             trs_id: parseInt(item.departmentRefId.split('-')[1]),
//     //             challan_reference_no: String(item.challanRefId),
//     //             bank_transaction_id: String(item.bankTransId),
//     //             bank_transaction_ts: String(item.bankTransTime),
//     //             bankTransStatus: item.bankTransStatus,
//     //             deptrefid: item.departmentRefId,
//     //             ip_adrress: ip.toString()
//     //           }
//     //           function escapeForSQL(value) {
//     //             if (value === null) {
//     //                 return 'NULL';
//     //             }
//     //             if (typeof value === 'string') {
//     //                 return `'${value.replace(/'/g, "''")}'`;
//     //             }
//     //             return value;
//     //         }
//     //           console.log(dataobj, "dataobj");
//     //           let part1data;
  
//     //           let query = `select TrsID FROM [jform].[dbo].[TransactionReceive] where TrsID = ${dataobj.trs_id}`;
//     //           console.log(query);
//     //           let result = await cpool.query(query);
//     //           console.log(result.recordset.length,"8667ghjvb");
//     //           if (result.recordset.length === 0) {
//     //             let query1 = `INSERT INTO [jform].[dbo].[TransactionReceive](
//     //               TrsID, BankTransactionId, Ref_No, Status, Dt_Time, IP_Address, InsertDT)
//     //                   VALUES (${dataobj.trs_id}, ${dataobj.bank_transaction_id}, ${dataobj.challan_reference_no},
//     //                      ${dataobj.bankTransStatus}, ${dataobj.bank_transaction_ts}, ${dataobj.ip_adrress}, ${Updatedate})`;
                         
//     //             console.log(query1,"query1");
//     //             let result1 = await cpool.query(query1);
//     //             // console.log(query1, result1.command, "result1");
//     //             // if (result1.command === 'INSERT') {
//     //             //   part1data = true;
//     //             // }
//     //             // else {
//     //             //   part1data = false;
//     //             // }
  
//     //             console.log(result1.command,"result1");
  
//     //           }
//     //           else {
//     //             let query1 = `UPDATE [jform].[dbo].[TransactionReceive]
//     //               SET BankTransactionId = ${escapeForSQL(dataobj.bank_transaction_id)}, Ref_No = ${escapeForSQL(dataobj.challan_reference_no)}, 
//     //               Status = ${escapeForSQL(dataobj.bankTransStatus)}, Dt_Time =${escapeForSQL(dataobj.bank_transaction_ts)}, IP_Address =${escapeForSQL(dataobj.ip_adrress)}, UpdateDT = ${escapeForSQL(Updatedate)}
//     //               WHERE TrsID = ${dataobj.trs_id}`;
  
//     //               console.log(query1,"uquery1");
//     //             let result1 = await cpool.query(query1);
//     //             console.log(query1, result1.command, "result1");
//     //             // if (result1.command == 'UPDATE') {
//     //             //   part1data = true;
//     //             // } else {
//     //             //   part1data = false;
//     //             // }
//     //           }
//     //           for (const D of item.challanDtls) {
//     //             dataobj.challan_number = D.challanNo;
//     //             dataobj.challan_date = D.challanDt;
//     //             dataobj.challan_amt = D.challanAmt;
//     //           }
//     //           // if (part1data == true) {
//     //           let query1 = ` select TRSID from [jform].[dbo].[TransactionRec_RBIChallan] where TRSID = ${dataobj.trs_id}`;
//     //           // console.log(query);
//     //           let result1 = await cpool.query(query1);
//     //           console.log(result1.recordset, 9878908);
//     //           if (result1.recordset.length == 0) {
  
//     //             let query2 = `INSERT INTO [jform].[dbo].[TransactionRec_RBIChallan] (TRSID, challan_no_Proces, date_Proces)
//     //               VALUES (${escapeForSQL(dataobj.trs_id)}, ${escapeForSQL(dataobj.challan_number)}, ${escapeForSQL(dataobj.challan_date)})`;
  
//     //             let result2 = await cpool.query(query2);
//     //             console.log(result2.command, 4765868);
//     //           }
//     //           let query3 = ` select TRSID from [jform].[dbo].[ChallanEntry] where TRSID = ${dataobj.trs_id}`;
               
//     //           // console.log(query);
//     //           let result3 = await cpool.query(query3);
//     //           console.log(result3.recordset, 3655778785);
//     //           if (result3.recordset.length === 0) {
//     //             let query1 = `Select PaymentTowards from [jform].[dbo].[TreasuryTransaction] where TRSID = ${dataobj.trs_id}`;
                  
//     //             // console.log(query);
//     //             let result1 = await cpool.query(query1);
//     //             let data = result1.recordset[0];
//     //             console.log(result1.recordset, 323435285);
//     //             if (result1.recordset.length === 0) {
//     //               let query1 = `INSERT INTO [jform].[dbo].[ChallanEntry]( Challan_No_Proces, Challan_Dt_Proces, Challan_Amt_Proces,Tot_Challan_Amt, IP_Address, TRSID)
//     //                     VALUES(${escapeForSQL(dataobj.challan_number)}, ${escapeForSQL(dataobj.challan_date)},${escapeForSQL(dataobj.challan_amt)},${escapeForSQL(dataobj.challan_amt)},${escapeForSQL(dataobj.ip_adrress)},${escapeForSQL(dataobj.trs_id)})`;
                        
//     //               console.log(query1, "challanentry");
//     //               let result1 = await cpool.query(query1);
//     //               // console.log(result1, 365509080778785);
//     //               if (result1.rowsAffected[0] == 1) {
//     //                 resolve("Challan Entry Successfully");
//     //               }
//     //             }
//     //             resolve("Challan Number already Exist");
//     //           }
//     //           resolve("Challan Entry UnSuccessfully");
//     //           // }
//     //         } else {
//     //           resolve("Server side error");
//     //         }
  
//     //       }
//     //     }
  
//     //   } catch (error) {
//     //     console.log(error, "Error");
//     //     reject("Server side error");
//     //   }
  
//     });
//   }
// --------------------------------------previous code end -----------------------------------------------
  //transaction recieve



  const treasuryRecieve = async (req) => {
    var data = req.body;
  console.log("uytreajhxugkgj",data); 
  const encryptkey = fs.readFileSync("WAR_binary_test.key");
//   const encryptkey = fs.readFileSync("WAR_binary_prod.key");
    if (data.msg != undefined && data.deptCode != undefined) {
      var decryptstr = await decryption(data.msg, encryptkey);
      console.log(decryptstr, "decryptstr");
      var checksum = decryptstr.substring(0, decryptstr.lastIndexOf("|"));
      console.log(checksum, "checksum");
      var verfiychecksum = crypto.createHmac("sha256", encryptkey).update(checksum).digest("base64");
  
      var decrptdata = decryptstr.split("|");
  
      if (verfiychecksum == decrptdata[43]) {
        var viewBag = {
          bankTransactionId: decrptdata[39].toString(),
          ref_no: decrptdata[36].toString(),
          status: decrptdata[40].toString(),
          timestamp: decrptdata[42].toString(),
          challanAmount: decrptdata[20].toString(),
          deptRefId: decrptdata[1].toString(),
          office: decrptdata[29],
          code: decrptdata[30],
          trs_id: decrptdata[31],
          payMode: decrptdata[37].toString(),
          bankName: decrptdata[38].toString(),
          bankMsg: decrptdata[41].toString(),
          mobileno: decrptdata[27].toString(),
          email: decrptdata[28].toString()    }
    }
  
    // Map the data fields to the table columns
    var mappedData = {
      TrsID: viewBag.trs_id || "",
      Industry_Code: null, // Assuming this field does not have a corresponding field in viewBag
      BankTransactionId: viewBag.bankTransactionId || "",
      Ref_No: viewBag.ref_no || "",
      Status: viewBag.status || "",
      Dt_Time: viewBag.timestamp || "",
      IP_Address: req.ip,
      InsertDT: new Date().toISOString(),
      deptRefId: viewBag.deptRefId || "",
      PayMode: viewBag.payMode || "",
      BankName: viewBag.bankName || "",
      BnkTranMsg: viewBag.bankMsg || "",
      UpdateDT: new Date().toISOString(),
  };
  
    // Convert the JSON object to a string
    // var mappedData = JSON.stringify(mappedData);
    function escapeForSQL(value) {
      if (value === null) {
          return 'NULL';
      }
      if (typeof value === 'string') {
          return `'${value.replace(/'/g, "''")}'`;
      }
      return value;
  }
    // Insert JSON string into the database
   
      try {
  
        let query = `INSERT INTO [jform].[dbo].[TransactionReceive](TrsID,
          Industry_Code,
          BankTransactionId,
          Ref_No,
          Status,
          Dt_Time,
          IP_Address,
          InsertDT,
          deptRefId,
          PayMode,
          BankName,
          BnkTranMsg,
          UpdateDT
        ) VALUES (
          ${escapeForSQL(mappedData.TrsID)},
          ${escapeForSQL(mappedData.Industry_Code)},
          ${escapeForSQL(mappedData.BankTransactionId)},
          ${escapeForSQL(mappedData.Ref_No)},
          ${escapeForSQL(mappedData.Status)},
          ${escapeForSQL(mappedData.Dt_Time)},
          ${escapeForSQL(mappedData.IP_Address)},
          ${escapeForSQL(mappedData.InsertDT)},
          ${escapeForSQL(mappedData.deptRefId)},
          ${escapeForSQL(mappedData.PayMode)},
          ${escapeForSQL(mappedData.BankName)},
          ${escapeForSQL(mappedData.BnkTranMsg)},
          ${escapeForSQL(mappedData.UpdateDT)}
        )`;
        console.log(query,"query");
        let result = await cpool.query(query);
        console.log("98098ggbkbkbk",result.command);
            // let encrytrsid = await EncryptString(mappedData.TrsID.toString(), encryptkey);
        console.log("Data successfully inserted into TransactionReceive");
        return(mappedData.TrsID);
      } catch (err) {
        console.error("SQL error", err);
        // res.send({error:err});
      }
  }
  };
  
  //getalldata

  const getTableData = async (req) => {
    console.log("hitted in table-data", req.body);
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let district = req.body.district;
  
    try {
      let allData = `SELECT ad.id,
         MIN(wel.created_on) AS start_date,
         MAX(wel.created_on) AS end_date,
         status_table.status_name
  FROM [jform].[dbo].[application_details] ad
  JOIN [jform].[dbo].[workflow_execution_log] wel
    ON ad.id = wel.obj_id
  JOIN [jform].[dbo].[mst_status] status_table
    ON ad.status_id = status_table.id
  JOIN [jform].[dbo].[industries_details] ind_detail
    ON ind_detail.application_id = ad.id
  JOIN [jform].[dbo].[mst_districts] district
    ON district.id = ind_detail.district_id
  WHERE status_table.status_name = 'COMPLETED'
  GROUP BY ad.id, status_table.status_name
  ORDER BY ad.id;`;
      let dataByDistrict = `
       DECLARE @startDate datetimeoffset = '${startDate}';
      DECLARE @endDate datetimeoffset = '${endDate}';
      DECLARE @district varchar(10) = '${district}';
       SELECT ad.id,
         MIN(wel.created_on) AS start_date,
         MAX(wel.created_on) AS end_date,
         status_table.status_name,
         district.district_name
  FROM [jform].[dbo].[application_details] ad
  JOIN [jform].[dbo].[workflow_execution_log] wel
    ON ad.id = wel.obj_id
  JOIN [jform].[dbo].[mst_status] status_table
    ON ad.status_id = status_table.id
  JOIN [jform].[dbo].[industries_details] ind_detail
    ON ind_detail.application_id = ad.id
  JOIN [jform].[dbo].[mst_districts] district
    ON district.id = ind_detail.district_id
  WHERE status_table.status_name = 'COMPLETED' AND wel.created_on >= @startDate
      AND wel.created_on <= @endDate
      AND district.id = @district
  GROUP BY ad.id, status_table.status_name, district.district_name
  ORDER BY  district.district_name;`;
  
  var allDataQuery;
  var dataByDist;
  console.log(startDate, endDate);
  if (
    startDate == "" ||
    endDate == "" ||
    startDate == undefined ||
    endDate == undefined ||
    startDate == null ||
    endDate == null
  ){
    console.log("latest");
    allDataQuery = await cpool.query(allData);
    console.log(allDataQuery);
  }else if (startDate != null && endDate != null){
    allDataQuery = await cpool.query(dataByDistrict);
    console.log(allDataQuery);
  }
  
    var allDataQ = allDataQuery.recordset; 
   return allDataQ;
  
    } catch (error) {
      console.error("Error executing query:", error);
    }
  };
  
  const pad = (num, size) => {
  let s = String(num);
  while (s.length < size) s = "0" + s;
  return s;
};


async function apiForOrtpsa(applicationId) {
  let data = {
    status: "SUCCESS",
    message: "",
    data: [],
  };

  try {
    LOG.info("Fetching application details from database...", applicationId);
    console.log("Fetching application details from database...", applicationId);
    
    const request = cpool.request();
    request.input("applicationId", sql.Int, applicationId);
    const result = await request.query(`WITH WorkflowLogs AS (
    SELECT
        wel.obj_id AS application_id,
        wel.created_on,
        wel.remarks,
        ROW_NUMBER() OVER (PARTITION BY wel.obj_id ORDER BY wel.created_on ASC) AS rn_asc,
        ROW_NUMBER() OVER (PARTITION BY wel.obj_id ORDER BY wel.created_on DESC) AS rn_desc
        FROM [jform].[dbo].[workflow_execution_log] AS wel
        ),
        FirstLastWorkflow AS (
            SELECT
                application_id,
                MAX(CASE WHEN rn_asc = 1 THEN created_on END) AS applicationReceivedDate,
                MAX(CASE WHEN rn_desc = 1 THEN created_on END) AS lastDate,
                MAX(CASE WHEN rn_desc = 1 THEN remarks END) AS latestRemarks
            FROM WorkflowLogs
        GROUP BY application_id
        ),
        RankedIndustries AS (
            SELECT
                ind.id,
                ind.application_id,
                ind.district_id,
                ind.block_id,
                ind.address,
                ROW_NUMBER() OVER (PARTITION BY ind.application_id ORDER BY ind.created_on DESC) AS rn
            FROM [jform].[dbo].[industries_details] AS ind
        )

        SELECT
            ad.id AS applicationId,
           ad.name AS applicantName,
            ad.mob AS applicantPhoneNo,
            ad.status_id AS applicationStatus,
            
            flw.applicationReceivedDate,
            flw.lastDate,

            COALESCE(ri.district_id, 'No District') AS districtId,
            COALESCE(ri.block_id, 'No Block') AS blockId,
            COALESCE(ri.address, 'No Address') AS applicantAddress,

            COALESCE(ms.status_name, 'Pending') AS deliveryStatus,

            CASE 
                WHEN ms.status_name = 'REJECTED' THEN flw.latestRemarks
                ELSE NULL
            END AS rejectedReason,

            ad.allocation_type_id
        FROM [jform].[dbo].[application_details] AS ad
        LEFT JOIN RankedIndustries AS ri
            ON ad.id = ri.application_id AND ri.rn = 1
        LEFT JOIN FirstLastWorkflow AS flw
            ON flw.application_id = ad.id
        LEFT JOIN [jform].[dbo].[mst_status] AS ms
            ON ad.status_id = ms.id
        WHERE ad.id = @applicationId`);

        LOG.info('result..............', result);
    const appData = result.recordset;
    LOG.info ('query of log appData------',appData);
    console.log( 'query of appData------',appData);
    const serviceMap = {
      1: { serviceId: 48, apiKey: "0cce2b04ed9af824" }, // Construction
      2: { serviceId: 49, apiKey: "c66b6e4906b6b68c" }, // Operational
      3: { serviceId: 50, apiKey: "8387d3087aa29690" }  // Both
    };

    const departmentId = 15;
    const officeId = "01638";
    const designatedOfficer = {
      name: "Nagendra Nath Moharana",
      id: 2259,
    };

    const sendDataList = appData.map(app => {
      const serviceInfo = serviceMap[app.allocation_type_id] || { serviceId: "N/A", apiKey: "N/A" };

      const districtCode = pad(app.districtId || 0, 2); // from industry_details
      const officeCode = pad(officeId, 5); // fixed officeId = 1637
      const departmentCode = pad(departmentId, 2); // fixed departmentId = 15
      const serviceCode = pad(serviceInfo.serviceId, 3);
      const applicationId = pad(app.applicationId || 0, 6);

      const acknowledgementNumber = `${districtCode}${officeCode}${departmentCode}${serviceCode}${applicationId}`;

      // Remap applicationStatus values
      let remappedStatus;
      switch (app.applicationStatus) {
        case 3:
          remappedStatus = 1;
          break;
        case 5:
          remappedStatus = 2;
          break;
        case 6:
          remappedStatus = 5;
          break;
        default:
          remappedStatus = app.applicationStatus;
      }
      return {
        apiKey: serviceInfo.apiKey,
        applicationId: applicationId || 0,
        departmentId: departmentId.toString(),
        serviceId: serviceCode,
        districtId: districtCode || 0,
        blockId: app.blockId || 0,
        grampanchayatId: 0,
        tahasilId: 0,
        officeId: officeCode,
        applicationStatus: remappedStatus || "N/A",
        applicantName: app.applicantName || "N/A",
        applicantAddress: app.applicantAddress || "N/A",
        applicantPhoneNo: app.applicantPhoneNo || "N/A",
        applicationReceivedDate: app.applicationReceivedDate
          ? new Date(app.applicationReceivedDate).toISOString()
          : "N/A",
        lastDate: app.lastDate
          ? new Date(app.lastDate).toISOString()
          : "N/A",
        acknowledgementNumber: acknowledgementNumber,
        deliveryStatus: app.deliveryStatus || "N/A",
        deliveryDate: app.deliveryDate
          ? new Date(app.deliveryDate).toISOString()
          : "N/A",
        rejectedReason: app.rejectedReason || "N/A",
        applyMode: "Online",
        designatedOfficerName: designatedOfficer.name,
        designatedOfficerId: designatedOfficer.id,
        description: "N/A",
      };
    });

    data.data = sendDataList;
    // console.log(data.data, 'ortpsa data ready ');

    return data;
  } catch (err) {
    console.error(err);
    LOG.error("SQL error!!!");
    data.status = "FAILURE in catch";
    data.message = err.message;
  }
  // console.log(data, 'ortpsaData')
}



async function send_to_ortpsa_insert(payload){
  //  console.log(payload, 'ortpsa insert');
   LOG.info("Fetching application send_to_ortpsa_insert...", payload);
   const application = payload.data[0];
  // Step 1: Create an UpdateDto object with updated application data 
  // Assuming Application details is present application Object. 

let data = {
  apiKey: application.apiKey,
  applicationId: application.applicationId,
  acknowledgementNumber: application.acknowledgementNumber,
  departmentId: application.departmentId,
  serviceId: application.serviceId,
  districtId: application.districtId,
  blockId: application.blockId,
  grampanchayatId: 0,
  tahasilId: 0,
  officeId: application.officeId,
  applicationStatus: application.applicationStatus,
  applicantName: application.applicantName,
  applicantAddress: application.applicantAddress,
  applicantPhoneNo: application.applicantPhoneNo,

  // Fixed date formats, sent in yyyy-mm-dd
  applicationReceivedDate: formatDate(application.applicationReceivedDate),
  lastDate: formatDate(application.lastDate),
  deliveryDate: formatDate(application.deliveryDate),

  deliveryStatus: application.deliveryStatus,
  rejectedReason: application.rejectedReason,

  applyMode: application.applyMode,
  designatedOfficerName: application.designatedOfficerName,
  designatedOfficerId: application.designatedOfficerId,
  description: application.description
};


  function formatDate(date) {
  if (!date || date === "N/A") return null; // safer than "N/A"
  return new Date(date).toISOString().split('T')[0];
}
  // console.log('send_to_ortpsa_insert',data );

const count = await ORTPSATransaction.getCountByAcknowledgementNumber(data.acknowledgementNumber);
const transaction1 = ORTPSATransaction.create(data.acknowledgementNumber, 'Insert', count, data.serviceId, data.departmentId, data.applicationId, data.applicationStatus);
// console.log(transaction1, 'create transaction');
const transaction_primary_id = await transaction1.save();
transaction1.setId(transaction_primary_id);
// Step 3: Prepare the response object containing application data and transaction ID 
    let response_insert = { 
        appData: data, 
        // transactionId: transaction_id.recordset[0].trs_id
        transactionId: transaction1.transactionId
    }; 

    console.log(response_insert, 'response_insert');
    

  // 16 Byte Key and Nonce (BASE IV IN CTR MODE) For AES-128-CTR Encryption is Required 
    // Step 4: Generate the AES encryption key from the API key 
 
    let key = Buffer.from(data.apiKey, 'utf-8');  // 08930ebc926207d5 
    // Step 5: JSON Encode  Original Input to ORTPSA API 
     const jsonInsert = JSON.stringify(response_insert);
    const encryptedData = EncryptDecrypt.encrypt(jsonInsert, key);
     // Step 8: Send final Encrypted Payload to ORTPSA Push API For new Application 
     try{
    //  var api_response = await ORTPSAClient.sendToORTPSA(encryptedData, "mdl-v2", data.serviceId, 'text/plain'); // uncomment in prod testing purpose
    //  var api_response = await ORTPSAClient.sendToORTPSA(encryptedData, "test_api", data.serviceId, 'text/plain'); 
     var api_response = await ORTPSAClient.sendToORTPSA(encryptedData, "Insert", data.serviceId, 'text/plain'); 
    console.log(api_response, 'api_response1111');
      // Step 9 Try to parse received Response from ORTPSA iif successfully parsed (with axios auto ) 
        // Check whether Success == true and reciiptId is not empty -> successfull request otherwise failed refer to errors 
 
        if (api_response.ReceiptId && api_response.ReceiptId !== "") { 
            const status = api_response.success === true ? 'success' : 'failed'; 
            console.log(api_response, 'status3333');
            await transaction1.updateProps(api_response.ReceiptId, status); 
            //  Expected Result 
            //  { "success": true, "errors": [], "msg": "Data saved successfully", "responsetime": -0.9358634948730469, "ReceiptId": "3000222020061702400055T1R1" } 
 
        } else { 
          const status = 'failed';
          console.log(status, 'status2222');
          
            await transaction1.updateProps( "", status); 
            //  Expected Result 
            // { "success" : false, "error" : [{"msg" : "Server Not Found", "code" : 404}], "msg":"failed",  "ReceiptId" : "" } 
        } 
    }catch(e){ 
        // Step 10 if Any of above fails consider  then update the status as failed to database 
        api_response = JSON.parse('{ "success" : false, "error" : [{"msg" : "Server NotFound", "code" : 404}], "msg":"failed",  "ReceiptId" : "" }') 
        // await update_transaction(transaction, api_response.ReceiptId, "failed"); 
    } 
     return api_response 
}

async function send_to_ortpsa_update(appPayload) {
  
   console.log(appPayload, 'ortpsa send_to_ortpsa_update');
   const application = appPayload.data && appPayload.data[0];
  // Step 1: Create an UpdateDto object with updated application data 
  // Assuming Application details is present application Object. 
  let data = {
    apiKey: application.apiKey,
    applicationId: application.applicationId,
    acknowledgementNumber: application.acknowledgementNumber,
    departmentId: application.departmentId,
    serviceId: application.serviceId,
    districtId: application.districtId,
    applicationStatus: application.applicationStatus,
    deliveryStatus: application.deliveryStatus,
    deliveryDate: application.deliveryDate,
    rejectedReason: application.rejectedReason
  };
  console.log(data, 'send_to_ortpsa_update');

   const count = await ORTPSATransaction.getCountByAcknowledgementNumber(data.acknowledgementNumber);
    const transaction = ORTPSATransaction.create(data.acknowledgementNumber, 'Update', count, data.serviceId, data.departmentId,data.applicationId, data.applicationStatus);
    const transaction_primary_id = await transaction.save();
    // console.log(transaction_primary_id, 'transaction_primary_id')
    transaction.setId(transaction_primary_id);
    const responseInsert = {
    appData: data,
    transactionId: transaction.transactionId
    };
    // console.log(responseInsert, 'responseInsert Update');
    
  const key = Buffer.from(data.apiKey, 'utf-8');
  const jsonInsert = JSON.stringify(responseInsert);
  const payload = EncryptDecrypt.encrypt(jsonInsert, key);
//   console.log(payload, 'encrypted payload111')
let api_response;
  try {
    // let api_response = await ORTPSAClient.sendToORTPSA(payload, "mdl-upd-v2", data.serviceId, 'text/plain'); //uncomment in prod, testing purpose
    // let api_response = await ORTPSAClient.sendToORTPSA(payload, "update_api", data.serviceId, 'text/plain');
     api_response = await ORTPSAClient.sendToORTPSA(payload, "Update", data.serviceId, 'text/plain');
    // console.log(api_response, 'api_response')
 if (api_response.ReceiptId && api_response.ReceiptId !== "") {
        const status = api_response.success === true ? 'success' : 'failed';
        await transaction.updateProps(api_response.ReceiptId, status);
      } else {
        await transaction.updateProps("", "failed");
      }
      
    //   res.send(api_response);
  } catch (error) {
    // console.log(error, 'errorupdate')
    // Step 10 if Any of above fails consider  then update the status as failed to database 
    api_response = JSON.parse('{ "success" : false, "error" : [{"msg" : "Server Not Found", "code" : 404}], "msg":"failed",  "ReceiptId" : "" }')
    // await update_transaction(transaction, api_response.ReceiptId, "failed")
  }
  return api_response
}



async function changeApplicationStatus(req) {
    // console.log("REQUEST RECEIVED →", req);
    let appId = req;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };

    try {
        // console.log("STARTING PROCESS FOR APP ID →", appId);

        const status = await Status.findOne({
            where: { id: AppConstants.PENDING },
            raw: true
        });

        const app = await Application.findOne({
            attributes: ['id', 'app_type', 'name', 'purpose_id', 'application_type_id', 'status_id', 'industries_id', 'created_by'],
            where: { id: appId }
        });

        // console.log("APP FOUND →", app?.dataValues ?? app);

        const applicationtypemst = await WorkFlowConfig.findOne({
            attributes: ['id', 'app_type_id', 'wf_id'],
            where: { app_type_id: app.application_type_id },
            raw: true
        });

        // console.log("WORKFLOW CONFIG →", applicationtypemst);

        let workFlowStep = await WorkFlowStep.findOne({
            attributes: ['id', 'step_name', 'step_desc', 'wf_id'],
            where: {
                wf_id: applicationtypemst.wf_id,
                order_sl: AppConstants.WORK_FLOW_STEP
            },
            raw: true
        });

        // console.log("WORKFLOW STEP →", workFlowStep);

        const workflowsteptrans = await WorkFlowStepTransition.findAll({
            attributes: ['id', 'work_flow_step_id', 'transition_type_id', 'step_end_flag'],
            order: [['id', 'ASC']],
            where: { work_flow_step_id: workFlowStep.id },
            raw: true
        });

        // console.log("STEP TRANSITIONS →", workflowsteptrans[0].id);

        let maxlogId = await WorkflowExecutionLog.max('id');
        maxlogId = isNaN(maxlogId) ? 1 : maxlogId + 1;

        // console.log("NEW LOG ID →", maxlogId);

        const workflowlog = await WorkflowExecutionLog.create({
            id: maxlogId,
            obj_id: app.id,
            wf_id: applicationtypemst.wf_id,
            wf_step_id: workFlowStep.id,
            wf_step_transition_id: workflowsteptrans[0].id,
            from_id: 1,
            to_id: AppConstants.SEC_ID,
            remarks: 'OK',
            created_by: 1,
            created_on: new Date()
        });

        // console.log("WORKFLOW LOG INSERTED →", workflowlog);

        // console.log("Updating Application…");

        const result = await Application.update({
            status_id: status.id,
            updated_by: 1,
            updated_on: new Date()
        }, {
            where: { id: appId, status_id: AppConstants.DRAFT }
        });

        // console.log("APPLICATION UPDATE RESULT →", result);

        data.message = 'SUCCESS';
        data.data = result;

    } catch (err) {
        console.error("ERROR →", err);
        data.status = 'FAILURE';
        data.message = err.message;
    }

    return data;
}



const GetSCrollData = async (req) => {
  return new Promise(async (resolve, reject) => {
    let ip = req.ip;
    let responseValue = req.body || req;
    let Updatedate = new Date().toISOString();
    try {
       if (
        responseValue.deptCode != "WAR" &&
        responseValue.scrollData.length == 0
      ) {
        resolve("Invalid deptCode or Scroll Data!!!");
      } else {
        for (const item of responseValue.scrollData) {
          if (item.challanDtls.length > 0 && item.bankTransStatus == "S") {
            if (item.challanDtls[0].hoa == "0700-80-800-0097-02240-000") {
              // console.log(item.departmentRefId, item.departmentRefId.split('-')[1], "departmentRefId");
              let dataobj = {
                trs_id: parseInt(item.departmentRefId.split("-")[1]),
                challan_reference_no: String(item.challanRefId),
                bank_transaction_id: String(item.bankTransId),
                bank_transaction_ts: String(item.bankTransTime),
                bankTransStatus: item.bankTransStatus,
                deptrefid: item.departmentRefId,
                ip_adrress: ip ? ip.toString() : "Unknown IP",
              };
              function escapeForSQL(value) {
                if (value === null) {
                  return "NULL";
                }
                if (typeof value === "string") {
                  return `'${value.replace(/'/g, "''")}'`;
                }
                return value;
              }
              console.log(dataobj, "dataobjjjjjj");
              let part1data;

              let query = `select TrsID FROM [jform].[dbo].[TransactionReceive] where TrsID = ${dataobj.trs_id}`;
              // console.log(query);
              let result = await cpool.query(query);
              console.log(result.recordset.length, "8667ghjvb");
              if (result.recordset.length === 0) {
                let query1 = `INSERT INTO [jform].[dbo].[TransactionReceive](
                TrsID, BankTransactionId, Ref_No, Status, Dt_Time, IP_Address, InsertDT)
                    VALUES (${dataobj.trs_id}, ${escapeForSQL(dataobj.bank_transaction_id)}, ${escapeForSQL(dataobj.challan_reference_no)},
                       ${escapeForSQL(dataobj.bankTransStatus)}, ${escapeForSQL(dataobj.bank_transaction_ts)}, ${escapeForSQL(dataobj.ip_adrress)}, ${escapeForSQL(Updatedate)})`;

                // console.log(query1, "query11");
                let result1 = await cpool.query(query1);
                console.log(query1, result1.command, "result1");
                // if (result1.command === 'INSERT') {
                //   part1data = true;
                // }
                // else {
                //   part1data = false;
                // }

                // console.log(result1.command, "result1");
              } else {
                let query1 = `UPDATE [jform].[dbo].[TransactionReceive]
                SET BankTransactionId = ${escapeForSQL(
                  dataobj.bank_transaction_id
                )}, Ref_No = ${escapeForSQL(dataobj.challan_reference_no)}, 
                Status = ${escapeForSQL(
                  dataobj.bankTransStatus
                )}, Dt_Time =${escapeForSQL(
                  dataobj.bank_transaction_ts
                )}, IP_Address =${escapeForSQL(
                  dataobj.ip_adrress
                )}, UpdateDT = ${escapeForSQL(Updatedate)}
                WHERE TrsID = ${dataobj.trs_id}`;

                // console.log(query1, "uquery1");
                let result1 = await cpool.query(query1);
              }
               console.log(item.challanDtls,'challanDtls');
              for (const D of item.challanDtls) {
                dataobj.challan_number = D.challanNo;
                dataobj.challan_date = D.challanDt;
                dataobj.challan_amt = D.challanAmt;
              }
              // if (part1data == true) {
              let query1 = ` select TRSID from [jform].[dbo].[TransactionRec_RBIChallan] where TRSID = ${dataobj.trs_id}`;
              console.log(query1,'query1query1query1');
              let result1 = await cpool.query(query1);
              console.log(result1.recordset, 9878908);
              // let query4 =`SELECT * FROM [jform].[dbo].[payment_jform] WHERE trsid = ${dataobj.trs_id} AND status = 'S';`
              let query4 = `SELECT * FROM jform.dbo.payment_jform AS a INNER JOIN dbo.application_details AS b 
              ON b.id = a.app_id WHERE a.trsid = ${dataobj.trs_id}  AND a.status = 'S' AND b.status_id = '4' ;`
              console.log(query4,'query4');
               let result4 = await cpool.query(query4);
               console.log(result4, 'aratitesting');
		if(result4.recordset[0].app_id != null || result4.recordset[0].app_id != undefined){
                 	let datastatus =   changeApplicationStatus(result4.recordset[0].app_id);
		}
              if (result1.recordset.length == 0) {
                let query2 = `INSERT INTO [jform].[dbo].[TransactionRec_RBIChallan] (TRSID, challan_no_Proces, date_Proces)
                VALUES (${escapeForSQL(dataobj.trs_id)}, ${escapeForSQL(
                  dataobj.challan_number
                )}, ${escapeForSQL(dataobj.challan_date)})`;

                let result2 = await cpool.query(query2);
                console.log(result2.command, 4765868);
              }
              let query3 = ` select TRSID from [jform].[dbo].[ChallanEntry] where TRSID = ${dataobj.trs_id}`;
              let result3 = await cpool.query(query3);
              if (result3.recordset.length === 0) {
                let query1 = `Select PaymentTowards from [jform].[dbo].[TreasuryTransaction] where TRSID = ${dataobj.trs_id}`;
                let result1 = await cpool.query(query1);
                let data = result1.recordset[0];
                console.log(result1.recordset, 323435285);
                if (result1.recordset.length === 0) {
                  let query1 = `INSERT INTO [jform].[dbo].[ChallanEntry]( Challan_No_Proces, Challan_Dt_Proces, Challan_Amt_Proces,Tot_Challan_Amt, IP_Address, TRSID)
                      VALUES(${escapeForSQL(
                    dataobj.challan_number
                  )}, ${escapeForSQL(dataobj.challan_date)},${escapeForSQL(
                    dataobj.challan_amt
                  )},${escapeForSQL(dataobj.challan_amt)},${escapeForSQL(
                    dataobj.ip_adrress
                  )},${escapeForSQL(dataobj.trs_id)})`;
                  console.log(query1, "challanentry");
                  let result1 = await cpool.query(query1);
                  console.log(result1,result1.rowsAffected[0], 365509080778785);
                  if (result1.rowsAffected[0] == 1) {
                    resolve("Challan Entry Successfully");
                  }
                }
                resolve("Challan Number already Exist");
              }
              resolve("Challan not availabe");
            } else {
              console.log("data not availabe");
            }
          }
          else {
            resolve("Server side error");
          }
        }
      }
    } catch (error) {
      console.log(error, "Error");
      reject("Server side error");
    }
  });
};





module.exports = {
    fileDownload,
    getCitizenDashboard,
    allDashboardDataBasedOnType,
    createFeedback,
    getFeedbackDetailsByName,
    getPaymentDetailById,
    createHolidayList,
    getHolidayList,
    holidayList,
    createHolidayName,
    updateHolidayList,
    deleteHolidayList,
    setBankPaymentDetails,
    testTreasuryData,
    landingDashboard,
    sendTreasuryData,
    getDistrict,
    treasuryRecieve,
    GettransactionDetails,
    GetSCrollData,
    getTableData,
    apiForOrtpsa,
    send_to_ortpsa_insert,
    send_to_ortpsa_update
}