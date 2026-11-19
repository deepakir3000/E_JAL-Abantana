const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');


const TreasuryTransaction = sequelize.define('TreasuryTransaction', {
    TrsID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    Industry_Code: Sequelize.STRING,
    Trs_Head_Proces: Sequelize.STRING,
    Trs_Head_Secu: Sequelize.STRING,
    Amount_Proces: Sequelize.FLOAT,
    Amount_Secu: Sequelize.FLOAT,
    GWS: Sequelize.FLOAT,
    GW: Sequelize.FLOAT,
    IW: Sequelize.FLOAT,
    Status: Sequelize.STRING,
    EE_Code: Sequelize.STRING,
    IP_Address: Sequelize.STRING,
    Created_DT: Sequelize.STRING,
    PaymentTowards: Sequelize.STRING,
    Purpose_cd: Sequelize.STRING,
    deptRefId:  Sequelize.STRING,
    appId: {
        type: Sequelize.STRING,
        field: 'appId', 
    },
    jtoken: Sequelize.STRING
    }, {
    sequelize,
    modelName: 'TreasuryTransaction',
    freezeTableName: true,
    tableName: 'TreasuryTransaction',
    underscored: false,
});

TreasuryTransaction.sync();


module.exports = {
    TreasuryTransaction
};