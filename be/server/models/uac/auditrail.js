const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let AuditTrail = sequelize.define('AuditTrail', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    event_action: Sequelize.STRING,
    event_dt_time:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    ip_add: Sequelize.STRING,
    user_name: Sequelize.STRING,
    action_status: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'AuditTrail',
    freezeTableName: true,
    tableName: 'audit_trail',
});

AuditTrail.sync();

module.exports = {
    AuditTrail
};