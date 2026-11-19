const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let OperationalSource = sequelize.define('OperationalSource', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    operational_source: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'OperationalSource',
    freezeTableName: true,
    tableName: 'mst_operational_source',
});

OperationalSource.sync();

module.exports = {
    OperationalSource
};