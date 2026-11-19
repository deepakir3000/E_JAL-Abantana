const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {Application} = require('./../../models/formaction/applicationdetails.js');


let WaterManagement = sequelize.define('WaterManagement', {
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
    layout_drawal: Sequelize.STRING,
    disposal_method: Sequelize.STRING,
    drawal_water: Sequelize.STRING,
    water_mgmt: Sequelize.STRING,
    allocation_order: Sequelize.STRING,
    industry_details: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WaterManagement',
    freezeTableName: true,
    tableName: 'water_mgmt_docs',
});

WaterManagement.sync();
WaterManagement.belongsTo(Application);

module.exports = {
    WaterManagement
};