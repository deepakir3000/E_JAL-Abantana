const {Sequelize} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let AllocationDetails = sequelize.define('AllocationDetails', {
    Alloc_SlNo: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Industry_Code: Sequelize.STRING,
    Allocation_CD: Sequelize.STRING,
    Basin: Sequelize.INTEGER,
    River_Nalla: Sequelize.INTEGER,
    Dam: Sequelize.INTEGER,
    Aggrement_OrderNo: Sequelize.STRING,
    Aggrement_Qty: Sequelize.FLOAT,
    Aggrement_DT: Sequelize.DATE,
    From_DT: Sequelize.DATE,
    To_DT: Sequelize.DATE,
    IP_Address: Sequelize.STRING,
    Phase: Sequelize.CHAR(1),
    IP_Address: Sequelize.STRING,
    Insert_DT: Sequelize.DATE,
    Update_Date:{
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    UpdateIPAddress: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'AllocationDetails',
    freezeTableName: true,
    tableName: 'allocation_detail',
});

AllocationDetails.sync();

module.exports = {
    AllocationDetails
};