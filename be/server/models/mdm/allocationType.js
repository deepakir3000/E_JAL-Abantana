const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let AllocationType = sequelize.define('AllocationType', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    application_type: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'AllocationType',
    freezeTableName: true,
    tableName: 'mst_allocation_type',
});

AllocationType.sync();

module.exports = {
    AllocationType
};