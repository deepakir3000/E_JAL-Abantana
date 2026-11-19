const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let WorkFlowRules = sequelize.define('WorkFlowRules', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    rule_name: Sequelize.STRING,
    rule_desc: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WorkFlowRules',
    freezeTableName: true,
    tableName: 'workflow_rules',
});

WorkFlowRules.sync();

module.exports = {
    WorkFlowRules
};