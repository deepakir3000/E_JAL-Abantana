const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {WorkFlowTypeMst} = require('./../../models/workflow/workflowtypemst.js');

let WorkFlow = sequelize.define('WorkFlow', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    workflow_name: Sequelize.STRING,
    workflow_desc: Sequelize.STRING,
    workflow_type_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'workflow_type_mst', // 'workflow_type_mst' refers to table name
            key: 'id', // 'id' refers to column name in workflow_type_mst table
        }
    },
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlow',
    freezeTableName: true,
    tableName: 'workflow',
});

WorkFlow.sync();
WorkFlow.belongsTo(WorkFlowTypeMst);

module.exports = {
    WorkFlow
};