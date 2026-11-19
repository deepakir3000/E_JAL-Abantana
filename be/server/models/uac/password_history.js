const {Sequelize} = require('sequelize');
let sequelize = require('./../../config/seqlize');

let PasswordHistory = sequelize.define('PasswordHistory', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true
  },
  user_id: Sequelize.STRING,
  user_password: Sequelize.STRING,
  created_on: Sequelize.DATE,
}, {
  sequelize,
  modelName: 'PasswordHistory',
  freezeTableName: true,
  tableName: 'password_history',
});
PasswordHistory.sync();
module.exports = {
  PasswordHistory
}
