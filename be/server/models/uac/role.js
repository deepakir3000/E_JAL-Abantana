const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = require('./../../config/seqlize');

class Role extends Model {}
Role.init({
  id: { type: Sequelize.INTEGER, primaryKey: true },
  role_name: Sequelize.STRING,
  status: Sequelize.INTEGER,
  created_by: Sequelize.BIGINT,
  created_on:Sequelize.DATE,
  updated_by: Sequelize.BIGINT,
  updated_on:Sequelize.DATE
},
{
  sequelize,
  modelName: 'mst_roles',
  freezeTableName: true,
  // define the table's name
  tableName: 'mst_roles',
});

module.exports = {
    Role
}
