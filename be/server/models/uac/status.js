const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let Status = sequelize.define('Status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    status_name: Sequelize.STRING,
    display_name: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'Status',
    freezeTableName: true,
    tableName: 'mst_status',
});

Status.sync();

module.exports = {
    Status
};