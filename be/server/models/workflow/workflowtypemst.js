const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let WorkFlowTypeMst = sequelize.define('WorkFlowTypeMst', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    workflow_type: Sequelize.STRING,
    workflow_type_desc: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlowTypeMst',
    freezeTableName: true,
    tableName: 'workflow_type_mst',
});

WorkFlowTypeMst.sync();

module.exports = {
    WorkFlowTypeMst
};