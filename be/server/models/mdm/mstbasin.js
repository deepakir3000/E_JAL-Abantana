const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let Basin = sequelize.define('Basin', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    basin_name: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'Basin',
    freezeTableName: true,
    tableName: 'mst_basin',
});

Basin.sync();

module.exports = {
    Basin
};