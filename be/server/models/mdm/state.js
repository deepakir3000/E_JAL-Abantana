const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let State = sequelize.define('State', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    state_name: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
    code_name: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'State',
    freezeTableName: true,
    tableName: 'mst_states',
});

State.sync();

module.exports = {
    State
};