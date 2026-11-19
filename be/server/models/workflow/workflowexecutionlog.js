const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let WorkflowExecutionLog = sequelize.define('WorkflowExecutionLog ', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    obj_id: Sequelize.INTEGER,
    wf_id : Sequelize.INTEGER,
    wf_step_id : Sequelize.BIGINT,
    wf_step_transition_id : Sequelize.BIGINT,
    from_id: Sequelize.BIGINT,
    to_id: Sequelize.BIGINT,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    remarks: Sequelize.STRING,
    allocation_file: Sequelize.STRING,
    wac_date: Sequelize.STRING,
    raise_query:Sequelize.INTEGER
}, {
    sequelize,
    modelName: 'WorkflowExecutionLog',
    freezeTableName: true,
    tableName: 'workflow_execution_log ',
});

WorkflowExecutionLog.sync();

module.exports = {
    WorkflowExecutionLog
};