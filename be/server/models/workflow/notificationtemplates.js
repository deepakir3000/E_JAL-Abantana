const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let NotificationTemplates = sequelize.define('NotificationTemplates', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    template_sms: Sequelize.STRING,
    template_email: Sequelize.STRING,
    status: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_status', // 'mst_status' refers to table name
            key: 'id', // 'id' refers to column name in mst_status table
        }
    },
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'NotificationTemplates',
    freezeTableName: true,
    tableName: 'notification_templates',
});

NotificationTemplates.sync();

module.exports = {
    NotificationTemplates
};