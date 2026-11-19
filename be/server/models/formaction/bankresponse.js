const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {Application} = require('./../../models/formaction/applicationdetails.js');

let BankResponse = sequelize.define('BankResponse', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    application_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_details', // 'application_details' refers to table name
            key: 'id', // 'id' refers to column name in application_details table
        }
    },
    txn_id: Sequelize.STRING,
    status: Sequelize.STRING,
    txn_ts: Sequelize.STRING,
    challan_amt: Sequelize.FLOAT,
    address: Sequelize.STRING,
    challan_ref: Sequelize.STRING,
    err_details: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'BankResponse',
    freezeTableName: true,
    tableName: 'payment_details',
});

BankResponse.sync();
BankResponse.belongsTo(Application);

module.exports = {
    BankResponse
};