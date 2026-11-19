const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {District} = require('./../../models/mdm/district.js');
const {Block} = require('./../../models/mdm/block.js');
const {Industry} = require('./../../models/mdm/industry.js');
const {Application} = require('./../../models/formaction/applicationdetails.js');

let IndustryDeatils = sequelize.define('IndustryDeatils', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    industry_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_industries', // 'mst_industries' refers to table name
            key: 'id', // 'id' refers to column name in mst_industries table
        }
    },
    application_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_details', // 'application_details' refers to table name
            key: 'id', // 'id' refers to column name in application_details table
        }
    },
    pan_no: Sequelize.STRING,
    address: Sequelize.STRING,
    pin_code: Sequelize.INTEGER,
    others : Sequelize.STRING,
    district_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_districts', // 'mst_districts' refers to table name
            key: 'id', // 'id' refers to column name in mst_districts table
        }
    },
    block_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_blocks', // 'mst_blocks' refers to table name
            key: 'id', // 'id' refers to column name in mst_blocks table
        }
    },
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'IndustryDeatils',
    freezeTableName: true,
    tableName: 'industries_details',
});

IndustryDeatils.sync();
IndustryDeatils.belongsTo(Industry);
IndustryDeatils.belongsTo(District);
IndustryDeatils.belongsTo(Block);
IndustryDeatils.belongsTo(Application);

module.exports = {
    IndustryDeatils
};