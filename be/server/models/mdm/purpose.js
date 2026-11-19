const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let Purpose = sequelize.define('Purpose', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    purpose_name: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'Purpose',
    freezeTableName: true,
    tableName: 'mst_purposes',
});

Purpose.sync();

module.exports = {
    Purpose
};