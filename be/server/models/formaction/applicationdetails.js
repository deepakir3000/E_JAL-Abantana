const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {Purpose} = require('./../../models/mdm/purpose.js');
const {AllocationType} = require('./../../models/mdm/allocationType.js');
const {ApplicationTypeMst} = require('./../../models/workflow/applicationtypemst.js');
const {WorkFlowStepTransitonTypeMst} = require('./../../models/workflow/workflowsteptransitiontypemst.js');
const {Status} = require('./../../models/uac/status.js');

let Application = sequelize.define('Application', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    app_code: Sequelize.STRING,
    app_type: Sequelize.STRING,
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    mob: Sequelize.STRING,
    ce_name: Sequelize.STRING,
    purpose_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_purposes', // 'mst_purposes' refers to table name
            key: 'id', // 'id' refers to column name in mst_purposes table
        }
    },
    application_type_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_type_mst', // 'application_type_mst' refers to table name
            key: 'id', // 'id' refers to column name in application_type_mst table
        }
    },
    allocation_type_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_allocation_type', // 'mst_allocation_type' refers to table name
            key: 'id', // 'id' refers to column name in mst_allocation_type table
        }
    },
    status_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_status', // 'mst_purposes' refers to table name
            key: 'id', // 'id' refers to column name in mst_purposes table
        }
    },
    work_flow_step_transiton_type_mst_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow_step_transition_type_mst', // 'workflow_step_transition_type_mst' refers to table name
            key: 'id', // 'id' refers to column name in workflow_step_transition_type_mst table
        }
    },
    status_remarks : Sequelize.STRING,
    app_for : Sequelize.STRING,
    industries_id: Sequelize.INTEGER,
    cur_aloc_order : Sequelize.STRING,
    renewal_recom : Sequelize.STRING,
    cur_alocation_qt: Sequelize.FLOAT,
    cur_alocation_qt_cusec: Sequelize.FLOAT,
    paid_amount: Sequelize.INTEGER,
    payment_doc: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
    others : Sequelize.STRING,
    type : Sequelize.STRING,
    industrial_percent : Sequelize.INTEGER,
    bulk_percent : Sequelize.INTEGER,
}, {
    sequelize,
    modelName: 'Application',
    freezeTableName: true,
    tableName: 'application_details',
});

Application.sync();
Application.belongsTo(Purpose);
Application.belongsTo(AllocationType);
Application.belongsTo(ApplicationTypeMst);
Application.belongsTo(WorkFlowStepTransitonTypeMst);
Application.belongsTo(Status);

module.exports = {
    Application
};