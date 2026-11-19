const {
    Sequelize
} = require('sequelize');
const {State} = require('./../../models/mdm/state.js');
let sequelize = require('./../../config/seqlize');

let District = sequelize.define('District', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    state_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_states', // 'mst_states' refers to table name
            key: 'id', // 'id' refers to column name in mst_states table
        }
    },
    district_name: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'District',
    freezeTableName: true,
    tableName: 'mst_districts',
});

District.sync();
District.belongsTo(State);

module.exports = {
    District
};