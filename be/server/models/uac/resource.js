const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = require('./../../config/seqlize');

class Resource extends Model {}
Resource.init({
  id: { type: Sequelize.INTEGER, primaryKey: true },
  resource_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Resource Name Cant be null"
      },
      notEmpty: true,
      notEmpty:{
        msg: "Resource Name Cant be empty"
      }
    }
  },
  link_text: Sequelize.STRING,
  icon: Sequelize.STRING,
  resource_description: Sequelize.STRING,
  icon_type: Sequelize.STRING,
  status: Sequelize.INTEGER,
  sub_menu: Sequelize.INTEGER,
  seq_order: Sequelize.INTEGER,
  has_sub_menu: Sequelize.BOOLEAN,
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
  modelName: 'resources',
  freezeTableName: true,
  // define the table's name
  tableName: 'resources',
});

module.exports = {
    Resource
}