const {
    State
} = require('./../../models/mdm/state.js');
const {
    District
} = require('./../../models/mdm/district.js');
const {
    Block
} = require('./../../models/mdm/block.js');
const {
    Industry
} = require('./../../models/mdm/industry.js');
const {AppConstants} = require('./../../utils/AppConstants');
const {IndustryDetailsMst} = require('./../../models/mdm/industryDetails.js');
const {
    Purpose
} = require('./../../models/mdm/purpose.js');
const {
    AllocationType
} = require('./../../models/mdm/allocationType.js');
const {
    OperationalSource
} = require('./../../models/mdm/operationalSource.js');
const {River} = require('./../../models/mdm/mstriver.js');
const {Dam} = require('./../../models/mdm/mstdam.js');
const {User} = require('./../../models/uac/user');
const {Basin} = require('./../../models/mdm/mstbasin.js');
const {feedbackQuestion} = require('./../../models/mdm/feedback_questions.js');
const {
    logger
} = require('./../../config/log-config');
const { Sequelize } = require('sequelize');
const LOG = logger.getLogger('mdmServiceImpl.js');
const Op = Sequelize.Op
//createState
const createState = async (req) => {
    LOG.info('Inside mdmservice create State');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("State Details ===> ", req.body);
        let maxId = await State.max('id');
        let result = await State.findAll({
            where: {
                state_name: req.body.stateName.toUpperCase()
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("State already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'State already exists';
            data.data = result;
        } else {
            const result = State.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                state_name: req.body.stateName.toUpperCase(),
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'State created.';
            data.data = result;
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

//updateState
const updateState = async (req) => {
    LOG.info('Inside mdmservice create State');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {

        LOG.info("State Details ===> ", req.body);

        let maxId = await State.max('id');
        let resultData = await State.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        LOG.info("State Result ===> ", resultData);
        if (resultData.length != 0) {
            const result = State.update({
                state_name: req.body.stateName == null ? resultData[0].state_name : req.body.stateName.toUpperCase(),
                status: 1,
                updated_by: req.user.id,
                update_on: new Date(),
            }, {
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'State Updated.';
            data.data = result;
        } else {
            LOG.error("State Id Not Valid with state id = ", result);
            data.status = 'NOT FOUND';
            data.message = 'State Id Not Valid';
            data.data = result;
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

//getAllStates
const getAllStates = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllStates');
    LOG.info("Inside get all States req ====> " , req.body);
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    let query = req.query;
    try {
        const { count, rows, result } = await State.findAndCountAll({
            offset: query.skip,
            limit: query.limit,
            order: [
                [req.body.orderField]
            ],
            attributes: ['id', 'state_name'],
            raw: true
        });
        LOG.error(count, rows, result);
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages = Math.floor((count / query.limit) + (count % (query.limit) > 0 ? 1 : 0));
        data.totalElements = count;

    } catch (err) {
        LOG.error("SQL error!!!");
        LOG.error("SQL error ====> ", err);
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
};

//createDistrict
const createDistrict = async (req) => {
    LOG.info('Inside mdmservice create District');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("District Details ===> ", req.body);
        let maxId = await District.max('id');
        let result = await District.findAll({
            where: {
                district_name: req.body.districtName.toUpperCase()
            },
            raw: true
        });
        let resultState = await State.findAll({
            where: {
                id: req.body.stateId
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("District already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'District already exists';
            data.data = result;
        } else if (resultState.length == 0) {
            LOG.error("State is not exists...");
            data.status = 'NOT FOUND';
            data.message = 'State is not exists';
            data.data = result;
        } else {
            const result = District.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                state_id: req.body.stateId,
                district_name: req.body.districtName.toUpperCase(),
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'District created.';
            data.data = result;
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

//getAllDistrict
const getAllDistrict = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllDistrict');
    LOG.info("Inside getAllDistrict req ====> ", req.body);
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    let totalPages = 0;
    try {
        let skip = req.body.pageNumber;
        let pageSize = req.body.pageSize;
        if (!req.body.isPaginationRequired) {
            skip = 0;
            pageSize = 0;
        }
        const {
            count,
            rows,
            result
        } = await District.findAndCountAll({
            offset: skip,
            limit: pageSize,
            order: [
                [req.body.orderField]
            ],
            include: [{
                model: State,
                as: 'State',
                attributes: [],
                // where: {
                //     id: 4
                // }
            }],
            attributes: ['id', 'district_name', 'state_id','State.state_name'],
            raw: true
        });
        LOG.info("FIND ALL DISTRICT RESULT =====> ", result);
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages = Math.floor((count / req.body.pageSize) + (count % (req.body.pageSize) > 0 ? 1 : 0));
        data.totalElements = count;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//updateDistrict
const updateDistrict = async (req) => {
    LOG.info('Inside mdmservice updateDistrict');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("District Details ===> ", req.body);
        let resultData = await District.findAll({
            where: {
                id: req.body.districtId
            },
            raw: true
        });
        if (resultData.length != 0) {
            try {
                const result = District.update({
                    state_id: req.body.stateId == null ? resultData.state_id : req.body.stateId,
                    district_name: req.body.districtName == null ? resultData[0].district_name.toUpperCase() : req.body.districtName.toUpperCase(),
                    status: 1,
                    updated_by: req.user.id,
                    update_on: new Date(),
                }, {
                    where: {
                        id: req.body.districtId
                    }
                }).then(success => {
                    LOG.info("SUCCESS ====> ", success.dataValues);
                }, rejection => {
                    LOG.info("REJECTION ====> ", rejection);
                    LOG.error("SQL error!!!");
                    data.status = 'FAILURE';
                    data.message = "Error Occured";
                });
                data.message = 'District Updated.';
                data.data = result;
            } catch (error) {
                data.message = 'Can not Update';
                LOG.info(error);
            }
        } else {
            LOG.error("District ID does not exist with id =", resultData);
            data.status = 'DUPLICATE';
            data.message = 'District ID does not exist';
            data.data = result;
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

//createBlock
const createBlock = async (req) => {
    LOG.info('Inside mdmservice create Block');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Block Details ===> ", req.body);

        let maxId = await Block.max('id');
        let result = await Block.findAll({
            where: {
                block_name: req.body.blockName.toUpperCase()
            },
            raw: true
        });
        let resultDataDistrict = await District.findAll({
            where: {
                id: req.body.districtId
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("Block already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'Block already exists';
            //data.data = result;
        } else if (resultDataDistrict.length == 0) {
            LOG.error("District Id Not Present ..." + result);
            data.status = 'NOT FOUND';
            data.message = 'District Id Not Present ...';
            //data.data = result;
        } else {
            const result = Block.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                district_id: req.body.districtId,
                block_name: req.body.blockName.toUpperCase(),
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Block created.';
            data.data = result;
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

//updateBlock
const updateBlock = async (req) => {
    LOG.info('Inside mdmservice updateBlock');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Block Details ===> ", req.body);
        let resultData = await Block.findAll({
            where: {
                id: req.body.blockId
            },
            raw: true
        });
        let resultDataDistrict = await District.findAll({
            where: {
                id: req.body.districtId
            },
            raw: true
        });
        LOG.info("resultDataDistrict ..." + resultDataDistrict);
        if (resultDataDistrict == 0) {
            LOG.error("District Id Not Present ..." + resultDataDistrict);
            data.status = 'NOT FOUND';
            data.message = 'District Id Not Present ...';
        } else {
            if (resultData.length != 0) {
                try {
                    const result = Block.update({
                        district_id: req.body.districtId == null ? resultData[0].district_id : req.body.districtId,
                        block_name: req.body.blockName == null ? resultData[0].block_name.toUpperCase() : req.body.blockName.toUpperCase(),
                        status: 1,
                        updated_by: req.user.id,
                        updated_on: new Date(),
                    }, {
                        where: {
                            id: req.body.blockId
                        }
                    }).then(success => {
                        LOG.info("SUCCESS ====> ", success.dataValues);
                    }, rejection => {
                        LOG.info("REJECTION ====> ", rejection);
                        LOG.error("SQL error!!!");
                        data.status = 'FAILURE';
                        data.message = "Error Occured";
                    });
                    data.message = 'Block Updated.';
                    data.data = result;
                } catch (error) {
                    data.message = 'Can not Update';
                    LOG.info(error);
                }
            } else {
                LOG.error("Block ID does not exist with id =", resultData);
                data.status = 'DUPLICATE';
                data.message = 'Block ID does not exist';
                data.data = result;
            }
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

//getAllBlocks
const getAllBlocks = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllBlocks');
    LOG.info("Inside getAllBlocks req ====> ", req.body);
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    try {
        let skip = req.body.pageNumber;
        let pageSize = req.body.pageSize;
        if (!req.body.isPaginationRequired) {
            skip = 0;
            pageSize = 0;
        }
        const {
            count,
            rows,
            result
        } = await Block.findAndCountAll({
            offset: skip,
            limit: pageSize,
            order: [
                [req.body.orderField]
            ],
            include: [{
                model: District,
                as: 'District',
                attributes: [],
                include: [{
                    model: State,
                    as: 'State',
                    attributes: [],
                }],
            }],
            attributes: ['id', 'block_name','district_id', 'District.district_name','District.state_id',
                'District.State.state_name'
            ],
            raw: true
        });
        LOG.info("FIND ALL DISTRICT RESULT =====> ", result);
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages = Math.floor((count / req.body.pageSize) + (count % (req.body.pageSize) > 0 ? 1 : 0));
        data.totalElements = count;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//createIndustry
const createIndustry = async (req) => {
    LOG.info('Inside mdmservice create Industry');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("createIndustry Details ===> ", req.body);

        let maxId = await Industry.max('id');
        let result = await Industry.findAll({
            where: {
                industry_name: req.body.industryName.toUpperCase()
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("createIndustry already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'Industry already exists = ' + result[0].industry_name;
            //data.data = result;
        } else {
            const result = Industry.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                industry_name: req.body.industryName,
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Industry created.';
            data.data = result;
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

//getALlIndustries
const getALlIndustries = async (req) => {
    LOG.info('Inside MdmServiceImpl getALlIndustries');
    LOG.info("Inside getALlIndustries req ====> ", req.body);
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    let totalPages = 0;
    try {
        const {
            count,
            rows,
            result
        } = await Industry.findAndCountAll({
            order: ["id"],
            attributes: ['id', 'industry_name'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages = Math.floor((count / req.body.pageSize) + (count % (req.body.pageSize) > 0 ? 1 : 0));
        data.totalElements = count;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//updateIndustry
const updateIndustry = async (req) => {
    LOG.info('Inside mdmservice update Industry');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("updateIndustry Details ===> ", req.body);
        let resultData = await Industry.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (resultData.length != 0) {
            const result = Industry.update({
                industry_name: req.body.industryName == null ? resultData[0].industry_name : req.body.industryName.toUpperCase(),
                status: 1,
                updated_by: req.user.id,
                updated_on: new Date(),
            }, {
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Industry updated.';
            data.data = result;
        } else {
            data.status = 'NOT FOUND';
            data.message = 'Industry not found with id = ' + req.body.id;
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

//createPurpose
const createPurpose = async (req) => {
    LOG.info('Inside mdmservice create Purpose');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("createPurpose Details ===> ", req.body);

        let maxId = await Purpose.max('id');
        let result = await Purpose.findAll({
            where: {
                purpose_name: req.body.purposeName.toUpperCase()
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("Purpose already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'Purpose already exists = ' + req.body.purposeName;
            //data.data = result;
        } else {
            const result = Purpose.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                purpose_name: req.body.purposeName.toUpperCase(),
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Purpose created.';
            data.data = result;
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

//updatePurpose
const updatePurpose = async (req) => {
    LOG.info('Inside mdmservice update Purpose');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("updatePurpose Details ===> ", req.body);
        let maxId = await Purpose.max('id');
        let resultData = await Purpose.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (resultData.length == 0) {
            LOG.error("Purpose not found with id...", result);
            data.status = 'NOT FOUND';
            data.message = 'Purpose not found with id = ' + req.body.id;
            //data.data = result;
        } else {
            const result = Purpose.update({
                purpose_name: req.body.purposeName == null ? resultData[0].purpose_name : req.body.purposeName.toUpperCase(),
                status: 1,
                updated_by: req.user.id,
                updated_on: new Date(),
            }, {
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Purpose Updated.';
            data.data = result;
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

//getAllPurpose
const getAllPurpose = async (query) => {
    LOG.info('Inside MdmServiceImpl getAllPurpose');
    LOG.info("Inside getAllPurpose req ====> ", query);
    let data = {
        message: '',
        data: {},
        totalPages:0,
        totalElements:0
    };

    try {
        const {
            count,
            rows,
            result
        } = await Purpose.findAndCountAll({
            offset: query.skip,
            limit: query.limit,
            order: [["id", query.order]],
            attributes: ['id', 'purpose_name'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages =  Math.floor((count / query.limit) + (count % (query.limit) > 0 ? 1 : 0)) ;
        data.totalElements = count;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//createApplicationType
const createApplicationType = async (req) => {
    LOG.info('Inside mdmservice create ApplicationType');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("createApplicationType Details ===> ", req.body);

        let maxId = await ApplicationType.max('id');
        let result = await ApplicationType.findAll({
            where: {
                application_type: req.body.applicationType.toUpperCase()
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("Application Type already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'Application Type already exists = ' + req.body.applicationType;
            //data.data = result;
        } else {
            const result = ApplicationType.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                application_type: req.body.applicationType.toUpperCase(),
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Application Type created.';
            data.data = result;
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

//updateApplicationType
const updateApplicationType = async (req) => {
    LOG.info('Inside mdmservice update ApplicationType');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("update ApplicationType Details ===> ", req.body);
        let resultData = await Purpose.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (resultData.length == 0) {
            LOG.error("ApplicationType not found with id...", result);
            data.status = 'NOT FOUND';
            data.message = 'ApplicationType not found with id = ' + req.body.id;
            //data.data = result;
        } else {
            const result = ApplicationType.update({
                application_type: req.body.applicationType == null ? resultData[0].application_type : req.body.applicationType.toUpperCase(),
                status: 1,
                updated_by: req.user.id,
                updated_on: new Date(),
            }, {
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Application Type Updated.';
            data.data = result;
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

//getAllApplicationType
const getAllApplicationType = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllApplicationType');
    LOG.info("Inside getAllApplicationType req ====> ", req.body);
    let data = {
        message: '',
        data: {},
       // totalPages: 0,
       // totalElements: 0
    };
    let totalPages = 0;
    try {
        const {
            count,
            rows,
            result
        } = await AllocationType.findAndCountAll({
            order: [
                [req.body.orderField]
            ],
            attributes: ['id', 'application_type'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
      //  data.totalPages = Math.floor((count / req.body.limit) + (count % (req.body.limit) > 0 ? 1 : 0));
      //  data.totalElements = count;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//createOperationalSource
const createOperationalSource = async (req) => {
    LOG.info('Inside mdmservice create createOperationalSource');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("createOperationalSource Details ===> ", req.body);

        let maxId = await OperationalSource.max('id');
        let result = await OperationalSource.findAll({
            where: {
                operational_source: req.body.operationalSource.toUpperCase()
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("Operational Source already exist with this name...", result);
            data.status = 'DUPLICATE';
            data.message = 'Operational Source already exists = ' + req.body.operationalSource;
            //data.data = result;
        } else {
            const result = OperationalSource.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                operational_source: req.body.operationalSource.toUpperCase(),
                status: 1,
                created_by: req.user.id,
                created_on: new Date(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Operational Source created.';
            data.data = result;
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

//updateoperationalSource
const updateoperationalSource = async (req) => {
    LOG.info('Inside mdmservice update Operational Source');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("update Operational Source ===> ", req.body);
        let resultData = await Purpose.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (resultData.length == 0) {
            LOG.error("Operational Source not found with id...", result);
            data.status = 'NOT FOUND';
            data.message = 'Operational Source found with id = ' + req.body.id;
            //data.data = result;
        } else {
            const result = OperationalSource.update({
                operational_source: req.body.operationalSource == null ? resultData[0].operational_source : req.body.operationalSource.toUpperCase(),
                status: 1,
                updated_by: req.user.id,
                updated_on: new Date(),
            }, {
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });

            data.message = 'Operational Source Updated.';
            data.data = result;
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

//getAllOperationalSource
const getAllOperationalSource = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllOperationalSource');
    LOG.info("Inside getAllOperationalSource req ====> ", req.body);
    let data = {
        message: '',
        data: {},
      //  totalPages: 0,
      //  totalElements: 0
    };
    let totalPages = 0;
    try {
        const {
            count,
            rows,
            result
        } = await OperationalSource.findAndCountAll({
            order: [
                [req.body.orderField]
            ],
            attributes: ['id', 'operational_source'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
       // data.totalPages = Math.floor((count / req.body.limit) + (count % (req.body.limit) > 0 ? 1 : 0));
       // data.totalElements = count;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};


//getAllBlocksByDistrict
const getAllBlocksByDistrict = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllBlocksByDistrict');
    let {distId} = req.params;
    LOG.info("Inside getAllBlocksByDistrict req ====> ",distId);
    let data = {
        message: '',
        data: {},
    };
    try {
        const block = await Block.findAll({
            attributes: ['id', 'block_name'],
            order: [["block_name", "ASC"]],
            where: {
                district_id: distId,
                status: AppConstants.ACTIVE
            },
            raw: true
        });
        LOG.info("FIND ALL DISTRICT RESULT =====> ", block);
        data.message = 'SUCCESS';
        data.data = block;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//getALlIndustriesDetails
const getALlIndustriesDetails = async (req) => {
    LOG.info('Inside MdmServiceImpl getALlIndustriesDetails');
    LOG.info("Inside getALlIndustriesDetails req ====> ", req.body);
    let data = {
        message: '',
        data: {},
    };
    try {
        const industryDetailsMst = await IndustryDetailsMst.findAll({
            attributes: ['serial_no', 'industry_name'],
            order: [["industry_name", "ASC"]],
            where: {
                status : 'O',
                division:  {
                    [Op.ne]: null
                },
                type:['Commercial','Others']
            },
            raw: true
        });
         console.log("Industry Data:", industryDetailsMst); 
        data.message = 'SUCCESS';
        data.data = industryDetailsMst;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//createRiver
const createRiver = async (req) => {
    LOG.info('Inside mdmservice create River');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("River Details ===> ", req.body);
        let maxId = await River.max('id');
        let result = await River.findAll({
            where: {
                river_name: req.body.riverName.toUpperCase()
            },
            raw: true
        });
        let basin = await Basin.findAll({
            where: {
                id: req.body.basinId
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("River already exist with this name...", req.body.riverName);
            data.status = 'DUPLICATE';
            data.message = 'River already exists';
            data.data = result;
        }else if(basin.length == 0) {
            LOG.error("Basin Does not exist with this name...", req.body.basinId);
            data.status = 'Not Exists';
            data.message = 'Basin Does Not Exists';
        } else {
            const result = River.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                river_name: req.body.riverName.toUpperCase(),
                basin_id: req.body.basinId,
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'River created.';
            data.data = result;
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

//updateRiver
const updateRiver = async (req) => {
    LOG.info('Inside mdmservice Update River');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("River Details ===> ", req.body);
        let resultData = await River.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (resultData.length == 0) {
            LOG.error("River Does not exist with id", req.body.id);
            data.status = 'DUPLICATE';
            data.message = 'River already exists';
            data.data = result;
        }else {
            const result = River.update({
                river_name: req.body.riverName == null ? resultData[0].riverName : req.body.riverName.toUpperCase(),
                basin_id: req.body.basinId == null ? resultData[0].basinId : req.body.basinId,
            },{
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'River Updated.';
            data.data = result;
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

//getAllRivers
const getAllRivers = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllRivers');
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    try {
        let skip = req.body.pageNumber;
        let pageSize = req.body.pageSize;
        if (!req.body.isPaginationRequired) {
            skip = 0;
            pageSize = 0;
        }
        const {
            count,
            rows,
            result
        } = await River.findAndCountAll({
            offset: skip,
            limit: pageSize,
            order: [
                [req.body.orderField]
            ],
            include: [{
                model: Basin,
                as: 'Basin',
                attributes: [],
            }],
            attributes: ['id', 'river_name', 'basin_id','Basin.basin_name'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages = Math.floor((count / req.body.pageSize) + (count % (req.body.pageSize) > 0 ? 1 : 0));
        data.totalElements = count;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//createBasin
const createBasin = async (req) => {
    LOG.info('Inside mdmservice create Basin');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("River Details ===> ", req.body);
        let maxId = await Basin.max('id');
        let basin = await Basin.findAll({
            where: {
                basin_name: req.body.basinName
            },
            raw: true
        });
        if (basin.length != 0) {
            LOG.error("Basin already exist with this name...", req.body.basinName);
            data.status = 'DUPLICATE';
            data.message = 'Basin already exists';
            data.data = basin;
        } else {
            const result = Basin.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                basin_name: req.body.basinName.toUpperCase(),
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'Basin created.';
            data.data = result;
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

//updateBasin
const updateBasin = async (req) => {
    LOG.info('Inside mdmservice update Basin');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("River Details ===> ", req.body);
        let basin = await Basin.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (basin.length == 0) {
            LOG.error("Basin Does not exist with id", req.body.id);
            data.status = 'DUPLICATE';
            data.message = 'Basin already exists';
            data.data = basin;
        }else {
            const result = Basin.update({
                basin_name: req.body.basinName == null ? resultData[0].basinName : req.body.basinName.toUpperCase(),
            },{
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'Basin Updated.';
            data.data = result;
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

//getAllBasins
const getAllBasins = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllBasins');
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    try {
        let skip = req.body.skip;
        let pageSize = req.body.pageSize;
        if (!req.body.isPaginationRequired) {
            skip = 0;
            pageSize = 0;
        }
        const {
            count,
            rows,
            result
        } = await Basin.findAndCountAll({
            offset: skip,
            limit: pageSize,
            order: [
                [req.body.orderField]
            ],
            attributes: ['id', 'basin_name'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages = Math.floor((count / req.body.pageSize) + (count % (req.body.pageSize) > 0 ? 1 : 0));
        data.totalElements = count;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//createDam
const createDam = async (req) => {
    LOG.info('Inside mdmservice create Dam');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Dam Details ===> ", req.body);
        let maxId = await Dam.max('id');
        let result = await Dam.findAll({
            where: {
                dam_name: req.body.damName.toUpperCase()
            },
            raw: true
        });
        let basin = await Basin.findAll({
            where: {
                id: req.body.basinId
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("Dam already exist with this name...", req.body.damName);
            data.status = 'DUPLICATE';
            data.message = 'Dam already exists';
            data.data = result;
        }else if(basin.length == 0) {
            LOG.error("Basin Does not exist with this name...", req.body.basinId);
            data.status = 'Not Exists';
            data.message = 'Basin Does Not Exists';
        } else {
            const result = Dam.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                dam_name: req.body.damName.toUpperCase(),
                basin_id: req.body.basinId,
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'Dam created.';
            data.data = result;
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

//updateDam
const updateDam = async (req) => {
    LOG.info('Inside mdmservice Update Dam');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Dam Details ===> ", req.body);
        let resultData = await Dam.findAll({
            where: {
                id: req.body.id
            },
            raw: true
        });
        if (resultData.length == 0) {
            LOG.error("Dam Does not exist with id", req.body.id);
            data.status = 'Not exists';
            data.message = 'Dam already exists';
            data.data = result;
        }else {
            const result = Dam.update({
                dam_name: req.body.damName == null ? resultData[0].damName : req.body.damName.toUpperCase(),
                basin_id: req.body.basinId == null ? resultData[0].basinId : req.body.basinId,
            },{
                where: {
                    id: req.body.id
                }
            }).then(success => {
                LOG.info("SUCCESS ====> ", success.dataValues);
            }, rejection => {
                LOG.info("REJECTION ====> ", rejection);
                LOG.error("SQL error!!!");
                data.status = 'FAILURE';
                data.message = "Error Occured";
            });
            data.message = 'Dam Updated.';
            data.data = result;
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

//getAllDams
const getAllDams = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllBasins');
    let data = {
        message: '',
        data: {},
        totalPages: 0,
        totalElements: 0
    };
    try {
        let skip = req.body.skip;
        let pageSize = req.body.pageSize;
        if (!req.body.isPaginationRequired) {
            skip = 0;
            pageSize = 0;
        }
        const {
            count,
            rows,
            result
        } = await Dam.findAndCountAll({
            offset: skip,
            limit: pageSize,
            order: [
                [req.body.orderField]
            ],
            include: [{
                model: Basin,
                as: 'Basin',
                attributes: [],
            }],
            attributes: ['id', 'dam_name', 'basin_id','Basin.basin_name'],
            raw: true
        });
        data.message = 'SUCCESS';
        data.data = rows;
        data.totalElements = count;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//getAllIndustriesDetailsByStatus
const getAllIndustriesDetailsByStatus = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllIndustriesDetailsByStatus');
    LOG.info("Inside getAllIndustriesDetailsByStatus req ====>");
    const{status} = req.params;
    let query = req.query;
    let data = {
        message: '',
        data: {},
        totalPages:0,
        totalElements:0
    };
    try {
        var rowsVal = null;
        var rowsCount = null;
        if(status === 'Pending'){
            const { count, rows, result } = await IndustryDetailsMst.findAndCountAll({
                offset: query.skip,
                limit: query.limit,
                attributes: ['serial_no', 'industry_name','industry_code','division','address','pin'],
                order: [["industry_name", "ASC"]],
                where: {
                    division:  null
                },
                raw: true
            });
            rowsVal = rows;
            rowsCount = count;
        }else{
            const { count, rows, result } = await IndustryDetailsMst.findAndCountAll({
                offset: query.skip,
                limit: query.limit,
                attributes: ['serial_no', 'industry_name','industry_code','division','address','pin'],
                order: [["industry_name", "ASC"]],
                where: {
                    division:  {
                        [Op.ne]: null
                    }
                },
                raw: true
            });
            rowsVal = rows;
            rowsCount = count;
        }
        data.message = 'SUCCESS';
        data.data = rowsVal;
        data.totalPages =  Math.floor((rowsCount / query.limit) + (rowsCount % (query.limit) > 0 ? 1 : 0)) ;
        data.totalElements = rowsCount;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//actionForIndustries
const actionForIndustries = async (req) => {
    LOG.info('Inside MdmServiceImpl actionForIndustries');
    LOG.info("Inside actionForIndustries req ====>");
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        console.log("USERRRRRR",req.body.userId)
        let user = await User.findOne({
            attributes: ['id', 'user_name'],
            where: {
                id:  req.body.userId
            },
        })
        console.log("USERRRRRR",user)
        if(user === null){
            LOG.error('User Id Does not exist');
            status = 'INVALID';
        }
        if(data.status !== 'INVALID'){
            let result = await IndustryDetailsMst.update({
                division: user.user_name
            },{
                where: {
                    serial_no: req.body.id
                }
            })
        }
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

//getAllDamsByRiver
const getAllDamsByRiver = async (req) => {
    LOG.info('Inside MdmServiceImpl getAllDamsByRiver');
    let {riverId} = req.params;
    LOG.info("Inside getAllDamsByRiver req ====> ",riverId);
    let data = {
        message: '',
        data: {},
    };
    try {
        const river = await River.findOne({
            attributes: ['id', 'basin_id'],
            where: {
                id: riverId
            },
            raw: true
        });
        let dam = null;
        if(river !== null){
            dam = await Dam.findAll({
                order:[['dam_name',"ASC"]],
                attributes: ['id', 'dam_name'],
                where: {
                    basin_id: river.basin_id
                },
                raw: true
            });
        }
        LOG.info("FIND ALL DISTRICT RESULT =====> ", dam);
        data.message = 'SUCCESS';
        data.data = dam;

    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};

const getFeedbackQuestions = async (req) => {
    LOG.info('Inside MdmServiceImpl getFeedbackQuestions');
    let data = {
        message: '',
        data: {},
    };
    try {
        let feedbackQuestions = await feedbackQuestion.findAll({
            order: [['id', "ASC"]],
            attributes: ['id', 'feedback__questions'],
            raw: true
        });
        LOG.info("FIND ALL feedback RESULT =====> ", feedbackQuestions);
        data.message = 'SUCCESS';
        data.data = feedbackQuestions;
    } catch (err) {
        LOG.debug(err);
        data.message = err.message;
    }
    return data;
};
const createFeedbackQuestion = async (req) => {
    LOG.info('Inside mdmservice create Dam');
    let data = {
        status: 'SUCCESS',
        message: '',
        data: {}
    };
    try {
        LOG.info("Feedback Details ===> ", req.body);
        let maxId = await feedbackQuestion.max('id');
        let result = await feedbackQuestion.findAll({
            where: {
                feedback__questions: req.body.feedbackQuestion.toUpperCase()
            },
            raw: true
        });
        if (result.length != 0) {
            LOG.error("Question already exist", req.body.feedbackQuestion);
            data.status = 'DUPLICATE';
            data.message = 'Question already exists';
            data.data = result;
        } else {
            LOG.info("River Details ===> ", req.body);
            let resultData = await feedbackQuestion.findAll({
                where: {
                    id: req.body.id
                },
                raw: true
            });
            if (req.body.id != 0) {
                const result = feedbackQuestion.update({
                    feedback__questions: req.body.feedbackQuestion == null ? resultData[0].feedback__questions : req.body.feedbackQuestion.toUpperCase(),
                }, {
                    where: {
                        id: req.body.id
                    }
                }).then(success => {
                    LOG.info("SUCCESS ====> ", success.dataValues);
                }, rejection => {
                    LOG.info("REJECTION ====> ", rejection);
                    LOG.error("SQL error!!!");
                    data.status = 'FAILURE';
                    data.message = "Error Occured";
                });
                data.message = 'Feedback Question updated.';
                data.data = result;
            } else {
                const result = feedbackQuestion.create({
                    id: isNaN(maxId) ? 1 : maxId + 1,
                    feedback__questions: req.body.feedbackQuestion.toUpperCase()
                }).then(success => {
                    LOG.info("SUCCESS ====> ", success.dataValues);
                }, rejection => {
                    LOG.info("REJECTION ====> ", rejection);
                    LOG.error("SQL error!!!");
                    data.status = 'FAILURE';
                    data.message = "Error Occured";
                });
                data.message = 'Feedback Question created.';
                data.data = result;
            }
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

module.exports = {
    createState,
    updateState,
    getAllStates,
    createDistrict,
    updateDistrict,
    getAllDistrict,
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