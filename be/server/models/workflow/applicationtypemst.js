const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let ApplicationTypeMst = sequelize.define('ApplicationTypeMst', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.BIGINT,
    application_type_desc: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'ApplicationTypeMst',
    freezeTableName: true,
    tableName: 'application_type_mst',
});

ApplicationTypeMst.sync();

module.exports = {
    ApplicationTypeMst
};