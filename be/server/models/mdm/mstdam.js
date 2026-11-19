const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');
const {Basin} = require('./../../models/mdm/mstbasin.js');

let Dam = sequelize.define('Dam', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    basin_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_basin', 
            key: 'id', 
        }
    },
    dam_name: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'Dam',
    freezeTableName: true,
    tableName: 'mst_dam',
});

Dam.sync();
Dam.belongsTo(Basin);

module.exports = {
    Dam
};