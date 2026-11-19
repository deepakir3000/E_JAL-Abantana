const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {WorkFlow} = require('./../../models/workflow/workflow.js');

let WorkFlowStep = sequelize.define('WorkFlowStep', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    step_name : Sequelize.STRING,
    step_desc: Sequelize.STRING,
    wf_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow', // 'workflow' refers to table name
            key: 'id', // 'id' refers to column name in workflow table
        }
    },
    rules: Sequelize.STRING,
    order_sl: Sequelize.INTEGER,
    is_login_required: Sequelize.BOOLEAN,
    is_static: Sequelize.BOOLEAN,
    is_step_user_unique: Sequelize.BOOLEAN,
    notification_enabled: Sequelize.BOOLEAN,
    notify_admin: Sequelize.BOOLEAN,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlowStep',
    freezeTableName: true,
    tableName: 'workflow_step ',
});

WorkFlowStep.sync();
WorkFlowStep.belongsTo(WorkFlow);

module.exports = {
    WorkFlowStep
};