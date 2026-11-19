const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {Application} = require('./../../models/formaction/applicationdetails.js');

let PhaseWise = sequelize.define('PhaseWise', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    application_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_details', // 'application_details' refers to table name
            key: 'id', // 'id' refers to column name in application_details table
        }
    },
    from_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    to_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    unit: Sequelize.FLOAT,
    unit_in_cusec: Sequelize.FLOAT,
    cgwa_certificate: Sequelize.STRING,
    is_deleted: Sequelize.BOOLEAN,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'PhaseWise',
    freezeTableName: true,
    tableName: 'phase_wise_req_details',
});

PhaseWise.sync();
PhaseWise.belongsTo(Application);

module.exports = {
    PhaseWise
};