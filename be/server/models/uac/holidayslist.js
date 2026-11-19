const {
    Sequelize
} = require('sequelize');
const {
    Status
} = require('./../../models/uac/status.js');
let sequelize = require('./../../config/seqlize');

let Holidays = sequelize.define('Holidays', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    status_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_status', // 'mst_status' refers to table name
            key: 'id', // 'id' refers to column name in mst_status table
        }
    },
    name: Sequelize.STRING,
    hol_date: Sequelize.DATE,
    saka_era: Sequelize.STRING,
    week_day: Sequelize.STRING,
    no_of_days: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'Holidays',
    freezeTableName: true,
    tableName: 'mst_holidays',
});

Holidays.sync();
Holidays.belongsTo(Status);

module.exports = {
    Holidays
};