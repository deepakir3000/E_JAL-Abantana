const express = require('express');
var { cpool } = require('../../db/sql');
let sequelize = require('./../../config/seqlize');
const { Sequelize } = require('sequelize');
const { AppConstants } = require('./../../utils/AppConstants');
const AppUtils = require('./../../utils/AppUtils')
const { Application } = require('./../../models/formaction/applicationdetails.js');
const { Purpose } = require('./../../models/mdm/purpose');
const { AllocationType } = require('./../../models/mdm/allocationType.js');
const { User } = require('../../models/uac/user');
const { Role } = require('../../models/uac/role');
const { Industry } = require('./../../models/mdm/industry.js');
const { IndustryDetailsMst } = require('./../../models/mdm/industryDetails.js');
const { Allocation } = require('./../../models/mdm/allocation.js');
const { AllocationDetails } = require('./../../models/mdm/allocationdetails.js');
const { District } = require('./../../models/mdm/district.js');
const { OperationalSource } = require('./../../models/mdm/operationalSource.js');
const { River } = require('./../../models/mdm/mstriver.js');
const { Dam } = require('./../../models/mdm/mstdam.js');
const { Basin } = require('./../../models/mdm/mstbasin.js');
const { Block } = require('./../../models/mdm/block.js');
const { IndustryDeatils } = require('./../../models/formaction/indeustriesdetails.js');
const { ApplicationTypeMst } = require('./../../models/workflow/applicationtypemst.js');
const { WorkFlow } = require('./../../models/workflow/workflow.js');
const { WorkflowExecutionLog } = require('./../../models/workflow/workflowexecutionlog.js');
const { WorkFlowStepTransition } = require('./../../models/workflow/workflowsteptransitions.js');
const { NotificationTemplates } = require('./../../models/workflow/notificationtemplates.js');
const { WorkFlowStep } = require('./../../models/workflow/workflowstep.js');
const { WorkFlowStepTransitonTypeMst } = require('./../../models/workflow/workflowsteptransitiontypemst.js');
const { WorkFlowTypeMst } = require('./../../models/workflow/workflowtypemst.js');
const { WorkFlowConfig } = require('./../../models/workflow/applicationtypeworkflowconfig.js');
const { Capacity } = require('./../../models/formaction/capacity.js');
const { LocationDetails } = require('./../../models/formaction/locationdetails.js');
const { WaterManagement } = require('./../../models/formaction/watermgmt.js');
const { WaterRequisirion } = require('./../../models/formaction/waterrequisition.js');
const { PhaseWise } = require('./../../models/formaction/phasewisereq.js');
const { Status } = require('./../../models/uac/status.js');
const { logger } = require('./../../config/log-config');
const LOG = logger.getLogger('FormActionService.js');
const Op = Sequelize.Op
const commonServices = require('../common/CommonServiceImpl.js');
const sql = require('mssql');
//function for application type
function appcode(application, operational, quantity) {
    let data = null;
    if (application != null && operational != null) {
        if (application.application_type == 'CONSTRUCTIONAL') {
            if (operational.operational_source == 'GROUND') {
                if ((quantity > 0) && (quantity <= AppConstants.CGW_UPTO_50)) {
                    data = 'CGW_UPTO_50_KLD'
                } else if ((quantity > AppConstants.CGW_UPTO_50) && (quantity <= AppConstants.CGW_UPTO_250)) {
                    data = 'CGW_UPTO_250_KLD'
                } else if ((quantity > AppConstants.CGW_UPTO_250) && (quantity <= AppConstants.CGW_UPTO_1250)) {
                    data = 'CGW_UPTO_1250_KLD'
                }
            } else if (operational.operational_source == 'SURFACE') {
                if (quantity > 0 && quantity <= AppConstants.CGW_UPTO_250) {
                    data = 'CSW_UPTO_250_KLD'
                } else if (quantity > AppConstants.CGW_UPTO_250 && quantity <= AppConstants.CGW_UPTO_1250) {
                    data = 'CSW_UPTO_1250_KLD'
                }
            }
        } else if (application.application_type === 'OPERATIONAL') {
            if (operational.operational_source == 'GROUND') {
                if ((quantity > 0) && (quantity <= AppConstants.CGW_UPTO_50)) {
                    data = 'OGW_UPTO_50_KLD'
                } else if ((quantity > AppConstants.CGW_UPTO_50) && (quantity <= AppConstants.CGW_UPTO_1250)) {
                    data = 'OGW_UPTO_1250_KLD'
                } else if ((quantity > AppConstants.CGW_UPTO_1250)) {
                    data = 'OGW_GT_1250_KLD'
                }
            } else if (operational.operational_source == 'SURFACE') {
                if (quantity > 0 && quantity <= AppConstants.CGW_UPTO_250) {
                    data = 'OSW_UPTO_250_KLD'
                } else if (quantity > AppConstants.CGW_UPTO_250 && quantity <= AppConstants.CGW_UPTO_1250) {
                    data = 'OSW_UPTO_1250_KLD'
                } else if (quantity > AppConstants.CGW_UPTO_1250) {
                    data = 'OSW_GT_1250_KLD'
                }
            }
        } else if (application.application_type === 'BOTH') {
            if (operational.operational_source == 'GROUND') {
                if ((quantity > 0) && (quantity <= AppConstants.CGW_UPTO_50)) {
                    data = 'BGW_UPTO_50_KLD'
                } else if ((quantity > AppConstants.CGW_UPTO_50) && (quantity <= AppConstants.CGW_UPTO_1250)) {
                    data = 'BGW_UPTO_1250_KLD'
                } else if ((quantity > AppConstants.CGW_UPTO_1250)) {
                    data = 'BGW_GT_1250_KLD'
                }
            } else if (operational.operational_source == 'SURFACE') {
                if (quantity > 0 && quantity <= AppConstants.CGW_UPTO_250) {
                    data = 'BSW_UPTO_250_KLD'
                } else if (quantity > AppConstants.CGW_UPTO_250 && quantity <= AppConstants.CGW_UPTO_1250) {
                    data = 'BSW_UPTO_1250_KLD'
                } else if (quantity > AppConstants.CGW_UPTO_1250) {
                    data = 'BSW_GT_1250_KLD'
                }
            }
        }
    }
    return data;
}
//formSubmit
const formSubmit = async (req) => {
    LOG.info('Inside FormActionService formSubmit');
    let phaseWiseReq = JSON.parse(req.body.phaseReq);
    let reqData = req.body;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        //Application Details Save Here
        var maxAppId = await Application.max('id');
        var status = await Status.findOne({
            where: {
                id: AppConstants.DRAFT
            },
            raw: true
        })

        var purpose = await Purpose.findOne({
            where: {
                id: reqData.purpose
            },
            raw: true
        })
        var application = await AllocationType.findOne({
            where: {
                id: reqData.appFor
            },
            raw: true
        })
        let operat = 0;
        if (reqData.quanIntended != 0) {
            operat = reqData.quanIntended
        } else {
            operat = reqData.surfaceId
        }
        var operationalSource = await OperationalSource.findOne({
            where: {
                id: operat
            },
            raw: true
        })
        let sour = 0;

        if (reqData.opQuant != 0) {
            sour = parseInt(reqData.opQuant);
        } else {
            sour = parseInt(reqData.opQuantSur);
        }

        let value = appcode(application, operationalSource, sour);

        var applicationType = await ApplicationTypeMst.findOne({
            where: {
                application_type_desc: value
            },
            raw: true
        })
        let transTypeMst = await WorkFlowStepTransitonTypeMst.findOne({
            where: {
                id: AppConstants.FORM_SUBMIT
            },
            raw: true
        })
        let indusId = null;
        let industries = null;
        if (reqData.indId !== undefined) {
            industries = await IndustryDetailsMst.findOne({
                attributes: ['serial_no', 'industry_name', 'division'],
                where: {
                    serial_no: reqData.indId
                },
                raw: true
            })
        }
        let app = null;
        if (req.body.applicationId != 0) {
            app = await Application.findOne({
                attributes: ['id', 'cur_aloc_order', 'renewal_recom', 'payment_doc'],
                where: {
                    id: req.body.applicationId
                }
            });
        }

        if (industries !== null) {
            indusId = industries.serial_no;
        }
        if (purpose == null || application == null || applicationType == null) {
            LOG.error("Purpose Id or allocation type id or application type id is not valid..." + purpose);
            data.status = 'INVALID';
            data.message = 'Purpose Id or allocation type id or application type id is not valid';
            data.data = purpose;
        } else {
            maxAppId = isNaN(maxAppId) ? 1 : maxAppId + 1
            const result = await Application.create({
                id: maxAppId,
                app_type: reqData.appType,
                name: reqData.name,
                email: reqData.email,
                mob: reqData.mobile,
                ce_name: reqData.ceName,
                purpose_id: purpose.id,
                application_type_id: applicationType.id,
                allocation_type_id: application.id,
                others: reqData.purOters,
                status_id: status.id,
                work_flow_step_transiton_type_mst_id: transTypeMst.id,
                status_remarks: 'form submitted by citizen',
                created_by: req.user.id,
                created_on: new Date(),
                updated_by: req.user.id,
                updated_on: new Date(),
                industries_id: indusId,
                app_for: reqData.appExtFor,
                cur_alocation_qt: reqData.curAllocationQt,
                cur_alocation_qt_cusec: (reqData.curAllocationQt / 2500),
                paid_amount: reqData.paidAmount,
                cur_aloc_order: req.files['allocation'] == undefined ? null : (req.files['allocation'][0] == undefined ? null : req.files['allocation'][0].filename),
                renewal_recom: req.files['renewal'] == undefined ? null : (req.files['renewal'][0] == undefined ? null : req.files['renewal'][0].filename),
                payment_doc: req.files['paymentDoc'] == undefined ? null : (req.files['paymentDoc'][0] == undefined ? null : req.files['paymentDoc'][0].filename),
                type: (indusId === 'null' ? 'NEW' : (indusId === null ? "NEW" : "EXT")),
                industrial_percent: reqData.industryPercent,
                bulk_percent: reqData.bulkPrecent
            });
            data.data = result;
        }
        //Industry Details Save Here
        var maxIndId = await IndustryDeatils.max('id');
        var industry = await Industry.findOne({
            where: {
                id: reqData.indType
            },
            raw: true
        })

        var district = await District.findOne({
            where: {
                id: reqData.distId
            },
            raw: true
        })

        var block = await Block.findOne({
            where: {
                id: reqData.blockId
            },
            raw: true
        })

        if (industry == null || district == null || block == null) {
            LOG.error("Industry Type Id or district id or block id is not valid..." + purpose);
            data.status = 'INVALID';
            data.message = 'Industry Type Id or district id or block id is not valid';
            data.data = purpose;
        } else {
            maxIndId = isNaN(maxIndId) ? 1 : maxIndId + 1
            const industryDetails = await IndustryDeatils.create({
                id: maxIndId,
                industry_id: industry.id,
                application_id: maxAppId,
                pan_no: reqData.panNo,
                address: reqData.address,
                pin_code: reqData.pinCode,
                district_id: district.id,
                others: reqData.indOters,
                block_id: block.id,
                created_by: req.user.id,
                created_on: new Date(),
                updated_by: req.user.id,
                updated_on: new Date()
            });
        }
        //Capacity Details Save Here
        if (data.status != 'INVALID') {
            var maxCapId = await Capacity.max('id');
            maxCapId = isNaN(maxCapId) ? 1 : maxCapId + 1
            const capacity = await Capacity.create({
                id: maxCapId,
                application_id: maxAppId,
                present_capacity_in_kld: reqData.presentCap,
                present_capacity_unit: reqData.presentUnit,
                future_capacity_in_kld: reqData.futureCap,
                future_capacity_unit: reqData.futureUnit,
                created_by: req.user.id,
                created_on: new Date(),
                updated_by: req.user.id,
                updated_on: new Date()
            });
        }

        //Location Details Save Here
        let dam = null;
        if (reqData.damId === 'null') {
            reqData.damId = null
        }
        if (reqData.damId != 0 || reqData.damId != null) {
            dam = await Dam.findOne({
                where: {
                    id: reqData.damId
                },
                raw: true
            })
        }
        let river = null;
        if (reqData.riverId === 'null') {
            reqData.riverId = null
        }
        if (reqData.riverId != 0 || reqData.riverId != null) {
            river = await River.findOne({
                where: {
                    id: reqData.riverId
                },
                raw: true
            })
        }
        LOG.info(river)
        if (data.status != 'INVALID') {
            if (operationalSource == null) {
                LOG.error("Operational Source id is not valid..." + purpose);
                data.status = 'INVALID';
                data.message = 'Operational Source id is not valid';
                data.data = purpose;
            } else {
                let loc = null;
                if (app !== null) {
                    loc = await LocationDetails.findOne({
                        attributes: ['id', 'intake_loc', 'industry_loc', 'recomend_letter', 'mou_signed'],
                        where: {
                            application_id: app.id
                        }
                    });
                }
                var maxLocId = await LocationDetails.max('id');
                maxLocId = isNaN(maxLocId) ? 1 : maxLocId + 1
                const location = await LocationDetails.create({
                    id: maxLocId,
                    application_id: maxAppId,
                    intake_loc: req.files['intake'] == undefined ? (loc === null ? null : loc.intake_loc) : (req.files['intake'][0] == undefined ? null : req.files['intake'][0].filename),
                    industry_loc: req.files['industry'] == undefined ? (loc === null ? null : loc.industry_loc) : (req.files['industry'][0] == undefined ? null : req.files['industry'][0].filename),
                    recomend_letter: req.files['recomendation'] == undefined ? (loc === null ? null : loc.recomend_letter) : (req.files['recomendation'][0] == undefined ? null : req.files['recomendation'][0].filename),
                    mou_signed: req.files['mou'] == undefined ? (loc === null ? null : loc.mou_signed) : (req.files['mou'][0] == undefined ? null : req.files['mou'][0].filename),
                    intake_latitude: reqData.latitude,
                    intake_longitude: reqData.longtitude,
                    industry_latitude: reqData.industryLatitude,
                    industry_longitude: reqData.industryLongtitude,
                    created_by: req.user.id,
                    created_on: new Date(),
                    updated_by: req.user.id,
                    updated_on: new Date()
                });
            }
        }

        //Requision of water Details Save Here
        var maxWReqId = await WaterRequisirion.max('id');
        if (data.status != 'INVALID') {
            if (operationalSource == null) {
                LOG.error("Operational Source id is not valid..." + purpose);
                data.status = 'INVALID';
                data.message = 'Operational Source id is not valid';
                data.data = purpose;
            } else {
                LOG.error('JHGDKFKJG ', (reqData.surfaceId === null ? 0 : reqData.surfaceId))
                let waterReq = null;
                if (app !== null) {
                    waterReq = await WaterRequisirion.findOne({
                        attributes: ['id', 'op_quantity', 'certificate', 'cal_of_quantity', 'cgwa_certificate'],
                        where: {
                            application_id: app.id
                        }
                    });
                }
                maxWReqId = isNaN(maxWReqId) ? 1 : maxWReqId + 1
                const waterRequisition = await WaterRequisirion.create({
                    id: maxWReqId,
                    op_quantity: reqData.opQuant,
                    op_quantity_in_cusec: (reqData.opQuant / 2500),
                    application_id: maxAppId,
                    dam_id: dam == null ? 0 : dam.id,
                    river_id: river == null ? 0 : river.id,
                    certificate: req.files['certificate'] == undefined ? (waterReq === null ? null : waterReq.certificate) : (req.files['certificate'][0] == undefined ? null : req.files['certificate'][0].filename),
                    cal_of_quantity: req.files['quantity'] == undefined ? (waterReq === null ? null : waterReq.cal_of_quantity) : (req.files['quantity'][0] == undefined ? null : req.files['quantity'][0].filename),
                    joint_report: req.files['jointReport'] == undefined ? (waterReq === null ? null : joint_report) : (req.files['jointReport'][0] == undefined ? null : req.files['jointReport'][0].filename),
                    operational_source_id: operationalSource.id,
                    op_quantity_sur: reqData.opQuantSur,
                    op_quantity_sur_in_cusec: (reqData.opQuantSur / 2500),
                    cgwa_certificate: req.files['cgwaCertificate'] == undefined ? (waterReq === null ? null : waterReq.cgwa_certificate) : (req.files['cgwaCertificate'][0] == undefined ? null : req.files['cgwaCertificate'][0].filename),
                    source_id: reqData.surfaceId,
                    source_dam_id: reqData.sourceDamId,
                    source_river_id: reqData.sourceRiverId,
                    created_by: req.user.id,
                    created_on: new Date(),
                    updated_by: req.user.id,
                    updated_on: new Date()
                });
            }
        }
        //Phase Wise Requirment Details Save Here
        if (data.status != 'INVALID') {
            let phase = null;
            let filename = null;
            if (phaseWiseReq.length !== 0 && app !== null) {
                phase = await PhaseWise.findAll({
                    attributes: ['id', 'cgwa_certificate'],
                    where: {
                        application_id: app.id
                    }
                });
            }
            if (phase != null) {
                if (phase.length !== 0) {
                    filename = phase[0].cgwa_certificate;
                }
            }
            for (var i = 0; i < phaseWiseReq.length; i++) {
                var maxPhaseId = await PhaseWise.max('id');
                maxPhaseId = isNaN(maxPhaseId) ? 1 : maxPhaseId + 1
                console.log('DATE=============>', new Date(phaseWiseReq[i].from_date),)
                const phaseWise = await PhaseWise.create({
                    id: maxPhaseId,
                    application_id: maxAppId,
                    from_date: (phaseWiseReq[i].from_date == '' || phaseWiseReq[i].from_date == null) ? null : new Date(phaseWiseReq[i].from_date),
                    to_date: (phaseWiseReq[i].to_date == '' || phaseWiseReq[i].to_date == null) ? null : new Date(phaseWiseReq[i].to_date),
                    unit: phaseWiseReq[i].unit,
                    unit_in_cusec: parseFloat(phaseWiseReq[i].unit / 2500),
                    cgwa_certificate: req.files['cgwa'] == undefined ? (filename == null ? null : filename) : (req.files['cgwa'][0] == undefined ? null : req.files['cgwa'][0].filename),
                    is_deleted: phaseWiseReq[i].status == null ? false : phaseWiseReq[i].status,
                    created_by: req.user.id,
                    created_on: new Date(),
                    updated_by: req.user.id,
                    updated_on: new Date()
                });
            }
        }
        //Water Mgmt Plan Save Here
        if (data.status != 'INVALID') {
            let waterMgmt = null;
            if (app !== null) {
                waterMgmt = await WaterManagement.findOne({
                    attributes: ['id', 'layout_drawal', 'disposal_method', 'drawal_water', 'water_mgmt', 'allocation_order', 'industry_details'],
                    where: {
                        application_id: req.body.applicationId
                    }
                });
            }
            var maxWaterId = await WaterManagement.max('id');
            maxWaterId = isNaN(maxWaterId) ? 1 : maxWaterId + 1
            const water = await WaterManagement.create({
                id: maxWaterId,
                application_id: maxAppId,
                layout_drawal: req.files['layout'] == undefined ? (waterMgmt === null ? null : waterMgmt.layout_drawal) : (req.files['layout'][0] == undefined ? null : req.files['layout'][0].filename),
                disposal_method: req.files['disposal'] == undefined ? (waterMgmt === null ? null : waterMgmt.disposal_method) : (req.files['disposal'][0] == undefined ? null : req.files['disposal'][0].filename),
                drawal_water: req.files['scheme'] == undefined ? (waterMgmt === null ? null : waterMgmt.drawal_water) : (req.files['scheme'][0] == undefined ? null : req.files['scheme'][0].filename),
                water_mgmt: req.files['waterMgmt'] == undefined ? (waterMgmt === null ? null : waterMgmt.water_mgmt) : (req.files['waterMgmt'][0] == undefined ? null : req.files['waterMgmt'][0].filename),
                allocation_order: req.files['allocationOrder'] == undefined ? (waterMgmt === null ? null : waterMgmt.allocation_order) : (req.files['allocationOrder'][0] == undefined ? null : req.files['allocationOrder'][0].filename),
                industry_details: req.files['indDetails'] == undefined ? (waterMgmt === null ? null : waterMgmt.industry_details) : (req.files['indDetails'][0] == undefined ? null : req.files['indDetails'][0].filename),
                created_by: req.user.id,
                created_on: new Date(),
                updated_by: req.user.id,
                updated_on: new Date()
            });
        }
        if (data.status != 'INVALID') {
            data.message = 'Form Submitted Successfully.....';
        }
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//getApplicationData
const getApplicationData = async (req) => {
    LOG.info('Inside FormActionService getApplicationData');
    var condition = req.query.type;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    if (condition != null) {
        if (condition == 'Existing') {
            // logic is here
        }
    }
    try {
        const purpose = await Purpose.findAll({
            attributes: ['id', 'purpose_name'],
            where: {
                status: AppConstants.ACTIVE
            },
            raw: true
        });
        const application = await AllocationType.findAll({
            attributes: ['id', 'application_type'],
            where: {
                status: AppConstants.ACTIVE
            },
            raw: true
        });
        const industry = await Industry.findAll({
            attributes: ['id', 'industry_name'],
            order: [
                ['industry_name', "ASC"]
            ],
            where: {
                status: AppConstants.ACTIVE
            },
            raw: true
        });
        const district = await District.findAll({
            attributes: ['id', 'district_name'],
            order: [
                ["district_name", "ASC"]
            ],
            where: {
                status: AppConstants.ACTIVE
            },
            raw: true
        });
        const operationalSource = await OperationalSource.findAll({
            attributes: ['id', 'operational_source'],
            where: {
                status: AppConstants.ACTIVE
            },
            raw: true
        });

        const river = await River.findAll({
            include: [{
                model: Basin,
                as: 'Basin',
                attributes: [],
            }],
            order: [
                ['basin_id', "ASC"],
                ['river_name', 'ASC']
            ],
            attributes: ['id', 'river_name', 'basin_id', 'Basin.basin_name'],
            raw: true
        });

        data.data = {
            "purpose": purpose,
            "application": application,
            "industries": industry,
            "district": district,
            "operational": operationalSource,
            "river": river
        };
        data.message = 'SUCCESS';
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//changeApplicationStatus
const changeApplicationStatus = async (req) => {
    LOG.info('Inside FormActionService changeApplicationStatus');
    let toId = null;
    let fromId = null;
    let { appId } = req.params;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        var status = await Status.findOne({
            where: {
                id: AppConstants.PENDING
            },
            raw: true
        })
        //Save Application Details For WorkFlow Here
        const app = await Application.findOne({
            attributes: ['id', 'app_type', 'name', 'purpose_id', 'application_type_id', 'status_id', 'industries_id', 'created_by'],
            where: {
                id: appId
            }
        })

        let applicationtypemst = await WorkFlowConfig.findOne({
            attributes: ['id', 'app_type_id', 'wf_id'],
            where: {
                app_type_id: app.application_type_id
            },
            raw: true
        })
        let workFlowStep = null;
        // let industries = null;
        if (applicationtypemst !== null && app !== null) {
            /* if(app.industries_id !== null){
                workFlowStep = await WorkFlowStep.findOne({
                    attributes:['id','step_name','step_desc','wf_id'],
                    where: {
                        wf_id: applicationtypemst.wf_id,
                        order_sl: AppConstants.WORK_FLOW_STEP_EXT
                    },
                    raw: true
                })
                industries = await IndustryDetailsMst.findOne({
                    attributes:['serial_no','industry_name','division'],
                    where: {
                        serial_no: app.industries_id
                    },
                    raw: true
                })
                if(industries != null){
                    toId = industries.division;
                }
                if(toId != null){
                    let user = await User.findOne({
                        attributes:['id','user_name'],
                        where: {
                            user_name: toId
                        },
                        raw: true
                    })
                    if(user != null){
                        toId = user.id
                    }
                }
            }else{ */
            workFlowStep = await WorkFlowStep.findOne({
                attributes: ['id', 'step_name', 'step_desc', 'wf_id'],
                where: {
                    wf_id: applicationtypemst.wf_id,
                    order_sl: AppConstants.WORK_FLOW_STEP
                },
                raw: true
            })
            toId = AppConstants.SEC_ID;
            fromId = app.created_by;
            // }
        }
        let workflowsteptrans = null;
        if (workFlowStep != null) {
            workflowsteptrans = await WorkFlowStepTransition.findAll({
                attributes: ['id', 'work_flow_step_id', 'transition_type_id', 'step_end_flag'],
                order: [
                    ['id', 'ASC'],
                ],
                where: {
                    work_flow_step_id: workFlowStep.id
                },
                raw: true
            })
        }
        var maxlogId = await WorkflowExecutionLog.max('id');
        if (workflowsteptrans.length == 0) {
            data.status = 'INVALID';
            data.message = 'INVALID';
        } else {
            maxlogId = isNaN(maxlogId) ? 1 : maxlogId + 1
            let workflowlog = await WorkflowExecutionLog.create({
                id: maxlogId,
                obj_id: app.id,
                wf_id: applicationtypemst.wf_id,
                wf_step_id: workFlowStep.id,
                wf_step_transition_id: workflowsteptrans[0].id,
                from_id: fromId,
                to_id: toId,
                remarks: 'OK',
                created_by: req.user.id,
                created_on: new Date()
            })
            if (workflowlog != null) {
                const result = await Application.update({
                    status_id: status.id,
                    updated_by: req.user.id,
                    updated_on: new Date()
                }, {
                    where: {
                        id: appId,
                        status_id: AppConstants.DRAFT
                    }
                })
                // const payload = await commonServices.apiForOrtpsa(appId);
                // commonServices.send_to_ortpsa_insert(payload);
                //    LOG.info('ORTPSA Insert Response', ortpsaResponse);
                // await commonServices.send_to_ortpsa_insert(payload);
                data.message = 'SUCCESS';
                data.data = result;
                console.log('application ID-------->', appId);

                const payload1 = await commonServices.apiForOrtpsa(appId);
                console.log("payload1-----", payload1);
                const apiResponse = await commonServices.send_to_ortpsa_insert(payload1);
                console.log('apiResponse-----', apiResponse);
            }
        }
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//getAllApplication
const getAllApplication = async (req) => {
    LOG.info('Inside UacServiceImpl getAllApplication');
    let query = req.query;
    let { status } = req.params;
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    console.log(status);
    try {
        var rowsVal = null;
        var rowsCount = null;
        if (req.role.id == 2 || req.role.id == 4 || req.role.id == 5 || req.role.id == 1) {
            if (status === 'null' ? false : status !== null) {
                const { count, rows, result } = await Application.findAndCountAll({
                    offset: query.skip,
                    limit: query.limit,
                    order: [
                        ["created_on", "DESC"]
                    ],
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
                    attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                    where: {
                        status_id: {
                            [Op.ne]: AppConstants.DRAFT,
                        },
                        ce_name: {
                            [Op.like]: '%' + status + '%'
                        }
                    },
                    raw: true
                });
                rowsVal = rows;
                rowsCount = count;
            } else {
                const { count, rows, result } = await Application.findAndCountAll({
                    offset: query.skip,
                    limit: query.limit,
                    order: [
                        ["created_on", "DESC"]
                    ],
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
                    attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                    where: {
                        status_id: {
                            [Op.ne]: AppConstants.DRAFT,
                        }
                    },
                    raw: true
                });
                rowsVal = rows;
                rowsCount = count;
            }
        } else if (req.role.id == 3) {
            const { count, rows, result } = await Application.findAndCountAll({
                offset: query.skip,
                limit: query.limit,
                order: [
                    ["created_on", "DESC"]
                ],
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
                attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                where: {
                    created_by: req.user.id
                },
                raw: true
            });
            rowsVal = rows;
            rowsCount = count;
        } else {
            const { count, rows, result } = await WorkflowExecutionLog.findAndCountAll({
                offset: query.skip,
                limit: query.limit,
                order: [
                    ["created_on", "ASC"]
                ],
                attributes: ['id', 'obj_id', 'to_id', 'wf_id', 'created_on'],
                where: {
                    to_id: req.user.id
                },
                raw: true
            });
            var arr = new Array();
            if (rows != null) {
                rows.forEach((e2) => {
                    arr.push(e2.obj_id);
                })
            }
            if (status === 'null' ? false : status !== null) {
                const results = await Application.findAll({
                    order: [
                        ["created_on", "DESC"]
                    ],
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
                    attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                    where: {
                        id: arr,
                        status_id: {
                            [Op.ne]: AppConstants.DRAFT
                        },
                        name: {
                            [Op.like]: '%' + status + '%'
                        }
                    },
                    raw: true
                },);
                rowsVal = results;
                rowsCount = count;
            } else {
                const results = await Application.findAll({
                    order: [
                        ["created_on", "DESC"]
                    ],
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
                    attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                    where: {
                        id: arr,
                        status_id: {
                            [Op.ne]: AppConstants.DRAFT
                        }
                    },
                    raw: true
                },);
                rowsVal = results;
                rowsCount = count;
            }
        }
        LOG.info('rowsVal values ', rowsVal.length);
        if (rowsVal != null) {
            // rowsVal.forEach((item)=>{
            for (var i = 0; i < rowsVal.length; i++) {
                rowsVal[i].isAction = false;
                if (rowsVal[i].status_name === 'DRAFT') {
                    rowsVal[i].isAction = true;
                } else {
                    let log = await WorkflowExecutionLog.findAll({
                        order: [
                            ['created_on', 'DESC']
                        ],
                        attributes: ['id', 'obj_id', 'wf_step_transition_id', 'to_id'],
                        where: {
                            obj_id: rowsVal[i].id
                        },
                        raw: true
                    });
                    if (log.length != 0) {
                        LOG.info('result values ', log[0]);
                        if (rowsVal[i].status_name !== 'REJECTED') {
                            if (log[0].to_id === req.user.id) {
                                rowsVal[i].isAction = true;
                            }
                        } else {
                            if (log[0].to_id === req.user.id) {
                                rowsVal[i].isAction = true;
                            }
                        }
                    }
                }
            }
        }
        data.message = 'SUCCESS';
        data.data = rowsVal;
        data.totalPages = Math.floor((rowsCount / query.limit) + (rowsCount % (query.limit) > 0 ? 1 : 0));
        data.totalElements = rowsCount;
    } catch (err) {
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//getApplicationDataById
const getApplicationDataById = async (req) => {
    LOG.info('Inside FormActionServiceImpl getApplicationDataById');
    let { appId } = req.params;
    let type = req.query.type;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        if (type != undefined) {
            if (type == null) {
                type = 'app'
            }
        } else {
            type = 'app'
        }
        let application = null;
        if (type === 'app') {
            if (req.role.role_name === 'CITIZEN') {
                application = await Application.findOne({
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
                    }],
                    attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount', 'industrial_percent', 'bulk_percent'],
                    where: {
                        id: appId,
                        created_by: req.user.id,
                    },
                    raw: true
                });
            } else {
                application = await Application.findOne({
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
                    }],
                    attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount', 'industrial_percent', 'bulk_percent'],
                    where: {
                        id: appId
                    },
                    raw: true
                });
            }
        } else {
            application = await Application.findAll({
                order: [
                    ["created_on", "DESC"]
                ],
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
                }],
                attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount', 'industrial_percent', 'bulk_percent'],
                where: {
                    status_id: AppConstants.COMPLETED,
                    created_by: req.user.id,
                    industries_id: appId
                },
                raw: true
            });
            if (application.length != 0) {
                application = application[0];
            } else {
                application = null;
            }
        }
        if (application == null) {
            LOG.error('Application id is invalid..')
            data.message = "Application id is invalid..";
            data.status = 'INVALID';
        }
        let indeustriesdetails = null;
        if (data.status != 'INVALID') {
            indeustriesdetails = await IndustryDeatils.findOne({
                include: [{
                    model: District,
                    as: 'District',
                    attributes: [],
                }, {
                    model: Block,
                    as: 'Block',
                    attributes: [],
                }, {
                    model: Industry,
                    as: 'Industry',
                    attributes: [],
                }],
                attributes: ['id', 'pan_no', 'others', 'address', 'pin_code', 'industry_id', 'Industry.industry_name', 'district_id', 'District.district_name', 'block_id', 'Block.block_name'],
                where: {
                    application_id: application.id
                },
                raw: true
            });
        }
        let capacity = null;
        if (data.status != 'INVALID') {
            capacity = await Capacity.findOne({
                attributes: ['id', 'present_capacity_in_kld', 'future_capacity_in_kld', 'present_capacity_unit', 'future_capacity_unit'],
                where: {
                    application_id: application.id
                },
                raw: true
            });
        }
        let location = null;
        if (data.status != 'INVALID') {
            location = await LocationDetails.findOne({
                attributes: ['id', 'intake_loc', 'industry_loc', 'recomend_letter', 'mou_signed', 'intake_latitude', 'intake_longitude', 'industry_latitude', 'industry_longitude'],
                where: {
                    application_id: application.id
                },
                raw: true
            });
        }
        let waterRequisition = null;
        if (data.status != 'INVALID') {
            waterRequisition = await WaterRequisirion.findOne({
                include: [{
                    model: OperationalSource,
                    as: 'OperationalSource',
                    attributes: [],
                }],
                attributes: ['id', 'dam_id', 'river_id', 'op_quantity', 'certificate', 'cal_of_quantity', 'operational_source_id', 'OperationalSource.operational_source', 'op_quantity_sur', 'cgwa_certificate', 'joint_report', 'source_id', 'source_dam_id', 'source_river_id'],
                where: {
                    application_id: application.id
                },
                raw: true
            });
        } else {
            const totalCount = await cpool.query(`select a.SerialNo, a.Source_CD, a.Purpose_CD, a.Allocation_Qty as op_quantity, a.Industry_Code,b.River_Nalla as river_id,b.Dam as dam_id from allocation a 
            inner join mst_industry_details c on a.Industry_Code = c.industry_code
            inner join allocation_detail b on a.Allocation_Code = b.Allocation_CD
            where c.serial_no = ${appId} and a.Allocation_Status='Active' order by SerialNo desc `);

            if (totalCount !== null) {
                let dataCount = totalCount.recordset;
                if (dataCount.length !== 0) {
                    waterRequisition = dataCount;
                } else {
                    data.message = "INVALID";
                }
            }
        }
        let phaseWise = null;
        if (data.status != 'INVALID') {
            phaseWise = await PhaseWise.findAll({
                attributes: ['id', 'from_date', 'to_date', 'unit', 'cgwa_certificate'],
                where: {
                    application_id: application.id
                },
                raw: true
            });
        }
        let waterMgmt = null;
        if (data.status != 'INVALID') {
            waterMgmt = await WaterManagement.findOne({
                attributes: ['id', 'layout_drawal', 'disposal_method', 'drawal_water', 'water_mgmt', 'allocation_order', 'industry_details'],
                where: {
                    application_id: application.id
                },
                raw: true
            });
        }
        if (data.status != 'INVALID') {
            data.message = 'SUCCESS';
            data.data = {
                applicationDetails: application,
                industriesDetails: indeustriesdetails,
                capacities: capacity,
                locationDetails: location,
                waterReq: waterRequisition,
                phaseReq: phaseWise,
                watermgmt: waterMgmt,
            }
        } else if (data.message !== 'INVALID') {
            data.status = 'SUCCESS';
            data.message = 'SUCCESS';
            data.data = {
                waterReq: waterRequisition,
            }
        } else {
            data.status = 'INVALID';
            data.message = 'No Data Exist';
            data.data = []
        }
    } catch (err) {
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//getApplicationDataForTrack
const getApplicationDataForTrack = async (req) => {
    LOG.info('Inside FormActionServiceImpl getApplicationDataForTrack');
    let { appId } = req.params;
    console.log(appId)
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        let application = await WorkflowExecutionLog.findAll({
            attributes: ['id', 'obj_id', 'wf_id', 'allocation_file', 'remarks', 'wf_step_id', 'wf_step_transition_id', 'from_id', 'to_id', 'created_on', 'wac_date'],
            order: [
                ['created_on', "ASC"]
            ],
            where: {
                obj_id: appId
            },
            raw: true
        });
        if (application.length == 0) {
            LOG.error('Application id is invalid..')
            data.status = 'INVALID';
        }
        if (application != null) {
            for (var i = 0; i < application.length; i++) {
                let workFlowStep = await WorkFlowStep.findOne({
                    attributes: ['id', 'step_name'],
                    where: {
                        id: application[i].wf_step_id
                    },
                    raw: true
                })
                if (workFlowStep != null) {
                    application[i].workFlowName = workFlowStep.step_name;
                }
                let workFlowStepTrans = await WorkFlowStepTransition.findOne({
                    attributes: ['id', 'transition_desc'],
                    where: {
                        id: application[i].wf_step_transition_id
                    },
                    raw: true
                })
                if (workFlowStepTrans != null) {
                    application[i].workFlowStepName = workFlowStepTrans.transition_desc;
                }
                let user = await User.findOne({
                    attributes: ['id', 'user_name', 'role_id'],
                    where: {
                        id: application[i].from_id
                    },
                    raw: true
                })

                if (user != null) {
                    application[i].userName = user.user_name;
                    let role = await Role.findOne({
                        attributes: ['id', 'role_name'],
                        where: {
                            id: user.role_id
                        },
                        raw: true
                    })
                    if (role != null) {
                        application[i].roleId = role.id,
                            application[i].roleName = role.role_name
                    }
                } else {
                    application[i].roleId = 0,
                        application[i].roleName = 'COMPLETED';
                }

                let userTo = await User.findOne({
                    attributes: ['id', 'user_name', 'role_id'],
                    where: {
                        id: application[i].to_id
                    },
                    raw: true
                })

                if (userTo != null) {
                    application[i].userToName = userTo.user_name;
                    let role = await Role.findOne({
                        attributes: ['id', 'role_name'],
                        where: {
                            id: userTo.role_id
                        },
                        raw: true
                    })
                    if (role != null) {
                        application[i].roleToId = role.id,
                            application[i].roleToName = role.role_name
                    }
                }

                if (i == (application.length - 1)) {
                    application[i].currentStatus = true;
                } else {
                    application[i].currentStatus = false;
                }
            }
        }
        data.message = 'SUCCESS';
        data.data = application
    } catch (err) {
        data.status = 'FAILURE';
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//nextStep
const nextStep = async (req) => {
    LOG.info('Inside FormActionServiceImpl nextStep');
    let appId = req.query.applicationId;
    let skipRules = req.query.skipRules;
    let raiseQueryCount = 0;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        let app = await Application.findOne({
            attributes: ['id', 'allocation_type_id', 'purpose_id'],
            where: {
                id: appId
            },
            raw: true
        })
        let application = await WorkflowExecutionLog.findAll({
            attributes: ['id', 'obj_id', 'wf_id', 'wf_step_id', 'wf_step_transition_id', 'from_id', 'to_id', 'created_on'],
            order: [
                ['created_on', "DESC"]
            ],
            where: {
                obj_id: appId
            },
            raw: true
        });
        if (application.length == 0) {
            LOG.error('Application id is invalid..')
            data.status = 'INVALID';
        } else {
            if (req.role.id === 4) {
                if (application != null) {
                    application.forEach((e2) => {
                        if ((application[application.length - 1].from_id == e2.to_id) && (e2.from_id == 9)) {
                            raiseQueryCount = raiseQueryCount + 1;
                        }
                    })
                }
            }
            application = application[0];
            if (application != null) {
                let workFlowStepTrans = await WorkFlowStepTransition.findOne({
                    include: [{
                        model: WorkFlowStep,
                        as: 'WorkFlowStep',
                        attributes: [],
                    }],
                    attributes: ['id', 'transition_desc', 'step_end_flag', 'work_flow_step_id', 'WorkFlowStep.order_sl'],
                    where: {
                        id: application.wf_step_transition_id
                    },
                    raw: true
                })
                let userId = null;
                if (req.role.id === 6) {
                    userId = '$EE_ID';
                } else if (req.role.id === 9) {
                    userId = '$CEGW_ID';
                } else if (req.role.id === 7) {
                    userId = '$CE_ID';
                } else {
                    userId = req.user.id;
                }
                if (workFlowStepTrans.step_end_flag) {
                    let workFlowStep = await WorkFlowStep.findOne({
                        attributes: ['id', 'step_name'],
                        where: {
                            wf_id: application.wf_id,
                            order_sl: (workFlowStepTrans.order_sl + 1)
                        },
                        raw: true
                    })
                    if (workFlowStep != null) {
                        workFlowStep.isDate = false;
                        console.log(app.allocation_type_id);
                        console.log(workFlowStep.step_name);
                        console.log(req.user.id);
                        if (app.allocation_type_id === 1 && workFlowStep.step_name === 'DIRECTOR_APPROVAL' && req.user.id === '10') {
                            workFlowStep.isDate = true;
                        } else if (app.allocation_type_id !== 1 && workFlowStep.step_name !== 'DIRECTOR_APPROVAL' && req.user.id === '10') {
                            workFlowStep.isDate = true;
                        }
                        application.steps = workFlowStep;
                    }
                    workFlowStepTrans = await WorkFlowStepTransition.findAll({
                        attributes: ['id', 'transition_desc', 'step_end_flag', 'work_flow_step_id', 'wf_step_to_id'],
                        where: {
                            work_flow_step_id: (workFlowStep.id),
                            wf_step_from_id: userId
                        },
                        raw: true
                    })
                    if (workFlowStepTrans != null) {
                        application.steps.trans = workFlowStepTrans;
                    }
                } else {
                    let workFlowStep = await WorkFlowStep.findOne({
                        attributes: ['id', 'step_name'],
                        where: {
                            id: (application.wf_step_id)
                        },
                        raw: true
                    })
                    if (workFlowStep != null) {
                        workFlowStep.isDate = false;
                        if (app.allocation_type_id === 1 && workFlowStep.step_name === 'DIRECTOR_APPROVAL' && req.user.id === '10') {
                            workFlowStep.isDate = true;
                        } else if (app.allocation_type_id !== 1 && workFlowStep.step_name !== 'DIRECTOR_APPROVAL' && req.user.id === '10') {
                            workFlowStep.isDate = true;
                        }
                        application.steps = workFlowStep;
                    }
                    if (raiseQueryCount == 2) {
                        workFlowStepTrans = await WorkFlowStepTransition.findAll({
                            attributes: ['id', 'transition_desc', 'step_end_flag', 'work_flow_step_id', 'wf_step_to_id'],
                            where: {
                                work_flow_step_id: (workFlowStepTrans.work_flow_step_id),
                                id: {
                                    [Op.ne]: application.wf_step_transition_id
                                },
                                transition_type_id: {
                                    [Op.ne]: AppConstants.RAISE_QUERY
                                },
                                wf_step_from_id: req.user.id
                            },
                            raw: true
                        })
                    } else {
                        workFlowStepTrans = await WorkFlowStepTransition.findAll({
                            attributes: ['id', 'transition_desc', 'step_end_flag', 'work_flow_step_id', 'wf_step_to_id'],
                            where: {
                                work_flow_step_id: (workFlowStepTrans.work_flow_step_id),
                                id: {
                                    [Op.ne]: application.wf_step_transition_id
                                },
                                wf_step_from_id: userId
                            },
                            raw: true
                        })
                    }
                    if (workFlowStepTrans != null) {
                        application.steps.trans = workFlowStepTrans;
                        if (req.role.id == 4) {
                            application.raiseQueryCount = raiseQueryCount;
                        }
                    }
                }
            }
        }
        data.message = 'SUCCESS';
        data.data = application
    } catch (err) {
        data.status = 'FAILURE';
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//actionTaken
const actionTaken = async (req) => {
    console.log(req.body, '000000')
    LOG.info('Inside FormActionServiceImpl actionTaken');
    let appId = req.body.appId;
    console.log(appId, req.body, 'appId action taken ===============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        let application = await Application.findOne({
            attributes: ['id', 'app_type', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'purpose_id', 'created_by', 'industries_id', 'allocation_type_id', 'purpose_id'],
            where: {
                id: appId,
                status_id: AppConstants.PENDING
            },
            raw: true
        });
        if (application == null) {
            LOG.error('Application id is invalid..')
            data.status = 'INVALID';
        } else {
            //console.log('else 1 ==========================>>>>>>>>>>')
            let workFlowStep = await WorkFlowStep.findOne({
                attributes: ['id', 'step_name', 'step_desc'],
                where: {
                    id: req.body.stId
                },
                raw: true
            })
            let workflowsteptrans = null;
            let toId = null;
            if (req.body.toId === '$CZ_ID') {
                //console.log(req.body.toId,'if CZ_ID ==========================>>>>>>>>>>')
                toId = application.created_by;
            } else if (req.body.toId === '$CEGW_ID') {
                let cegwUser = await User.findOne({
                    attributes: ['id'],
                    where: {
                        role_id: 9
                    },
                    raw: true
                });
                toId = cegwUser ? cegwUser.id : null;
            } else {
                toId = req.body.toId;
            }

            if (workFlowStep != null) {
                //console.log('if workFlowStep 1 ==========================>>>>>>>>>>')
                workflowsteptrans = await WorkFlowStepTransition.findOne({
                    attributes: ['id', 'work_flow_step_id', 'transition_type_id', 'step_end_flag', 'transition_desc'],
                    where: {
                        id: req.body.trId
                    },
                    raw: true
                })
            }
            let workflowlog = null;
            let result = null;
            if (toId === 'null' || toId === '0' || toId === 0) {
                toId = null;
            }
            if (workFlowStep != null && workflowsteptrans != null) {
                //console.log('workFlowStep != null && workflowsteptrans != null  ==========================>>>>>>>>>>')
                if (workflowsteptrans.transition_desc === 'REJECT') {
                    result = await Application.update({
                        status_id: AppConstants.REJECTED,
                        work_flow_step_transiton_type_mst_id: workflowsteptrans.transition_type_id,
                        status_remarks: workflowsteptrans.transition_desc
                    }, {
                        where: { id: appId }
                    })
                }

                // console.log(workflowsteptrans, workflowsteptrans.transition_desc , 'workflowsteptrans.transition_desc--------------------------');

                // console.log(workflowsteptrans.transition_desc === 'ISSUE_ALLOCATION_ORDER', req.role.id === 4  ,  req.body.toId === '$CZ_ID','check kara ===========>');

                if (workflowsteptrans.transition_desc === 'ISSUE_ALLOCATION_ORDER' && req.role.id === 4 && req.body.toId === '$CZ_ID') {
                    //console.log('application flow completed and approved ==============================================>>>>>>>>>>>>>>>>>>>>>')
                    result = await Application.update({
                        status_id: AppConstants.COMPLETED,
                        work_flow_step_transiton_type_mst_id: workflowsteptrans.transition_type_id,
                        status_remarks: workflowsteptrans.transition_desc
                    }, {
                        where: { id: appId }
                    })
                }
                // if (workflowsteptrans.transition_desc === 'APPROVE' &&  req.body.toId === '9' && req.body.toId === '$CZ_ID') {
                //     result = await Application.update({
                //         status_id: AppConstants.COMPLETED,
                //         work_flow_step_transiton_type_mst_id: workflowsteptrans.transition_type_id,
                //         status_remarks: workflowsteptrans.transition_desc
                //     }, {
                //         where: { id: appId }
                //     })
                // }
                if (req.role.id === 4 && (toId === 'null' ? true : (toId === null))) {
                    var status = await Status.findOne({
                        where: {
                            id: AppConstants.COMPLETED
                        },
                        raw: true
                    })
                    let log = await WorkflowExecutionLog.findAll({
                        attributes: ['id', 'obj_id', 'wf_id', 'wf_step_id', 'wf_step_transition_id', 'from_id', 'to_id', 'created_on'],
                        order: [
                            ['created_on', "DESC"]
                        ],
                        where: {
                            obj_id: appId
                        },
                        raw: true
                    });
                    let EE_Name = null;
                    var arr = new Array();
                    if (log != null) {
                        log.forEach((e2) => {
                            arr.push(e2.to_id);
                        })
                    }
                    if (log.length != 0) {
                        let users = await User.findAll({
                            attributes: ['id', 'user_name', 'role_id'],
                            where: {
                                id: arr,
                                role_id: AppConstants.EE
                            },
                        })
                        if (users.length !== 0) {
                            EE_Name = users[0].user_name
                        }
                    }
                    result = await Application.update({
                        work_flow_step_transiton_type_mst_id: workflowsteptrans.transition_type_id,
                        status_remarks: workflowsteptrans.transition_desc,
                        status_id: status.id
                    }, {
                        where: { id: appId }
                    })
                    if (result[0] === 1) {
                        if (application.industries_id === null || application.industries_id === 0) {
                            let indeustriesdetails = await IndustryDeatils.findOne({
                                attributes: ['id', 'pan_no', 'address', 'pin_code'],
                                where: {
                                    application_id: application.id
                                },
                                raw: true
                            });
                            if (indeustriesdetails != null) {
                                var maxIndId = await IndustryDetailsMst.max('serial_no');
                                maxIndId = isNaN(maxIndId) ? 1 : maxIndId + 1
                                let appcode = null;
                                if (maxIndId > 9999) {
                                    appcode = 'INDWAT' + maxIndId;
                                } else {
                                    appcode = 'INDWAT0' + maxIndId;
                                }
                                let statusType = null;
                                if (application !== null) {
                                    if (application.allocation_type_id !== null) {
                                        if (application.allocation_type_id === 1) {
                                            statusType = 'C'
                                        } else {
                                            statusType = 'O'
                                        }
                                    }
                                }
                                let indusType = null;
                                if (application !== null) {
                                    if (application.purpose_id !== null) {
                                        if (application.purpose_id === 1) {
                                            indusType = 'Drinking'
                                        } else if (application.purpose_id === 2) {
                                            indusType = 'Commercial'
                                        } else if (application.purpose_id === 3) {
                                            indusType = 'Industry'
                                        } else if (application.purpose_id === 4) {
                                            indusType = 'Others'
                                        } else if (application.purpose_id === 5) {
                                            indusType = 'Bulk'
                                        } else if (application.purpose_id === 6) {
                                            indusType = 'Both'
                                        }
                                    }
                                }
                                let industries = await IndustryDetailsMst.create({
                                    serial_no: maxIndId,
                                    industry_code: appcode,
                                    industry_name: application.ce_name,
                                    division: EE_Name,
                                    address: indeustriesdetails.address,
                                    pin: indeustriesdetails.pin_code,
                                    ip_address: AppUtils.getClientIp(req),
                                    status: statusType,
                                    type: indusType
                                })
                                if (industries !== null) {
                                    result = await Application.update({
                                        industries_id: industries.serial_no
                                    }, {
                                        where: { id: appId }
                                    })
                                }
                            }
                        }
                    }
                } else {
                    if (toId === 'null' ? true : (toId === null)) {
                        var status = await Status.findOne({
                            where: {
                                id: AppConstants.COMPLETED
                            },
                            raw: true
                        })
                        result = await Application.update({
                            work_flow_step_transiton_type_mst_id: workflowsteptrans.transition_type_id,
                            status_remarks: workflowsteptrans.transition_desc,
                            status_id: status.id
                        }, {
                            where: { id: appId }
                        })
                    } else {
                        result = await Application.update({
                            work_flow_step_transiton_type_mst_id: workflowsteptrans.transition_type_id,
                            status_remarks: workflowsteptrans.transition_desc
                        }, {
                            where: { id: appId }
                        })
                    }
                }
                if (result[0] === 1) {
                    var maxlogId = await WorkflowExecutionLog.max('id');
                    maxlogId = isNaN(maxlogId) ? 1 : maxlogId + 1
                    workflowlog = await WorkflowExecutionLog.create({
                        id: maxlogId,
                        obj_id: application.id,
                        wf_id: req.body.wfId,
                        wf_step_id: workFlowStep.id,
                        wf_step_transition_id: workflowsteptrans.id,
                        from_id: req.user.id,
                        to_id: (toId === 'null' ? null : toId),
                        remarks: req.body.remarks,
                        allocation_file: req.files['allocation_order'] === undefined ? null : (req.files['allocation_order'][0] == undefined ? null : req.files['allocation_order'][0].filename),
                        wac_date: req.body.wacDate,
                        created_by: req.user.id,
                        created_on: new Date(),
                        raise_query: null
                    });
                    // After insertion, check the raise_query value and update as needed
                    if (workflowsteptrans.transition_type_id === 5 && workflowsteptrans.id === 171) {
                        const currentLog = await WorkflowExecutionLog.findOne({
                            attributes: ['id', 'obj_id', 'raise_query'],
                            where: { obj_id: application.id, wf_step_transition_id: 171 },
                            raw: true
                        });
                        console.log(currentLog, "currentLog");

                        let newRaiseQuery;
                        if (currentLog.raise_query == null) {
                            newRaiseQuery = 1;
                        } else if (currentLog.raise_query === 1) {
                            newRaiseQuery = 2;
                        }

                        if (newRaiseQuery) {
                            await WorkflowExecutionLog.update(
                                { raise_query: newRaiseQuery },
                                { where: { id: maxlogId, obj_id: application.id, wf_step_transition_id: 171 } }
                            );
                            console.log(`Updated raise_query to ${newRaiseQuery} for log ID ${application.id}`);
                            // handleRaiseQuery({raise_query:newRaiseQuery,LogID:maxlogId, obj_id: application.id})
                        }
                    }
                }
                console.log(workflowsteptrans.transition_desc, 'workflowsteptrans.transition_desc --------------------------->>>>>>>>>>>>>>>>>>>>');
                if (workflowsteptrans.transition_desc === 'REJECT' || workflowsteptrans.transition_desc === 'ISSUE_ALLOCATION_ORDER' || workflowsteptrans.transition_desc === 'COMPLETED' || workflowsteptrans.transition_desc === 'APPROVE') {
                    //console.log('workflowsteptrans.transition_desc',workflowsteptrans.transition_desc);
                    // Update the workflow step status to 'COMPLETED' if the transition is 'COMPLETED'
                    const payload = await commonServices.apiForOrtpsa(appId);
                    console.log(payload, "payload1");
                    await commonServices.send_to_ortpsa_update(payload);
                }
            }
        }
        data.message = 'SUCCESS';
        data.data = [];
    } catch (err) {
        data.status = 'FAILURE';
        LOG.error("SQL error!!!", err);
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};
function parseSqlDate(value) {
    if (!value || value === '') return null;

    const date = new Date(value);
    if (isNaN(date.getTime())) return null;

    return date;
}

const formEdit = async (req) => {
    //console.log('Infojshdfghjsdgfhsgdfjsgdjfgsjdgfsdgfhjsdgfjgsdjfgdsgf');
    //LOG.info('Inside FormActionService formEdit');
    let phaseWiseReq = JSON.parse(req.body.phaseReq);
    //console.log(req.body,"data body");
    let reqData = req.body;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        //Application Details Save Here
        var status = await Status.findOne({
            where: {
                id: AppConstants.DRAFT
            },
            raw: true
        })

        var purpose = await Purpose.findOne({
            where: {
                id: reqData.purpose
            },
            raw: true
        })

        var application = await AllocationType.findOne({
            where: {
                id: reqData.appFor
            },
            raw: true
        })
        let operat = 0;
        if (reqData.quanIntended != 0) {
            operat = reqData.quanIntended
        } else {
            operat = reqData.surfaceId
        }
        var operationalSource = await OperationalSource.findOne({
            where: {
                id: operat
            },
            raw: true
        })

        let sour = 0;
        if (reqData.opQuant != 0) {
            sour = parseInt(reqData.opQuant);
        } else {
            sour = parseInt(reqData.opQuantSur);
        }
        let value = appcode(application, operationalSource, sour);
        var applicationType = await ApplicationTypeMst.findOne({
            where: {
                application_type_desc: value
            },
            raw: true
        })
        let transTypeMst = await WorkFlowStepTransitonTypeMst.findOne({
            where: {
                id: AppConstants.RE_SUBMIT
            },
            raw: true
        })

        const app = await Application.findOne({
            attributes: ['id', 'cur_aloc_order', 'renewal_recom', 'payment_doc'],
            where: {
                id: req.body.applicationId
            }
        });

        if (purpose == null || application == null || applicationType == null || app === null) {
            //LOG.error("Purpose Id or allocation type id or application type id is not valid..." + purpose);
            data.status = 'INVALID';
            data.message = 'Purpose Id or allocation type id or application type id is not valid';
            data.data = purpose;
        } else {
            const result = await Application.update({
                app_type: reqData.appType,
                name: reqData.name,
                email: reqData.email,
                mob: reqData.mobile,
                ce_name: reqData.ceName,
                purpose_id: purpose.id,
                application_type_id: applicationType.id,
                allocation_type_id: application.id,
                status_id: status.id,
                others: reqData.indOters,
                work_flow_step_transiton_type_mst_id: transTypeMst.id,
                status_remarks: 'form re_submitted by citizen',
                updated_by: req.user.id,
                app_for: reqData.appExtFor,
                cur_alocation_qt: reqData.curAllocationQt,
                cur_alocation_qt_cusec: (reqData.curAllocationQt / 2500),
                paid_amount: Number(reqData.paidAmount).toFixed(0),
                cur_aloc_order: req.files['allocation'] == undefined ? app.cur_aloc_order : (req.files['allocation'][0] == undefined ? null : req.files['allocation'][0].filename),
                renewal_recom: req.files['renewal'] == undefined ? app.renewal_recom : (req.files['renewal'][0] == undefined ? null : req.files['renewal'][0].filename),
                payment_doc: req.files['paymentDoc'] == undefined ? app.payment_doc : (req.files['paymentDoc'][0] == undefined ? null : req.files['paymentDoc'][0].filename),
                updated_on: new Date(),
                industrial_percent: reqData.industryPercent,
                bulk_percent: reqData.bulkPrecent
            }, {
                where: {
                    id: req.body.applicationId
                }
            });
            data.data = result;
            //console.log(reqData.paidAmount);
            //LOG.error('Application ', result)
        }
        //Industry Details Save Here
        var industry = await Industry.findOne({
            where: {
                id: reqData.indType
            },
            raw: true
        })

        var district = await District.findOne({
            where: {
                id: reqData.distId
            },
            raw: true
        })

        var block = await Block.findOne({
            where: {
                id: reqData.blockId
            },
            raw: true
        })

        if (industry == null || district == null || block == null) {
            //LOG.error("Industry Type Id or district id or block id is not valid..." + purpose);
            data.status = 'INVALID';
            data.message = 'Industry Type Id or district id or block id is not valid';
            data.data = purpose;
        } else {
            const industryDetails = await IndustryDeatils.update({
                industry_id: industry.id,
                pan_no: reqData.panNo,
                address: reqData.address,
                pin_code: reqData.pinCode,
                others: reqData.indOters,
                district_id: district.id,
                block_id: block.id,
                updated_by: req.user.id,
                updated_on: new Date()
            }, {
                where: {
                    application_id: req.body.applicationId
                }
            });
        }
        //Capacity Details Save Here
        if (data.status != 'INVALID') {
            const capacity = await Capacity.update({
                present_capacity_in_kld: reqData.presentCap,
                present_capacity_unit: reqData.presentUnit,
                future_capacity_in_kld: reqData.futureCap,
                future_capacity_unit: reqData.futureUnit,
                updated_by: req.user.id,
                updated_on: new Date()
            }, {
                where: {
                    application_id: req.body.applicationId
                }
            });
        }

        //Location Details Save Here
        let dam = null;
        if (reqData.riverId === 'null') {
            reqData.riverId = null
        }
        if (reqData.damId === 'null') {
            reqData.damId = null
        }
        if (reqData.damId != 0 || reqData.damId != null) {
            dam = await Dam.findOne({
                where: {
                    id: reqData.damId
                },
                raw: true
            })
        }
        let river = null;
        if (reqData.riverId != 0 || reqData.riverId != null) {
            river = await River.findOne({
                where: {
                    id: reqData.riverId
                },
                raw: true
            })
        }

        if (data.status != 'INVALID') {
            if (operationalSource == null) {
                //LOG.error("Operational Source id is not valid..." + purpose);
                data.status = 'INVALID';
                data.message = 'Operational Source id is not valid';
                data.data = purpose;
            } else {
                const loc = await LocationDetails.findOne({
                    attributes: ['id', 'intake_loc', 'industry_loc', 'recomend_letter', 'mou_signed'],
                    where: {
                        application_id: req.body.applicationId
                    }
                });
                const location = await LocationDetails.update({
                    intake_loc: req.files['intake'] == undefined ? loc.intake_loc : (req.files['intake'][0] == undefined ? null : req.files['intake'][0].filename),
                    industry_loc: req.files['industry'] == undefined ? loc.industry_loc : (req.files['industry'][0] == undefined ? null : req.files['industry'][0].filename),
                    recomend_letter: req.files['recomendation'] == undefined ? loc.recomend_letter : (req.files['recomendation'][0] == undefined ? null : req.files['recomendation'][0].filename),
                    mou_signed: req.files['mou'] == undefined ? loc.mou_signed : (req.files['mou'][0] == undefined ? null : req.files['mou'][0].filename),
                    intake_latitude: reqData.latitude,
                    intake_longitude: reqData.longtitude,
                    industry_latitude: reqData.industryLatitude,
                    industry_longitude: reqData.industryLongtitude,
                    updated_by: req.user.id,
                    updated_on: new Date()
                }, {
                    where: {
                        application_id: req.body.applicationId
                    }
                });
            }
        }

        //Requision of water Details Save Here
        if (data.status != 'INVALID') {
            if (operationalSource == null) {
                //LOG.error("Operational Source id is not valid..." + purpose);
                data.status = 'INVALID';
                data.message = 'Operational Source id is not valid';
                data.data = purpose;
            } else {
                const waterReq = await WaterRequisirion.findOne({
                    attributes: ['id', 'op_quantity', 'certificate', 'cal_of_quantity', 'joint_report', 'cgwa_certificate'],
                    where: {
                        application_id: req.body.applicationId
                    }
                });
                const waterRequisition = await WaterRequisirion.update({
                    op_quantity: reqData.opQuant,
                    op_quantity_in_cusec: (reqData.opQuant / 2500),
                    certificate: req.files['certificate'] == undefined ? waterReq.certificate : (req.files['certificate'][0] == undefined ? null : req.files['certificate'][0].filename),
                    cal_of_quantity: req.files['quantity'] == undefined ? waterReq.cal_of_quantity : (req.files['quantity'][0] == undefined ? null : req.files['quantity'][0].filename),
                    joint_report: req.files['jointReport'] == undefined ? (waterReq.joint_report === null ? null : waterReq.joint_report) : (req.files['jointReport'][0] == undefined ? null : req.files['jointReport'][0].filename),
                    operational_source_id: operationalSource.id,
                    dam_id: dam == null ? 0 : dam.id,
                    river_id: river == null ? 0 : river.id,
                    op_quantity_sur: reqData.opQuantSur,
                    op_quantity_sur_in_cusec: (reqData.curAllocationQt / 2500),
                    cgwa_certificate: req.files['cgwaCertificate'] == undefined ? waterReq.cgwa_certificate : (req.files['cgwaCertificate'][0] == undefined ? null : req.files['cgwaCertificate'][0].filename),
                    source_id: reqData.surfaceId,
                    source_dam_id: reqData.sourceDamId,
                    source_river_id: reqData.sourceRiverId,
                    updated_by: req.user.id,
                    updated_on: new Date()
                }, {
                    where: {
                        application_id: req.body.applicationId
                    }
                });
            }
        }
        //Phase Wise Requirment Details Save Here
        if (data.status != 'INVALID') {
            let phase = null;
            let filename = null;
            if (phaseWiseReq.length !== 0) {
                phase = await PhaseWise.findOne({
                    attributes: ['id', 'cgwa_certificate'],
                    where: {
                        id: phaseWiseReq[0].id
                    }
                });
            }
            if (phase !== null) {
                filename = phase.cgwa_certificate;
            }
            for (var i = 0; i < phaseWiseReq.length; i++) {
                const phaseWise = await PhaseWise.update({
                    // from_date: (phaseWiseReq[i].from_date == '' || phaseWiseReq[i].from_date == null) ? null : new Date(phaseWiseReq[i].from_date),
                    // to_date: (phaseWiseReq[i].to_date == '' || phaseWiseReq[i].to_date == null) ? null : new Date(phaseWiseReq[i].to_date),
                    from_date: (phaseWiseReq[i].from_date == '' || phaseWiseReq[i].from_date == null) ? null : parseSqlDate(phaseWiseReq[i].from_date),
                    to_date: (phaseWiseReq[i].to_date == '' || phaseWiseReq[i].to_date == null) ? null : parseSqlDate(phaseWiseReq[i].to_date),
                    // from_date: phaseWiseReq[i].from_date
                    //     ? new Date(phaseWiseReq[i].from_date)
                    //     : null,
                    // to_date: phaseWiseReq[i].to_date
                    //     ? new Date(phaseWiseReq[i].to_date)
                    //     : null,
                    unit: phaseWiseReq[i].unit,
                    unit_in_cusec: parseFloat(phaseWiseReq[i].unit / 2500),
                    is_deleted: phaseWiseReq[i].status == null ? false : phaseWiseReq[i].status,
                    cgwa_certificate: req.files['cgwa'] == undefined ? filename : (req.files['cgwa'][0] == undefined ? null : req.files['cgwa'][0].filename),
                    updated_by: req.user.id,
                    updated_on: new Date()
                }, {
                    where: {
                        id: phaseWiseReq[i].id
                    }
                });
            }
        }
        //Water Mgmt Plan Save Here
        if (data.status != 'INVALID') {
            const waterMgmt = await WaterManagement.findOne({
                attributes: ['id', 'layout_drawal', 'disposal_method', 'drawal_water', 'water_mgmt', 'allocation_order', 'industry_details'],
                where: {
                    application_id: req.body.applicationId
                }
            });
            const water = await WaterManagement.update({
                layout_drawal: req.files['layout'] == undefined ? waterMgmt.layout_drawal : (req.files['layout'][0] == undefined ? null : req.files['layout'][0].filename),
                disposal_method: req.files['disposal'] == undefined ? waterMgmt.disposal_method : (req.files['disposal'][0] == undefined ? null : req.files['disposal'][0].filename),
                drawal_water: req.files['scheme'] == undefined ? waterMgmt.drawal_water : (req.files['scheme'][0] == undefined ? null : req.files['scheme'][0].filename),
                water_mgmt: req.files['waterMgmt'] == undefined ? waterMgmt.water_mgmt : (req.files['waterMgmt'][0] == undefined ? null : req.files['waterMgmt'][0].filename),
                allocation_order: req.files['allocationOrder'] == undefined ? waterMgmt.allocation_order : (req.files['allocationOrder'][0] == undefined ? null : req.files['allocationOrder'][0].filename),
                industry_details: req.files['indDetails'] == undefined ? (waterMgmt === null ? null : waterMgmt.industry_details) : (req.files['indDetails'][0] == undefined ? null : req.files['indDetails'][0].filename),
                updated_by: req.user.id,
                updated_on: new Date()
            }, {
                where: {
                    application_id: req.body.applicationId
                }
            });
        }
        if (data.status != 'INVALID') {
            data.message = 'Form Updated Successfully.....';
        }
    } catch (err) {
        //LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    //LOG.debug(data);
    return data;
};




// --------------------------------aratifix code-------------------------------------------



//getAllApplicationById


const getAllApplicationById = async (req) => {
    LOG.info('Inside UacServiceImpl getAllApplicationById');
    let query = req.query;
    let { id } = req.params;
    let type = req.query.type;
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    try {
        var rowsVal = null;
        var rowsCount = null;
        if (req.role.id == 2 || req.role.id == 4 || req.role.id == 5 || req.role.id == 1) {
            if (type === 'EE') {
                const ind = await IndustryDetailsMst.findOne({
                    attributes: ['serial_no', 'division'],
                    where: {
                        division: id
                    },
                    raw: true
                })
                if (ind !== null) {
                    const { count, rows, result } = await Application.findAndCountAll({
                        offset: query.skip,
                        limit: query.limit,
                        order: [
                            ["created_on", "ASC"]
                        ],
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
                        attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                        where: {
                            industries_id: ind.serial_no,
                            status_id: {
                                [Op.ne]: 4
                            }
                        },
                        raw: true
                    });
                    rowsVal = rows;
                    rowsCount = count;
                }
            } else if (type === 'Basin') {
                let river = await River.findAll({
                    attributes: ['id', 'river_name'],
                    where: {
                        basin_id: id
                    },
                    raw: true
                })
                var arr = new Array();
                if (river != null) {
                    river.forEach((e2) => {
                        arr.push(e2.id);
                    })
                }
                const { count, rows, result } = await WaterRequisirion.findAndCountAll({
                    attributes: ['id', 'application_id'],
                    where: {
                        river_id: arr
                    },
                    raw: true
                })
                arr = new Array();
                if (rows != null) {
                    rows.forEach((e2) => {
                        arr.push(e2.application_id);
                    })
                }
                if (arr !== null) {
                    const result = await Application.findAll({
                        offset: query.skip,
                        limit: query.limit,
                        order: [
                            ["created_on", "ASC"]
                        ],
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
                        attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'Status.status_name', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount'],
                        where: {
                            id: arr,
                            status_id: {
                                [Op.ne]: 4
                            }
                        },
                        raw: true
                    });
                    rowsVal = result;
                    rowsCount = count;
                }
            }
        }
        LOG.error('rowsVal values ', rowsVal);
        if (rowsVal != null) {
            // rowsVal.forEach((item)=>{
            for (var i = 0; i < rowsVal.length; i++) {
                rowsVal[i].isAction = false;
                let log = await WorkflowExecutionLog.findAll({
                    order: [
                        ['created_on', 'DESC']
                    ],
                    attributes: ['id', 'obj_id', 'wf_step_transition_id', 'to_id'],
                    where: {
                        obj_id: rowsVal[i].id
                    },
                    raw: true
                });
                if (log.length != 0) {
                    LOG.error('result values ', log[0]);
                    if (rowsVal[i].status_name !== 'REJECTED') {
                        if (log[0].to_id === req.user.id) {
                            rowsVal[i].isAction = true;
                        }
                    } else {
                        if (log[0].to_id === req.user.id) {
                            rowsVal[i].isAction = true;
                        }
                    }
                }
            }
        } else {
            rowsVal = [];
        }
        data.message = 'SUCCESS';
        data.data = rowsVal;
        data.totalPages = Math.floor((rowsCount / query.limit) + (rowsCount % (query.limit) > 0 ? 1 : 0));
        data.totalElements = rowsCount;
    } catch (err) {
        LOG.error("SQL error!!!");
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//createBankRequest
const createBankRequest = async (req) => {
    LOG.info('Inside formSubmit createBankRequest');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Bank Details ===> ", req.body);
        if (true) {
            // DO YOUR STUFF
            data.status = 'SUCCESS';
            data.message = 'Test';
        } else if (false) {
            // DO YOUR STUFF
            data.status = 'FAILURE'
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



const getPendingApplicationsForAppealDashboard = async (req) => {
    LOG.info('Inside FormActionServiceImpl getPendingApplicationsForAppealDashboard');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: [],
        counts: {
            totalReceived: 0,
            pending: 0,
            success: 0,
            reject: 0
        }
    };
    try {
        console.log('reqreqreq')
        let applications = await Application.findAll({
            order: [
                ["created_on", "DESC"]
            ],
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
            }],
            attributes: ['id', 'app_type', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount', 'industrial_percent', 'bulk_percent'],
            where: {
                status_id: 3
            },
            raw: true
        });

        // IndustryDeatils has no direct association to Application, and
        // IndustryDeatils.belongsTo(District) has no FK override, so Sequelize
        // expects a 'DistrictId' column that doesn't exist (real column is
        // 'district_id'). Rather than rely on either broken association,
        // fetch district_id directly and resolve District names manually.
        if (applications.length !== 0) {
            const appIds = applications.map(app => app.id);

            const industryDetailsList = await IndustryDeatils.findAll({
                attributes: ['application_id', 'district_id'],
                where: {
                    application_id: appIds
                },
                raw: true
            });

            const districtIds = [...new Set(
                industryDetailsList
                    .map(item => item.district_id)
                    .filter(id => id !== null && id !== undefined)
            )];

            let districtNameById = {};
            if (districtIds.length !== 0) {
                const districts = await District.findAll({
                    attributes: ['id', 'district_name'],
                    where: {
                        id: districtIds
                    },
                    raw: true
                });
                districts.forEach(d => {
                    districtNameById[d.id] = d.district_name;
                });
            }

            // Map application_id -> { district_id, district_name } via IndustryDeatils
            const districtInfoByAppId = {};
            industryDetailsList.forEach(item => {
                districtInfoByAppId[item.application_id] = {
                    district_id: item.district_id || null,
                    district_name: districtNameById[item.district_id] || null
                };
            });

            // ---- Resubmission-aware "current submit date" ----
            // Day-count should restart from the latest citizen-originated row
            // in workflow_execution_log for this application (i.e. the most
            // recent time the app moved FROM a citizen TO any authority).
            // A citizen is any mst_users row with role_id = 3.
            // If an application has never been reverted, this simply
            // resolves to its original submission row, same effect as before.
            const submitDateRequest = cpool.request();
            const submitDateResult = await submitDateRequest.query(`
                SELECT
                    sub.obj_id AS application_id,
                    sub.current_submit_date,
                    ack.latest_acknowledge_date AS acknowledge_date
                FROM (
                    SELECT obj_id, MAX(created_on) AS current_submit_date
                    FROM workflow_execution_log
                    WHERE to_id = 9
                      AND obj_id IN (${appIds.join(',')})
                    GROUP BY obj_id
                ) sub
                LEFT JOIN (
                    SELECT obj_id, MAX(created_on) AS latest_acknowledge_date
                    FROM workflow_execution_log
                    WHERE from_id = 9
                      AND to_id = 10
                      AND obj_id IN (${appIds.join(',')})
                    GROUP BY obj_id
                ) ack
                    ON ack.obj_id = sub.obj_id
            `);

            const submitInfoByAppId = {};
            submitDateResult.recordset.forEach(row => {
                submitInfoByAppId[row.application_id] = {
                    current_submit_date: row.current_submit_date,
                    acknowledge_date: row.acknowledge_date || null
                };
            });

            applications = applications.map(app => {
                const districtInfo = districtInfoByAppId[app.id] || { district_id: null, district_name: null };
                const submitInfo = submitInfoByAppId[app.id] || { current_submit_date: app.created_on, acknowledge_date: null };
                return {
                    ...app,
                    district_id: districtInfo.district_id,
                    district_name: districtInfo.district_name,
                    current_submit_date: submitInfo.current_submit_date,
                    acknowledge_date: submitInfo.acknowledge_date
                };
            });
        }

        // ---- NEW: attach totalDays + holidayExcludedDays ----
        applications = await calculateDaysWithHolidayExclusion(applications);

        // Run all three counts in parallel rather than sequentially
        const [pendingCount, successCount, rejectCount] = await Promise.all([
            Application.count({ where: { status_id: 3 } }),
            Application.count({ where: { status_id: 5 } }),
            Application.count({ where: { status_id: 6 } })
        ]);

        data.counts.pending = pendingCount;
        data.counts.success = successCount;
        data.counts.reject = rejectCount;
        data.counts.totalReceived = pendingCount + successCount + rejectCount;
        console.log(data.counts.totalReceived, ' data.counts.totalReceived ')
        if (applications.length !== 0) {
            data.status = 'SUCCESS';
            data.message = 'SUCCESS';
            data.data = applications;
        } else {
            data.status = 'SUCCESS';
            data.message = 'No Data Exist';
            data.data = [];
        }
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILED';
        data.message = err.message;
        console.log(err.message, 'error in e-appeal dash------------')
    }
    // LOG.debug(data);
    return data;
};

// ---- Holiday-aware day calculations ----
// Fetches all holiday dates within the broadest needed range once, then
// computes per-application total days and holiday-excluded days in memory.
// Avoids N+1 queries (one per application) for what is otherwise a simple
// date-membership check against a small, mostly-static table.
async function calculateDaysWithHolidayExclusion(applications) {
    if (applications.length === 0) {
        return applications;
    }

    const submitDates = applications
        .map(app => app.current_submit_date)
        .filter(d => d)
        .map(d => new Date(d));

    if (submitDates.length === 0) {
        return applications.map(app => ({
            ...app,
            totalDays: 0,
            holidayExcludedDays: 0
        }));
    }

    // earliest submit date as UTC midnight (calendar date only, no time)
    const earliestRaw = new Date(Math.min(...submitDates.map(d => d.getTime())));
    const earliestSubmitUTC = new Date(Date.UTC(
        earliestRaw.getUTCFullYear(),
        earliestRaw.getUTCMonth(),
        earliestRaw.getUTCDate()
    ));

    // today as UTC midnight derived from local (IST) date parts
    const now = new Date();
    const todayUTCMidnight = new Date(Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    ));

    // fetch all holidays in range once
    const holidayRequest = cpool.request();
    holidayRequest.input('fromDate', sql.DateTime, earliestSubmitUTC);
    holidayRequest.input('toDate', sql.DateTime, todayUTCMidnight);
    const holidayResult = await holidayRequest.query(`
        SELECT hol_date
        FROM dbo.mst_holidays
        WHERE hol_date >= @fromDate AND hol_date <= @toDate
    `);

    // normalize holiday dates using UTC date parts — avoids IST shift on hol_date
    const holidayDateSet = new Set(
        holidayResult.recordset.map(row => {
            const d = new Date(row.hol_date);
            return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
        })
    );



    return applications.map(app => {
        if (!app.current_submit_date) {
            return {
                ...app,
                totalDays: 0,
                holidayExcludedDays: 0,
                dateAfter90Days: null,
                dateAfter120Days: null
            };
        }

        const submitRaw = new Date(app.current_submit_date);

        const submitUTCMidnight = new Date(Date.UTC(
            submitRaw.getUTCFullYear(),
            submitRaw.getUTCMonth(),
            submitRaw.getUTCDate()
        ));

        const diffMs = todayUTCMidnight.getTime() - submitUTCMidnight.getTime();
        const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

        let holidayCount = 0;
        const cursor = new Date(submitUTCMidnight);

        while (cursor < todayUTCMidnight) {
            cursor.setUTCDate(cursor.getUTCDate() + 1);

            const key = `${cursor.getUTCFullYear()}-${String(cursor.getUTCMonth() + 1).padStart(2, '0')}-${String(cursor.getUTCDate()).padStart(2, '0')}`;

            if (holidayDateSet.has(key)) {
                holidayCount++;
            }
        }

        const after90 = addWorkingDays(submitUTCMidnight, 90, holidayDateSet);
        const after120 = addWorkingDays(submitUTCMidnight, 120, holidayDateSet);

        return {
            ...app,
            totalDays,
            holidayExcludedDays: totalDays - holidayCount,
            dateAfter90Days: after90,
            dateAfter120Days: after120
        };
    });
}

function addWorkingDays(startDate, workingDays, holidayDateSet) {
    // Work only with calendar dates (UTC midnight)
    const result = new Date(Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate()
    ));

    let count = 0;

    while (count < workingDays) {
        result.setUTCDate(result.getUTCDate() + 1);

        const key = `${result.getUTCFullYear()}-${String(result.getUTCMonth() + 1).padStart(2, '0')}-${String(result.getUTCDate()).padStart(2, '0')}`;

        if (!holidayDateSet.has(key)) {
            count++;
        }
    }

    return result;
}

const getacknowledgementDetails = async (req) => {
    LOG.info('Inside FormActionServiceImpl getacknowledgementDetails');
    const { appId } = req.params;
    let data = {
        status: 'SUCCESS',
        message: '',
        data: [],
    };
    try {
        let applications = await Application.findAll({
            order: [
                ["created_on", "DESC"]
            ],
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
            }],
            attributes: ['id', 'app_type', 'name', 'industries_id', 'app_for', 'name', 'email', 'ce_name', 'created_on', 'work_flow_step_transiton_type_mst_id', 'mob', 'WorkFlowStepTransitonTypeMst.transition_type', 'purpose_id', 'Purpose.purpose_name', 'allocation_type_id', 'AllocationType.application_type', 'status_id', 'cur_aloc_order', 'renewal_recom', 'payment_doc', 'cur_alocation_qt', 'paid_amount', 'industrial_percent', 'bulk_percent'],
            where: {
                status_id: 3,
                id: appId
            },
            raw: true
        });

        // IndustryDeatils has no direct association to Application, and
        // IndustryDeatils.belongsTo(District) has no FK override, so Sequelize
        // expects a 'DistrictId' column that doesn't exist (real column is
        // 'district_id'). Rather than rely on either broken association,
        // fetch district_id, address, pin_code directly and resolve District
        // names manually.
        if (applications.length !== 0) {
            const appIds = applications.map(app => app.id);

            const industryDetailsList = await IndustryDeatils.findAll({
                attributes: ['application_id', 'district_id', 'address', 'pin_code'],
                where: {
                    application_id: appIds
                },
                raw: true
            });

            const districtIds = [...new Set(
                industryDetailsList
                    .map(item => item.district_id)
                    .filter(id => id !== null && id !== undefined)
            )];

            let districtNameById = {};
            if (districtIds.length !== 0) {
                const districts = await District.findAll({
                    attributes: ['id', 'district_name'],
                    where: {
                        id: districtIds
                    },
                    raw: true
                });
                districts.forEach(d => {
                    districtNameById[d.id] = d.district_name;
                });
            }

            // Map application_id -> { district_id, district_name, address, pin_code } via IndustryDeatils
            const districtInfoByAppId = {};
            industryDetailsList.forEach(item => {
                districtInfoByAppId[item.application_id] = {
                    district_id: item.district_id || null,
                    district_name: districtNameById[item.district_id] || null,
                    address: item.address || null,
                    pin_code: item.pin_code || null
                };
            });

            // ---- Resubmission-aware "current submit date" ----
            // Day-count should restart from the latest citizen-originated row
            // in workflow_execution_log for this application (i.e. the most
            // recent time the app moved FROM a citizen TO any authority).
            // A citizen is any mst_users row with role_id = 3.
            // If an application has never been reverted, this simply
            // resolves to its original submission row, same effect as before.
            const submitDateRequest = cpool.request();
            const submitDateResult = await submitDateRequest.query(`
                SELECT
                    sub.obj_id AS application_id,
                    sub.current_submit_date,
                    ack.latest_acknowledge_date AS acknowledge_date
                FROM (
                    SELECT obj_id, MAX(created_on) AS current_submit_date
                    FROM workflow_execution_log
                    WHERE to_id = 9
                      AND obj_id IN (${appIds.join(',')})
                    GROUP BY obj_id
                ) sub
                LEFT JOIN (
                    SELECT obj_id, MAX(created_on) AS latest_acknowledge_date
                    FROM workflow_execution_log
                    WHERE from_id = 9
                      AND to_id = 10
                      AND obj_id IN (${appIds.join(',')})
                    GROUP BY obj_id
                ) ack
                    ON ack.obj_id = sub.obj_id
            `);

            const submitInfoByAppId = {};
            submitDateResult.recordset.forEach(row => {
                submitInfoByAppId[row.application_id] = {
                    current_submit_date: row.current_submit_date,
                    acknowledge_date: row.acknowledge_date || null
                };
            });

            applications = applications.map(app => {
                const districtInfo = districtInfoByAppId[app.id] || { district_id: null, district_name: null, address: null, pin_code: null };
                const submitInfo = submitInfoByAppId[app.id] || { current_submit_date: app.created_on, acknowledge_date: null };
                return {
                    ...app,
                    district_id: districtInfo.district_id,
                    district_name: districtInfo.district_name,
                    address: districtInfo.address,
                    pin_code: districtInfo.pin_code,
                    current_submit_date: submitInfo.current_submit_date,
                    acknowledge_date: submitInfo.acknowledge_date
                };
            });
        }

        applications = await calculateDaysWithHoliday(applications, 'allocation_type_id');


        if (applications.length !== 0) {
            data.status = 'SUCCESS';
            data.message = 'SUCCESS';
            data.data = applications;
        } else {
            data.status = 'SUCCESS';
            data.message = 'No Data Exist';
            data.data = [];
        }
    } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILED';
        data.message = err.message;
    }
    return data;
};


// async function calculateDaysWithHoliday(applications, application_type = 'allocation_type_id') {
//     if (applications.length === 0) {
//         return applications;
//     }

//     const WORKING_DAYS_BY_ALLOCATION_TYPE = {
//         1: 30,
//         2: 90,
//         3: 90
//     };

//     const submitDates = applications
//         .map(app => app.current_submit_date)
//         .filter(d => d)
//         .map(d => new Date(d));

//     if (submitDates.length === 0) {
//         return applications.map(app => ({
//             ...app,
//             totalDays: 0,
//             holidayExcludedDays: 0,
//             dueDate: null
//         }));
//     }

//     const earliestSubmitDate = new Date(Math.min(...submitDates.map(d => d.getTime())));

//     const MAX_WORKING_DAYS = Math.max(...Object.values(WORKING_DAYS_BY_ALLOCATION_TYPE));
//     const paddedToDate = new Date(earliestSubmitDate);
//     paddedToDate.setDate(paddedToDate.getDate() + (MAX_WORKING_DAYS * 2));

//     const holidayRequest = cpool.request();
//     holidayRequest.input('fromDate', sql.DateTime, earliestSubmitDate);
//     holidayRequest.input('toDate', sql.DateTime, paddedToDate);
//     const holidayResult = await holidayRequest.query(`
//         SELECT hol_date
//         FROM dbo.mst_holidays
//         WHERE hol_date >= @fromDate AND hol_date <= @toDate
//     `);

//     const holidayDateSet = new Set(
//         holidayResult.recordset.map(row => {
//             const d = new Date(row.hol_date);
//             return d.toISOString().slice(0, 10);
//         })
//     );

//     const isNonWorkingDay = (date) => {
//         const day = date.getDay(); // 0 = Sunday, 6 = Saturday
//         if (day === 0 || day === 6) return true;
//         const key = date.toISOString().slice(0, 10);
//         return holidayDateSet.has(key);
//     };

//     // Adds N working days (skipping weekends + holidays), preserving the
//     // original time-of-day from the submit timestamp on the final due date
//     const addWorkingDays = (startDate, workingDaysToAdd) => {
//         const hours = startDate.getHours();
//         const minutes = startDate.getMinutes();
//         const seconds = startDate.getSeconds();

//         const cursor = new Date(startDate);
//         cursor.setHours(0, 0, 0, 0);

//         let count = 0;
//         while (count < workingDaysToAdd) {
//             cursor.setDate(cursor.getDate() + 1);
//             if (!isNonWorkingDay(cursor)) {
//                 count++;
//             }
//         }

//         // Re-apply original submit time so dueDate isn't always midnight
//         cursor.setHours(hours, minutes, seconds, 0);
//         return cursor;
//     };

//     return applications.map(app => {
//         if (!app.current_submit_date) {
//             return { ...app, totalDays: 0, holidayExcludedDays: 0, dueDate: null };
//         }

//         const submitDate = new Date(app.current_submit_date);

//         const allocationTypeId = app[application_type];
//         const requiredWorkingDays = WORKING_DAYS_BY_ALLOCATION_TYPE[allocationTypeId];

//         if (!requiredWorkingDays) {
//             return { ...app, totalDays: 0, holidayExcludedDays: 0, dueDate: null };
//         }

//         const dueDate = addWorkingDays(submitDate, requiredWorkingDays);

//         const diffMs = dueDate.getTime() - submitDate.getTime();
//         const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//         return {
//             ...app,
//             totalDays,                          // calendar-day span to due date
//             holidayExcludedDays: requiredWorkingDays, // working days used (30/90)
//             dueDate: dueDate.toISOString()       // full date + time, e.g. "2026-11-05T14:32:10.000Z"
//         };
//     });
// }


async function calculateDaysWithHoliday(applications, application_type = 'allocation_type_id') {
    if (applications.length === 0) {
        return applications;
    }

    const WORKING_DAYS_BY_ALLOCATION_TYPE = {
        1: 30,
        2: 90,
        3: 90
    };

    const submitDates = applications
        .map(app => app.current_submit_date)
        .filter(d => d)
        .map(d => new Date(d));

    if (submitDates.length === 0) {
        return applications.map(app => ({
            ...app,
            totalDays: 0,
            holidayExcludedDays: 0,
            dueDate: null
        }));
    }

    // Earliest submit date (UTC midnight)
    const earliestRaw = new Date(Math.min(...submitDates.map(d => d.getTime())));
    const earliestSubmitUTC = new Date(Date.UTC(
        earliestRaw.getUTCFullYear(),
        earliestRaw.getUTCMonth(),
        earliestRaw.getUTCDate()
    ));

    // Buffer so that all holidays required for due date calculation are fetched
    const MAX_WORKING_DAYS = Math.max(...Object.values(WORKING_DAYS_BY_ALLOCATION_TYPE));
    const paddedToDate = new Date(earliestSubmitUTC);
    paddedToDate.setUTCDate(paddedToDate.getUTCDate() + MAX_WORKING_DAYS + 365);

    const holidayRequest = cpool.request();
    holidayRequest.input('fromDate', sql.DateTime, earliestSubmitUTC);
    holidayRequest.input('toDate', sql.DateTime, paddedToDate);

    const holidayResult = await holidayRequest.query(`
        SELECT hol_date, no_of_days
        FROM dbo.mst_holidays
        WHERE hol_date >= @fromDate
          AND hol_date <= @toDate
    `);

    // Expand holidays using no_of_days
    const holidayDateSet = new Set();

    holidayResult.recordset.forEach(row => {
        const start = new Date(row.hol_date);
        const days = row.no_of_days || 1;

        for (let i = 0; i < days; i++) {
            const d = new Date(Date.UTC(
                start.getUTCFullYear(),
                start.getUTCMonth(),
                start.getUTCDate()
            ));

            d.setUTCDate(d.getUTCDate() + i);

            holidayDateSet.add(
                `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
            );
        }
    });

    const addWorkingDays = (startDate, workingDays) => {

        const hours = startDate.getUTCHours();
        const minutes = startDate.getUTCMinutes();
        const seconds = startDate.getUTCSeconds();
        const ms = startDate.getUTCMilliseconds();

        const result = new Date(Date.UTC(
            startDate.getUTCFullYear(),
            startDate.getUTCMonth(),
            startDate.getUTCDate()
        ));

        let count = 0;

        while (count < workingDays) {

            result.setUTCDate(result.getUTCDate() + 1);

            const key =
                `${result.getUTCFullYear()}-${String(result.getUTCMonth() + 1).padStart(2, '0')}-${String(result.getUTCDate()).padStart(2, '0')}`;

            if (!holidayDateSet.has(key)) {
                count++;
            }
        }

        // Preserve original submit time
        result.setUTCHours(hours, minutes, seconds, ms);

        return result;
    };

    return applications.map(app => {

        if (!app.current_submit_date) {
            return {
                ...app,
                totalDays: 0,
                holidayExcludedDays: 0,
                dueDate: null
            };
        }

        const submitDate = new Date(app.current_submit_date);

        const allocationTypeId = app[application_type];
        const requiredWorkingDays = WORKING_DAYS_BY_ALLOCATION_TYPE[allocationTypeId];

        if (!requiredWorkingDays) {
            return {
                ...app,
                totalDays: 0,
                holidayExcludedDays: 0,
                dueDate: null
            };
        }

        const dueDate = addWorkingDays(submitDate, requiredWorkingDays);

        const submitUTCMidnight = new Date(Date.UTC(
            submitDate.getUTCFullYear(),
            submitDate.getUTCMonth(),
            submitDate.getUTCDate()
        ));

        const dueUTCMidnight = new Date(Date.UTC(
            dueDate.getUTCFullYear(),
            dueDate.getUTCMonth(),
            dueDate.getUTCDate()
        ));

        const totalDays = Math.round(
            (dueUTCMidnight.getTime() - submitUTCMidnight.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        return {
            ...app,
            totalDays,
            holidayExcludedDays: requiredWorkingDays,
            dueDate
        };
    });
}

module.exports = {
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
    getPendingApplicationsForAppealDashboard,
    getacknowledgementDetails
}