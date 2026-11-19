const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = require('./../../config/seqlize');
// const jwt = require('jsonwebtoken');
const _ = require('lodash');
// const {User} = require('./user');

class UserToken extends Model {}
UserToken.init({
  user_id: { type: Sequelize.INTEGER},
  jwt_token: Sequelize.STRING,
  created_on:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
   }
  },
  {
    sequelize,
    modelName: 'user_tokens',
    freezeTableName: true,
    tableName: 'user_tokens'
  });


module.exports = {
    UserToken
}
