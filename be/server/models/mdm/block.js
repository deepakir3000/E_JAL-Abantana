const {
    Sequelize
} = require('sequelize');
const {
    District
} = require('./../../models/mdm/district.js');
let sequelize = require('./../../config/seqlize');

let Block = sequelize.define('Block', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    district_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'mst_districts', // 'mst_districts' refers to table name
            key: 'id', // 'id' refers to column name in mst_districts table
        }
    },
    block_name: Sequelize.STRING,
    status: Sequelize.INTEGER,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'Block',
    freezeTableName: true,
    tableName: 'mst_blocks',
});

Block.sync();
Block.belongsTo(District);

module.exports = {
    Block
};