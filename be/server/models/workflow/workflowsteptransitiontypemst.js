const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let WorkFlowStepTransitonTypeMst = sequelize.define('WorkFlowStepTransitonTypeMst', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    transition_type: Sequelize.STRING,
    transition_type_desc: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlowStepTransitonTypeMst',
    freezeTableName: true,
    tableName: 'workflow_step_transition_type_mst',
});

WorkFlowStepTransitonTypeMst.sync();

module.exports = {
    WorkFlowStepTransitonTypeMst
};