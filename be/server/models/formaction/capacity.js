const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {Application} = require('./../../models/formaction/applicationdetails.js');


let Capacity = sequelize.define('Capacity', {
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
    present_capacity_in_kld: Sequelize.FLOAT,
    present_capacity_unit: Sequelize.STRING,
    future_capacity_in_kld: Sequelize.FLOAT,
    future_capacity_unit: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'Capacity',
    freezeTableName: true,
    tableName: 'capacity_details',
});

Capacity.sync();
Capacity.belongsTo(Application);

module.exports = {
    Capacity
};