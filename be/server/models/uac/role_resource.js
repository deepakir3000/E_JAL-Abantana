const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = require('./../../config/seqlize');

class Role_Resource extends Model {}
Role_Resource.init({
  id: { type: Sequelize.INTEGER, primaryKey: true },
  role_id : {
    type: Sequelize.BIGINT,
    references: {
        model: 'mst_roles',
        key: 'id'
      }
  },
  resource_id: {
    type: Sequelize.BIGINT,
    references: {
        model: 'resources',
        key: 'id'
      }
  },
  status: Sequelize.INTEGER,
  created_by: {
    type: Sequelize.BIGINT,
    references: {
        model: 'mst_user',
        key: 'id'
      }
  },
  created_on:Sequelize.DATE,
  updated_by: {
    type: Sequelize.BIGINT,
    references: {
        model: 'mst_user',
        key: 'id'
      }
  },
  updated_on:Sequelize.DATE
},
{
  sequelize,
  modelName: 'role_resources',
  freezeTableName: true,
  // define the table's name
  tableName: 'role_resources',
});

module.exports = {
    Role_Resource
}