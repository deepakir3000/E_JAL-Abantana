const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let Industry = sequelize.define('Industry', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    industry_name: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'Industry',
    freezeTableName: true,
    tableName: 'mst_industries',
});

Industry.sync();

module.exports = {
    Industry
};