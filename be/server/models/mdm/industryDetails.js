const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let IndustryDetailsMst = sequelize.define('IndustryDetailsMst', {
    serial_no: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    industry_code: Sequelize.STRING,
    industry_name: Sequelize.STRING,
    division: Sequelize.STRING,
    address: Sequelize.STRING,
    pin: Sequelize.STRING,
    ip_address: Sequelize.STRING,
    created_on:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    status: Sequelize.CHAR(1),
    Special_Ind: Sequelize.INTEGER,
    type: Sequelize.STRING
}, {
    sequelize,
    modelName: 'IndustryDetailsMst',
    freezeTableName: true,
    tableName: 'mst_industry_details',
});

IndustryDetailsMst.sync();

module.exports = {
    IndustryDetailsMst
};