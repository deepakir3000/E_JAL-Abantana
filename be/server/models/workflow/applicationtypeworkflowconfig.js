const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {ApplicationTypeMst} = require('./../../models/workflow/applicationtypemst.js');
const {WorkFlow} = require('./../../models/workflow/workflow.js');

let WorkFlowConfig = sequelize.define('WorkFlowConfig', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    app_type_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_type_mst', // 'application_type_mst' refers to table name
            key: 'id', // 'id' refers to column name in application_type_mst table
        }
    },
    wf_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow', // 'application_type_mst' refers to table name
            key: 'id', // 'id' refers to column name in application_type_mst table
        }
    },
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlowConfig',
    freezeTableName: true,
    tableName: 'application_type_workflow_config',
});

WorkFlowConfig.sync();
WorkFlowConfig.belongsTo(ApplicationTypeMst);
WorkFlowConfig.belongsTo(WorkFlow);

module.exports = {
    WorkFlowConfig
};