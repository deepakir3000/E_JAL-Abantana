const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {WorkFlowStep} = require('./../../models/workflow/workflowstep.js');
const {WorkFlowStepTransitonTypeMst} = require('./../../models/workflow/workflowsteptransitiontypemst.js');

let WorkFlowStepTransition = sequelize.define('WorkFlowStepTransition', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    work_flow_step_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow_step', // 'workflow_step' refers to table name
            key: 'id', // 'id' refers to column name in workflow_step table
        }
    },
    is_automatic : Sequelize.BOOLEAN,
    wf_step_from_id : Sequelize.STRING,
    wf_step_to_id : Sequelize.STRING,
    transition_type_id :{
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow_step_transition_type_mst', // 'workflow_step_transition_type_mst' refers to table name
            key: 'id', // 'id' refers to column name in workflow_step_transition_type_mst table
        }
    },
    transition_desc: Sequelize.STRING,
    max_duration_in_days: Sequelize.INTEGER,
    max_times: Sequelize.BIGINT,
    step_notify_template_id  :{
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow_step', // 'workflow_step' refers to table name
            key: 'id', // 'id' refers to column name in workflow_step table
        }
    },
    step_notify_escalation_template_id: Sequelize.BOOLEAN,
    step_end_flag: Sequelize.BOOLEAN,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlowStepTransition',
    freezeTableName: true,
    tableName: 'workflow_step_transitions',
});

WorkFlowStepTransition.sync();
WorkFlowStepTransition.belongsTo(WorkFlowStep);
WorkFlowStepTransition.belongsTo(WorkFlowStepTransitonTypeMst);

module.exports = {
    WorkFlowStepTransition
};