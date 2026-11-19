const {
    Sequelize
} = require('sequelize');

const {Basin} = require('./../../models/mdm/mstbasin.js');

let sequelize = require('./../../config/seqlize');

let River = sequelize.define('River', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    basin_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_basin', // 'mst_districts' refers to table name
            key: 'id', // 'id' refers to column name in mst_districts table
        }
    },
    river_name: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'River',
    freezeTableName: true,
    tableName: 'mst_river',
});

River.sync();
River.belongsTo(Basin);

module.exports = {
    River
};