const express = require('express');
var {cpool} = require('../../db/sql');
const {logger} = require('./../../config/log-config');
const {AppConstants} = require('./../../utils/AppConstants');
const hashing = require('../../middleware/sha512-hash');
const {seqlize} = require('./../../config/seqlize');
const {Role} = require('./../../models/uac/role');
const {Status} = require('./../../models/uac/status');
const {Resource} = require('./../../models/uac/resource');
const {Role_Resource} = require('./../../models/uac/role_resource');
const {PasswordHistory} = require('./../../models/uac/password_history');
const {User} = require('../../models/uac/user');
const {Holidays} = require('../../models/uac/holidayslist.js');
const email = require('./../../config/email_sms/email');
const {IndustryDetailsMst} = require('./../../models/mdm/industryDetails.js');
const LOG = logger.getLogger('UacServiceImpl.js');
const _ = require('lodash');
const Sequelize = require('sequelize');

//getRoles
const getAllRoles = async (query) => {
  LOG.info('Inside UacServiceImpl getRoles');
  let data = {
    message: '',
    data: {},
    totalPages:0,
    totalElements:0
  };

  var totalPages = 0;

  try {

        const { count, rows, result } = await Role.findAndCountAll({
          offset: query.skip,
          limit: query.limit,
          order: [["id", query.order]],
          attributes:['id','role_name','status'],
          raw: true
        });

        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages =  Math.floor((count / query.limit) + (count % (query.limit) > 0 ? 1 : 0)) ;
        data.totalElements = count;

    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

  //getAllUsers
const getAllUsers = async (query) => {
  LOG.info('Inside UacServiceImpl getAllUsers');
  let data = {
    message: '',
    data: {},
    totalPages:0,
    totalElements:0
  };
  try {

        const { count, rows, result } = await User.findAndCountAll({
          offset: query.skip,
          limit: query.limit,
          order: [["id", query.order]],
          attributes:['id','user_name','display_name','mobile','email','status','role_id','first_login'],
          /* include: [{
            model: Role,
            as: 'role'
          }], */
          raw: true
        });

        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages =  Math.floor((count / query.limit) + (count % (query.limit) > 0 ? 1 : 0)) ;
        data.totalElements = count;

    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

//createRole
const createRole = async (req) => {
  LOG.info('Inside UacServiceImpl createRole');
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
        var maxId = await Role.max('id');
        console.log(req.body.roleName);
        var result = await Role.findAll({
          where: {
            role_name: req.body.roleName
          },
          raw: true
        });
        if(result.length != 0){
          LOG.error("Role already exist with this name..." + result);
          data.status = 'DUPLICATE';
          data.message = 'Role already exists';
          data.data = result;
        }else{
            const result = await Role.create({
            id: isNaN(maxId) ? 1 : maxId + 1,
            role_name: req.body.roleName,
            status: req.body.status,
            created_by: req.user.id,
            updated_by:req.user.id,
          });
          data.message = 'Role created.';
          data.data = result;
        }
    } catch (err) {
      LOG.error("SQL error!!!");
      data.status = 'FAILURE';
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

//editRole
const editRole = async (req) => {
  LOG.info('Inside UacServiceImpl editRole');
  let data = {
    message: '',
    data: {}
  };
  try {
        const result = await Role.update({
          role_name: req.body.roleName,
          status: req.body.status,
          updated_by:req.user.id,
        }, {
          where: {id: req.body.id}
        })
        console.log(result);
        LOG.debug(result);
        if(result[0] == 0){
          data.message = 'SUCCESS';
          data.data = result
        }else{
          data.message = 'SUCCESS';
          data.data = [];
        }
    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

  //createUser
  const createUser = async (req) => {
    LOG.info('Inside UacServiceImpl createUser');
    let reqData = req.body;
    let data = {
      status: 'SUCCESS',
      message: '',
      data: {}
    };
    try {
          console.log(hashing.decrypt(reqData.userName));
          reqData.userName = hashing.decrypt(reqData.userName);
          var maxId = await User.max('id');
          LOG.debug('Max ID-> '+ maxId);
          var role = await Role.findOne({
            where: {
              id: reqData.roleId
            },
            raw: true
          });
          if(role == null){
            LOG.error("Role does not exists.");
            data.status = 'INVALID';
            data.message = 'Role not exists';
          }else{
            let firstLogin = false;
            if(role.id === 3){
              firstLogin = true;
            }
            var result = await User.findAll({
              where: {
                user_name: reqData.userName
              },
              raw: true
            });
            LOG.debug('user data-> '+ result);
            if(result.length != 0){
              LOG.error("User already exist. result: " + result);
              data.status = 'DUPLICATE';
              data.message = 'User already exists';
              data.data = result;
            }else{
                maxId = isNaN(maxId) ? 1 : maxId + 1;
                LOG.debug(`Inserting user with id :${maxId} & ${JSON.stringify(reqData)}`);
                const result = await User.create({
                id: maxId,
                user_name: reqData.userName,
                email: reqData.email,
                role_id:role.id,
                mobile: reqData.phone,
                first_login: firstLogin,
                user_password: reqData.password,
                display_name: reqData.displayName,
                status: reqData.status,
                created_by: req.user.id,
                updated_by:req.user.id,
              });
              data.message = 'User created.';
              data.data = result;
            }
          }
      } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        // data.message = err.message;
    }
    LOG.debug(data);
    return data;
  };

    //mapRoleResource
const mapRoleResource = async (req) => {
  LOG.info('Inside UacServiceImpl mapRoleResource');
  let reqData = req.body
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
        var maxId = await Role_Resource.max('id')
        console.log(maxId);
        var role = await Role.findOne({
          where: {
            id: reqData.roleId
          },
          raw: true
        });
        
        for(let i = 0; i< reqData.resource.length; i++ ){
          var roleresource = await Role_Resource.findOne({
            where: {
              role_id:reqData.roleId,
              resource_id: reqData.resource[i].id
            },
            raw: true
          });
          if(reqData.resource[i].status == 1 && roleresource != null){
            const result = await Role_Resource.update({
              role_id: role.id,
              resource_id:reqData.resource[i].id,
              status: reqData.resource[i].status,
              updated_by:req.user.id,
            },
            {
              where: {id: roleresource.id}
            });
            data.data = result;
          }else if(reqData.resource[i].status == 1 && roleresource == null){
            var maxId = await Role_Resource.max('id');
            var status = reqData.resource[i].status;
            const result = await Role_Resource.create({
              id: isNaN(maxId) ? 1 : maxId + 1,
              role_id: role.id,
              resource_id:reqData.resource[i].id,
              status: status,
              created_by: req.user.id,
              updated_by:req.user.id,
            });
            data.data = result;
          }else if(reqData.resource[i].status != 1 && roleresource != null){
            const result = await Role_Resource.update({
              role_id: role.id,
              resource_id:reqData.resource[i].id,
              status: reqData.resource[i].status,
              updated_by:req.user.id,
            },
            {
              where: {id: roleresource.id}
            });
            data.data = result;
          }
      }
      data.message = 'Role Resource mapped Successfully.';
   } catch (err) {
      LOG.error("SQL error!!!");
      data.status = 'FAILURE';
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

  //editUser
  const editUser = async (req) => {
    LOG.info('Inside UacServiceImpl editUser');
    let reqData = req.body;
    let data = {
      status: 'SUCCESS',
      message: '',
      data: {}
    };
    try {
          console.log(reqData.body);
          reqData = JSON.parse(hashing.decrypt(reqData.body));
          console.log('test1111:::: ' + reqData);
          var role = await Role.findOne({
            where: {
              id: reqData.roleId
            },
            raw: true
          });
          if(role == null){
            LOG.error("Role does not exists.");
            data.status = 'INVALID';
            data.message = 'Role not exists';
          }else{
            let userId = reqData.id;
            if(reqData.id == 0){
              userId = req.user.id;
            }
            LOG.debug(`Updating user with id :${userId} & ${JSON.stringify(reqData)}`);
            const result = await User.update({
              email: reqData.email,
              role_id:role.id,
              mobile: reqData.phone,
              display_name: reqData.displayName,
              profile_image_url:reqData.filename,
              status: reqData.status,
              updated_by:req.user.id,
          },{
            where: {id: userId}
          });
          data.message = 'User Updated.';
          data.data = result;
          }
      } catch (err) {
        LOG.error("SQL error!!!");
        data.status = 'FAILURE';
        data.message = err.message;
    }
    LOG.debug(data);
    return data;
  };

  //createResource
const createResource = async (req) => {
  LOG.info('Inside UacServiceImpl createResource');
  let reqData = req.body;
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
        var maxId = await Resource.max('id')
        var result = await Resource.findAll({
          where: {
            resource_name: reqData.resourceName,
            status: AppConstants.ACTIVE

          },
          raw: true
        });
        if(result.length != 0){
          LOG.error("Resource already exist with this name..." + result);
          data.status = 'DUPLICATE';
          data.message = 'Resource already exists';
          data.data = result;
        }else{
            maxId = isNaN(maxId) ? 1 : maxId + 1
            const result = await Resource.create({
            id: maxId,
            resource_name: reqData.resourceName,
            link_text:reqData.linkText,
            icon:reqData.icon,
            resource_description:reqData.resourceDescription,
            icon_type:reqData.iconType,
            seq_order: reqData.seq_order,
            sub_menu: reqData.sub_menu,
            has_sub_menu: false,
            status: reqData.status,
            created_by: req.user.id,
            updated_by:req.user.id,
          });
          if(reqData.sub_menu != 0){
            const resou = await Resource.update({
              has_sub_menu: true,
            }, {
              where: {id: reqData.sub_menu}
            })
          }
          data.message = 'Resource created.';
          data.data = result;
        }
    } catch (err) {
      LOG.error("SQL error!!!");
      data.status = 'FAILURE';
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

  //createResource
const editResource = async (req) => {
  LOG.info('Inside UacServiceImpl editResource');
  let reqData = req.body;
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
    const result = await Resource.update({
      resource_name: reqData.resourceName,
      link_text:reqData.linkText,
      icon:reqData.icon,
      resource_description:reqData.resourceDescription,
      icon_type:reqData.iconType,
      seq_order: reqData.seq_order,
      sub_menu: reqData.sub_menu,
      status: reqData.status,
      updated_by:req.user.id,
      update_on: 'GETDATE()'
    }, {
      where: {id: reqData.id}
    })
    if(reqData.sub_menu != 0){
      const resou = await Resource.update({
        has_sub_menu: true,
      }, {
        where: {id: reqData.sub_menu}
      })
    }
    LOG.debug(result);
    if(result[0] == 0){
      data.message = 'Resource Id is not exist..';
      data.status = 'FAILURE';
      data.data = result
    }else{
      data.message = 'SUCCESS';
      data.message = 'Resource is Updated Successfully..';
      data.data = [];
    }
  } catch (err) {
    LOG.error("SQL error!!!");
    data.status = 'FAILURE';
    // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

  //getAllResources
const getAllResources = async (query) => {
  LOG.info('Inside UacServiceImpl getAllResources');
  let data = {
    message: '',
    data: {},
    totalPages:0,
    totalElements:0
  };
  try {
        const { count, rows, result } = await Resource.findAndCountAll({
          offset: query.skip,
          limit: query.limit,
          order: [["id", query.order]],
          attributes:['id','resource_name','link_text','icon','resource_description','icon_type','status','seq_order','sub_menu','has_sub_menu'],
          raw: true
        });

        data.message = 'SUCCESS';
        data.data = rows;
        data.totalPages =  Math.floor((count / query.limit) + (count % (query.limit) > 0 ? 1 : 0)) ;
        data.totalElements = count;

    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

//getAllRoleResources
const getAllRoleResources = async (query) => {
  LOG.info('Inside UacServiceImpl getAllRoleResources');
  let data = {
    message: '',
    data: {},
    totalPages:0,
    totalElements:0
  };
  try {
        const role_resource = await Role_Resource.findAll({
          attributes:['id','resource_id','role_id'],
          where: {
            role_id: query.roleId,
            status: 1
          },
          raw: true
        },
      );
      const { count, rows, result } = await Resource.findAndCountAll({
        offset: query.skip,
        limit: query.limit,
        order: [["id", query.order]],
        attributes:['id','resource_name','link_text','icon','resource_description','icon_type','status'],
        where: {
          status: 1
        },
        raw: true
      });
      //Compare both List And Change Status
      rows.forEach((e1)=>{
        e1.isMapped = false;
        role_resource.forEach((e2)=>{
            if(e1.id === e2.resource_id){
              e1.isMapped = true;
            }
        })
      })
      data.data = rows;
      data.message = 'SUCCESS';
      data.totalPages =  Math.floor((count / query.limit) + (count % (query.limit) > 0 ? 1 : 0)) ;
      data.totalElements = count;

    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

  //getAllParentResource
const getAllParentResource = async () => {
  LOG.info('Inside UacServiceImpl getAllParentResource');
  let data = {
    message: '',
    data: {},
  };
  try {
        const resource = await Resource.findAll({
          attributes:['id','resource_name'],
          where: {
            status: 1,
            sub_menu: 0
          },
          raw: true
        },
      );
      
      data.data = resource;
      data.message = 'SUCCESS';
    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

//getUIResource
const getUIResource = async (req) => {
  LOG.info('Inside UacServiceImpl getUIResource');
  let data = {
    message: '',
    data: {},
  };
  try {
    const role_resource = await Role_Resource.findAll({
      attributes:['id','resource_id','role_id'],
      where: {
        role_id: req.role.id,
        status: AppConstants.ACTIVE
      },
      raw: true
      },
    );
    
    //Compare both List And Change Status
      var arr = new Array();
      if(role_resource != null){
        role_resource.forEach((e2)=>{
          arr.push(e2.resource_id);
        })
      }
      const resource = await Resource.findAll({
        attributes:['id','resource_name','link_text','icon','resource_description','icon_type','sub_menu','seq_order','has_sub_menu'],
        where: {
          id: arr,
          status: 1
        },
        raw: true
        },
      );

      data.data = resource;
      data.message = 'SUCCESS';
    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

//getAllEE
const getAllEE = async (req) => {
  LOG.info('Inside UacServiceImpl getAllEE');
  let type = req.query.type;
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  let toId = null;
  if(req.query.id !== undefined){
    let industries = null;
    if(req.query.id !== 0 ){
      industries = await IndustryDetailsMst.findOne({
        attributes:['serial_no','industry_name','division'],
        where: {
            serial_no: req.query.id
        },
        raw: true
    })
    if(industries != null){
        toId = industries.division;
    }
    }
  }
console.log('USERNAMEEEEEEE',toId);
  if(type !== undefined){
    if(type === 'null' || type === null){
      type = 'EE';
    }
  }

  let users = null;
  try {
      if(type === 'EE'){
        if(toId !== null){
          users = await User.findAll({
              attributes:['id','user_name','display_name','mobile','email','status','role_id'],
              where:{
                user_name: toId
              },
              raw: true
          });
        }else{
          users = await User.findAll({
            attributes:['id','user_name','display_name','mobile','email','status','role_id'],
            where:{
              role_id: AppConstants.EE
            },
            raw: true
        });
        }
      }else if(type === 'CE'){
        users = await User.findAll({
          attributes:['id','user_name','display_name','mobile','email','status','role_id'],
          where:{
            role_id: AppConstants.CE
          },
          raw: true
        });
      }
      data.data = (users === null ? [] : users);
      data.message = 'SUCCESS';
    } catch (err) {
      LOG.error("SQL error!!!");
      // data.message = err.message;
  }
  LOG.debug(data);
  return data;
  };

//changePassword
const changePassword = async (req) => {
  LOG.info('Inside changePassword',req.body);
  let data = {
    status: 'SUCCESS',
    message: '',
    data: {}
  };
  try {
    if(req.user.user_password === req.body.password){
      LOG.info('You can not set password same as previous');
      data.status = 'INVALID';
      data.message = 'You can not set password same as previous';
    }else{
        if(req.body.oldPassword === req.body.password){
          LOG.info('Old password and new password should not be same');
          data.status = 'INVALID';
          data.message = 'Old password and new password should not be same';
        }else{
          LOG.debug(req.user.user_name + " : ");
          const user = await User.findByCredentials(req.user.user_name, req.body.oldPassword,'change');
          LOG.debug(user);
          if(user !== null){
            let passwordHistory = null;
            try {
              passwordHistory = await PasswordHistory.findAll({
                limit: 3,
                order: [["id", "Desc"]],
                attributes:['id','user_id','user_password'],
                where : {
                  user_id: req.user.id
                }
              });
            } catch (error) {
              LOG.info('Some Exception Occured..');
            }
            let counter = 0;
            if(passwordHistory !== null) {
              if(passwordHistory.length > 0) {
                _.forEach(passwordHistory, async(item) =>{
                  if(item.user_password === req.body.password){
                    counter = counter + 1;
                  }
                });
              }
            }
            if(counter !== 0){
              LOG.info('You can not set password same as last 3');
              data.status = 'INVALID';
              data.message = 'You can not set password same as last 3';
            }else {
              var maxId = await PasswordHistory.max('id')
              const password = await PasswordHistory.create({
                id: isNaN(maxId) ? 1 : maxId + 1,
                user_id: req.user.id,
                user_password: req.user.user_password,
                created_on:new Date(),
              });
              let result  = await User.update({
                user_password: req.body.password,
                first_login: false,
                updated_on:Sequelize.fn('GETDATE')
              },{
                  where: {
                      user_name: user.user_name
                  }
              })
              LOG.info('Password Changed Successfully : ' + user.email);
              data.message = 'Password Changed Successfully';
            }
          }else{
            data.status = 'INVALID';
            data.message = 'Username is not exist';
          }
        }
      }
  } catch (err) {
    console.log(err);
    data.status = 'INVALID';
    data.message = 'Old Password is not correct';
  }
  return data;
};

module.exports = {
      getAllRoles,createRole,editRole,createUser,editUser,createResource,editResource,getAllResources,
      mapRoleResource,getAllUsers,getAllRoleResources,getAllParentResource,getUIResource,getAllEE,changePassword
}
  // app.post('/todos', authenticate, (req, res)=>{
  //   console.log(req.body);
  //   var newTodo = new Todo({
  //     text : req.body.text,
  //     _creator : req.user._id
  //   });
  //   newTodo.save().then((doc) => {
  //     res.send(doc);
  //   }, (e) => {
  //     res.status(400).send(e);
  //   });
  // });

  // app.get('/todos',authenticate, (req, res)=>{
  //   Todo.find({
  //     _creator : req.user._id
  //   }).then((todos)=>{
  //     // res.send(todos);
  //     res.send({
  //       todos,
  //       status : 'OK'
  //     });
  //   }, (err)=>{
  //     res.status(400).send(e);
  //   });
  // });

  // app.get('/todos/:id', authenticate, (req, res)=>{
  //   var id = req.params.id;
  //   if(!ObjectId.isValid(id)){
  //     res.status(404).send();
  //   }
  //   Todo.findOne({
  //     _id : id,
  //     _creator : req.user._id
  //   }).then((todo) => {
  //     if(!todo){
  //       res.status(404).send();
  //     }
  //     res.send({  todo });
  //   }).catch((err) =>{
  //     res.status(400).send(err);
  //   });

  // });

  // app.delete('/todos/:id',authenticate, async (req, res) => {
  //   var id = req.params.id;
  //   if(!ObjectId.isValid(id)){
  //     res.status(404).send();
  //   }
  //   try{
  //     var todo = await Todo.findOneAndRemove({
  //       _id : id,
  //       _creator : req.user._id
  //     });
  //     if(!todo){
  //       res.status(404).send();
  //     }
  //     res.send({  todo });
  //   }catch(err){
  //     res.status(400).send(err);
  //   }
  // });


  // app.patch('/todos/:id',authenticate, (req, res)=>{
  //   var id = req.params.id;
  //   var body = _.pick(req.body,['text','completed']);//this checks if any of these two values are present in req body, as we don't update anything else
  //   if(!ObjectId.isValid(id)){
  //     res.status(404).send();
  //   }

  //   if(_.isBoolean(body.completed) && body.completed){
  //     body.completedAt = new Date().getTime();
  //   }else{
  //     body.completed = false;
  //     body.completedAt = null;
  //   }
  //   Todo.findOneAndUpdate({
  //     _id : id,
  //     _creator : req.user._id
  //   }, {$set : body}, {new : true}).then((todo) => {
  //     if(!todo){
  //       res.status(404).send();
  //     }
  //     res.send({  todo });
  //   }).catch((err) =>{
  //     res.status(400).send(err);
  //   });
  // });

  // app.post('/users', async(req, res) => {
  //   try{
  //     const body = _.pick(req.body, ['email', 'password']);
  //     const user = new User(body);
  //     await user.save();
  //     var token = await user.generateAuthToken();
  //     res.header('x-auth', token).send(user);
  //   }catch(e){
  //     res.status(400).send(e);
  //   }
  // });

  // app.get('/users/me',authenticate,(req, res) =>{
  //   res.send(req.user);
  // });
  // app.get('/users',(req, res)=>{
  //   User.find().then((users)=>{

  //     // users = _.map(users, function(user) {
  //     //   return _.pick(user, ['email', 'password']);
  //     // });
  //     res.send({
  //       users,
  //       status : 'OK'
  //     });
  //   }, (err)=>{
  //     res.status(400).send(e);
  //   });
  // });

  //login
  // app.post('/users/login', (req, res) => {
  //   var body = _.pick(req.body, ['email', 'password']);
  //
  //   User.findByCredentials(body.email, body.password).then((user) => {
  //     //res.send(user);
  //     return user.generateAuthToken().then((token) =>{
  //       res.header('x-auth', token).send(user);
  //     });
  //   }).catch((err)=>{
  //     res.status(400).send();
  //   });
  //
  // });

  // app.post('/users/login', async (req, res) => {
  //   try{
  //     const body = _.pick(req.body, ['email', 'password']);
  //     const user = await User.findByCredentials(body.email, body.password);
  //     const token = await user.generateAuthToken();
  //     res.header('x-auth', token).send(user);
  //   }catch(err){
  //     res.status(400).send();
  //   }
  // });

  //logout
  // app.delete('/users/me/token', authenticate, (req, res) => {
  //   req.user.removeToken(req.token).then(() => {
  //     res.status(200).send();
  //   }, () => {
  //     res.status(400).send();
  //   })
  // });

  // app.delete('/users/me/token', authenticate, async (req, res) => {
  //   try{
  //     await req.user.removeToken(req.token);
  //     res.status(200).send();
  //   }catch(err){
  //     res.status(400).send();
  //   }
  // });
