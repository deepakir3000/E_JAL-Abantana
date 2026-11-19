const { Sequelize, Model, DataTypes } = require('sequelize');
let sequelize = require('./../../config/seqlize');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
// const bcrypt = require('bcryptjs');
const hashing = require('../../middleware/sha512-hash');

class User extends Model {}
User.init({
  id: { type: Sequelize.BIGINT, primaryKey: true },
  user_name: Sequelize.STRING,
  user_password: {
    type: Sequelize.STRING
  },
  display_name: Sequelize.STRING,
  mobile: Sequelize.STRING,
  email: Sequelize.STRING,
  otp_secret: Sequelize.STRING,
  otp_validity: Sequelize.STRING,
  profile_image_url: Sequelize.STRING,
  first_login: Sequelize.BOOLEAN,
  role_id: {//This is the default role which user has
    type: Sequelize.INTEGER,
    references: {
        model: 'mst_role',
        key: 'id'
      }
  },
  status: Sequelize.INTEGER,
  created_by: Sequelize.STRING,
  created_on:Sequelize.DATE,
  updated_by: Sequelize.STRING,
  updated_on:Sequelize.DATE
  },
  {
    sequelize,
    modelName: 'mst_users',
    freezeTableName: true,
    // define the table's name
    tableName: 'mst_users',
    hooks: {
      beforeValidate: async (user, options) => {
        console.log('beforeSave executed...');
        // let err;
        if (user.changed('user_password')){
          console.log('password changed...');
          // let salt, hash;
          // salt = await bcrypt.genSalt(10);
          // console.log('salt',salt);
          // hash = await bcrypt.hash(user.user_password, salt);
          // console.log('hash',hash);
          // user.user_password = hash;
        }
      }//end bv
    }
  });



User.findByCredentials = function(username, password, salt){
  var user = this;
  console.log('findByCredentials executed...' + username);

  return User.findOne({where: { user_name : username}}).then((user) => {
    console.log(user);
    if(user !== null){
      if(!user){
          return new Promise().reject();
      }
      return new Promise((resolve, reject) => {
        // console.log('##############... '+password);
        // console.log('JSON.......',JSON.stringify(user));
        //check password by bcrypt compare first
        console.log('Salt ' + salt);
        console.log('Old PAssword ' + user.user_password);
        if(salt !== undefined){
          if(salt !== null){
            if(salt !== 'change'){
              user.user_password = hashing.getHashedPassword(user.user_password + '#' + salt)
              console.log('NEW PAssword ' +  user.user_password);
            }
          }
        }
        isMatch = hashing.compare(password,user.user_password)
        console.log('NEW PAssword ' +  isMatch);
        if (isMatch) {
          resolve(user);
        }else{
          resolve(null);
        }
        // hashing.compare(password,user.user_password, (err, res) =>{
        //   if(res){
        //     resolve(user);
        //   }else{
        //     resolve(null);
        //   }
        // });
      });
    }
  });
};

User.prototype.generateAuthToken = function(){
    console.log('generateAuthToken executed...');
    var user = this;
    var access = 'auth';
    console.log(JSON.stringify(this));
    //TODO:- roles to be added
    var token = null;
    try{
      token = jwt.sign({
        user_id : this.id, 
        role_id: this.role_id,
        access
      }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION}).toString();
      console.log('AuthToken:',token);
    }catch(err){
      console.log(err);
    }
    // user.tokens.push({access,token});
    // user.tokens = user.tokens.concat([{access,token}]);

    return token;


    // return UserToken.save().then(() => {
    //   return token;
    // });
};

module.exports = {
    User
}
