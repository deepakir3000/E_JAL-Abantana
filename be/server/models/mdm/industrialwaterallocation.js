const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let IndustrialWaterAllocation = sequelize.define('IndustrialWaterAllocation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name_of_river_basin: Sequelize.STRING,
    avg_non_monsoon_flow_in_cusec: Sequelize.FLOAT,
    water_allocation_no: Sequelize.INTEGER,
    water_allocation_qty: Sequelize.FLOAT,
    allocation_of_nonmonsoon_in_percentage: Sequelize.FLOAT,
    drawal_in_cusec: Sequelize.FLOAT,
    recomendation_no: Sequelize.INTEGER,
    recomendation_ext_industries: Sequelize.INTEGER,
    recomendation_addl_qty: Sequelize.FLOAT,
    total_no: Sequelize.INTEGER,
    total_qty: Sequelize.FLOAT,
    recomendation_allocation_in_percentage: Sequelize.FLOAT,
    remarks: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'IndustrialWaterAllocation',
    freezeTableName: true,
    tableName: 'industrial_water_allocation_details',
});

IndustrialWaterAllocation.sync();

module.exports = {
    IndustrialWaterAllocation
};