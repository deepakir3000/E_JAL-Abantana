const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {OperationalSource} = require('./../../models/mdm/operationalSource.js');
const {Application} = require('./../../models/formaction/applicationdetails.js');

let WaterRequisirion = sequelize.define('WaterRequisirion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    op_quantity: Sequelize.FLOAT,
    op_quantity_in_cusec: Sequelize.FLOAT,
    certificate: Sequelize.STRING,
    joint_report: Sequelize.STRING,
    cal_of_quantity: Sequelize.STRING,
    operational_source_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_operational_source', // 'mst_operational_source' refers to table name
            key: 'id', // 'id' refers to column name in mst_operational_source table
        }
    },
    application_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_details', // 'application_details' refers to table name
            key: 'id', // 'id' refers to column name in application_details table
        }
    },
    dam_id: Sequelize.INTEGER,
    river_id: Sequelize.INTEGER,
    op_quantity_sur: Sequelize.FLOAT,
    op_quantity_sur_in_cusec: Sequelize.FLOAT,
    cgwa_certificate: Sequelize.STRING,
    source_id: Sequelize.INTEGER,
    source_dam_id: Sequelize.INTEGER,
    source_river_id: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'WaterRequisirion',
    freezeTableName: true,
    tableName: 'water_req_docs',
});

WaterRequisirion.sync();
WaterRequisirion.belongsTo(OperationalSource);
WaterRequisirion.belongsTo(Application);

module.exports = {
    WaterRequisirion
};