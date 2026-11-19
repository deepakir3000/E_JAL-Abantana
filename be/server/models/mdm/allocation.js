const {Sequelize} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let Allocation = sequelize.define('Allocation', {
    SerialNo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Industry_Code: Sequelize.STRING,
    Source_CD: Sequelize.STRING,
    Purpose_CD: Sequelize.STRING,
    Allocation_Qty: Sequelize.FLOAT,
    Order_No: Sequelize.STRING,
    Order_DT: Sequelize.DATE,
    Allocation_Code: Sequelize.STRING,
    Phase: Sequelize.CHAR(1),
    ip_address: Sequelize.STRING,
    InsertDT: Sequelize.DATE,
    Aggrement_Status: Sequelize.STRING,
    Allocation_Status: Sequelize.STRING,
    Update_Date:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    UpdateIPAddress: Sequelize.STRING,
    Previous_Allocation_Code: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'Allocation',
    freezeTableName: true,
    tableName: 'allocation',
});

Allocation.sync();

module.exports = {
    Allocation
};