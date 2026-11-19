const {
  check,
  validationResult
} = require('express-validator');
var fs = require('fs');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./server/utils/application.properties');
var fileUploaded = require('../../utils/fileupload');
var {
  authenticate
} = require('../../middleware/authenticate')
const uacServices = require('../../services/uac/UacServiceImpl');
const {
  logger
} = require('./../../config/log-config');
const LOG = logger.getLogger('UacController.js');
//demo
// var demo = (req, res)=>{
//   LOG.info('Inside UacController demo');
//   res.status(200).send("SUCCESS");
// };

//validate method
const validator = (method) => {
  LOG.debug("inside validator..");
  var arr;
  switch (method) {
    case 'createUser': {
      LOG.debug("initializing createUser validators..");
      arr = [
        check('userName', 'userName doesn\'t exists').exists(),

        check('email', 'Invalid email').exists().isEmail(),

        check('displayName').exists(),

        check('password').exists(),
        check('confirmPassword').exists(),
        check('confirmPassword', 'Passwords do not match').custom((value, {
          req
        }) => (value === req.body.password)),

        check('roleId').exists().isInt(),

        check('phone').exists().isInt(),

        check('status').isInt().isIn([1, 0]),
      ];
      break;
    }
    case 'createRole': {
      LOG.debug("initializing createRole validators..");
      arr = [
        check('roleName', 'roleName doesn\'t exists').exists(),

        check('status').isInt().isIn([1, 0]),
      ];
      break;
    }
    case 'editRole': {
      LOG.debug("initializing editRole validators..");
      arr = [
        check('id', 'role id  doesn\'t exists').exists(),

        check('roleName', 'roleName doesn\'t exists').exists(),

        check('status').isInt().isIn([1, 0]),
      ];
      break;
    }
    case 'editUser': {
      LOG.debug("initializing editUser validators..");
      arr = [
        // check('id', 'User id  doesn\'t exists').exists(),

        // check('userName', 'userName doesn\'t exists').exists(),

        // check('email', 'Invalid email').exists().isEmail(),

        // check('displayName').exists(),

        // check('roleId').exists().isInt(),

        // check('phone').exists().isInt(),

        // check('status').isInt().isIn([1, 0]),
      ];
      break;
    }
    case 'createResource': {
      LOG.debug("initializing createResource validators..");
      arr = [
        check('resourceName', 'resourceName doesn\'t exists').exists(),

        check('linkText', 'linkText doesn\'t exists').exists(),

        check('status').isInt().isIn([1, 0]),
      ];
      break;
    }
    case 'editResource': {
      LOG.debug("initializing editRole validators..");
      arr = [
        check('id', 'Resource id  doesn\'t exists').exists(),

        check('resourceName', 'Resource Name doesn\'t exists').exists(),

        check('linkText', 'linkText doesn\'t exists').exists(),

        check('status').isInt().isIn([1, 0]),
      ];
      break;
    }
    case 'resourceMapping': {
      LOG.debug("initializing resourceMapping validators..");
      arr = [
        check('roleId', 'Role id  doesn\'t exists').exists(),

      ];
      break;
    }case 'changePassword': {
      LOG.debug("initializing forgetPassword validators..");
      arr = [
        check('oldPassword', 'old password doesn\'t exists').exists(),

        check('password', 'password doesn\'t exists').exists(),
      ];
      break;
    }
  }
  return arr;
};

//createUser
const createUser = async (req, res) => {
  LOG.info('Inside createUser');
  res.setHeader('Content-Type', 'application/json');

  const errors = validationResult(req); // Finds the validationResult
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    }).send();
    return;
  };

  // const { userName, email, displayName, password, phone, status } = req.body;
  // LOG.debug(userName + ' # ' + email + ' # ' + displayName + ' # ' + password + ' # ' + phone + ' # '+ status);


  var data = await uacServices.createUser(req)
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
    res.status(400);
  } else {
    res.status(201); //as new user is created
  }
  LOG.info(data);
  res.send(data);
};

//editUser
const editUser = async (req, res) => {
  LOG.info('Inside editUser');
  res.setHeader('Content-Type', 'application/json');

  const errors = validationResult(req); // Finds the validationResult
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    }).send();
    return;
  };
  const file = req.file
  req.body.filename = (file === undefined ? null : file.filename)
  console.log('File Status ', file);
  fileUploaded.checkDirectorySync(properties.get('media.file') + properties.get('profile.image'));
  if(req.body.filename !== null){
    let path = properties.get('media.file') + properties.get('profile.image') + properties.get('path.seperator') + req.user.id;
    fileUploaded.checkDirectorySync(path);
    fs.rename(properties.get('media.file') + req.body.filename, path + properties.get('path.seperator') + req.body.filename, function(err) {
      if (err) throw err;
      console.log('Move complete.');
    });
  }
  var data = await uacServices.editUser(req)
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
    res.status(400);
  } else {
    res.status(201); //as new user is created
  }
  LOG.info(data);
  res.send(data);
};

//getUsers
const getUsers = async (req, res) => {
  LOG.info('Inside getUsers');
  res.setHeader('Content-Type', 'application/json');

  var pageNo = 0;
  var size = 0;
  var query = {
    status: 1,
    order: "ASC"
  };
  var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
  var order = (req.query.order != null && ["ASC", "DESC"].includes(req.query.order.toString().trim().toUpperCase())) ? req.query.order.toString().trim().toUpperCase() : "ASC";
  console.log('test ' + paginated);
  if (paginated) {
    pageNo = parseInt(req.query.pageNumber);
    size = parseInt(req.query.pageSize);
    if (pageNo < 0 || pageNo == 0) {
      res.status(404);
      res.send({
        "message": "invalid page number"
      });
      return;
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
  }

  var data = await uacServices.getAllUsers(query);
  if (data.message != 'SUCCESS') {
    res.status(500);
  } else if (data.data.length == 0) {
    data.message = 'No roles found.';
    res.status(404);
  } else {
    res.status(200);
  }
  // LOG.info(JSON.stringify(data, undefined, 2));
  LOG.info(data);
  res.send(data);
};

//getRoles
const getRoles = async (req, res) => {
  LOG.info('Inside getRoles');
  res.setHeader('Content-Type', 'application/json');

  var pageNo = 0;
  var size = 0;
  var query = {
    status: 1,
    order: "ASC"
  };
  var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
  var order = (req.query.order != null && ["ASC", "DESC"].includes(req.query.order.toString().trim().toUpperCase())) ? req.query.order.toString().trim().toUpperCase() : "ASC";
  console.log(paginated);
  if (paginated) {
    pageNo = parseInt(req.query.pageNumber);
    size = parseInt(req.query.pageSize);

    if (pageNo < 0 || pageNo == 0) {
      res.status(404);
      res.send({
        "message": "invalid page number"
      });
      return;
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
  }

  var data = await uacServices.getAllRoles(query);
  if (data.message != 'SUCCESS') {
    res.status(500);
  } else if (data.data.length == 0) {
    data.message = 'No roles found.';
    res.status(404);
  } else {
    res.status(200);
  }
  LOG.info(data);
  res.send(data);
};

const createRole = async (req, res) => {
  LOG.info('Inside createRole');
  res.setHeader('Content-Type', 'application/json');

  var data = await uacServices.createRole(req)
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE') {
    res.status(400);
  } else {
    res.status(201); //as new role is created
  }
  // LOG.info(JSON.stringify(data, undefined, 2));
  LOG.info(data);
  res.send(data);
};

const editRole = async (req, res) => {
  LOG.info('Inside editRole');
  res.setHeader('Content-Type', 'application/json');

  var data = await uacServices.editRole(req);
  if (data.message != 'SUCCESS') {
    res.status(500);
  } else if (data.data.length != 0) {
    data.message = 'Role is already exist.';
    res.status(404);
  } else {
    res.status(200);
  }
  // LOG.info(JSON.stringify(data, undefined, 2));
  LOG.info(data);
  res.send(data);
};

//createResource
const createResource = async (req, res) => {
  LOG.info('Inside createResource');
  res.setHeader('Content-Type', 'application/json');

  const errors = validationResult(req); // Finds the validationResult
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    }).send();
    return;
  };

  const {
    resourceName,
    linkText,
    icon,
    resourceDescription,
    iconType,
    status,
    seq_order,
    sub_menu
  } = req.body;
  LOG.debug(resourceName + ' # ' + linkText + ' # ' + icon + ' # ' + resourceDescription + ' # ' + iconType + ' # ' + status);

  var data = await uacServices.createResource(req)
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE') {
    res.status(400);
  } else {
    res.status(201); //as new user is created
  }
  LOG.info(data);
  res.send(data);
};

//editResource
const editResource = async (req, res) => {
  LOG.info('Inside editResource');
  res.setHeader('Content-Type', 'application/json');

  const errors = validationResult(req); // Finds the validationResult
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    }).send();
    return;
  };

  const {
    id,
    resourceName,
    linkText,
    icon,
    resourceDescription,
    iconType,
    status
  } = req.body;
  LOG.debug(id + '#' + resourceName + ' # ' + linkText + ' # ' + icon + ' # ' + resourceDescription + ' # ' + iconType + ' # ' + status);

  var data = await uacServices.editResource(req)
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE') {
    res.status(400);
  } else {
    res.status(201); //as new user is created
  }
  LOG.info(data);
  res.send(data);
};

//getResource
const getResource = async (req, res) => {
  LOG.info('Inside getResource');
  res.setHeader('Content-Type', 'application/json');

  var pageNo = 0;
  var size = 0;
  var query = {
    status: 1,
    order: "ASC"
  };
  var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
  var order = (req.query.order != null && ["ASC", "DESC"].includes(req.query.order.toString().trim().toUpperCase())) ? req.query.order.toString().trim().toUpperCase() : "ASC";

  if (paginated) {
    pageNo = parseInt(req.query.pageNumber);
    size = parseInt(req.query.pageSize);

    if (pageNo < 0 || pageNo == 0) {
      res.status(404);
      res.send({
        "message": "invalid page number"
      });
      return;
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
  }

  var data = await uacServices.getAllResources(query);
  if (data.message != 'SUCCESS') {
    res.status(500);
  } else if (data.data.length == 0) {
    data.message = 'No Resource found.';
    res.status(404);
  } else {
    res.status(200);
  }
  // LOG.info(JSON.stringify(data, undefined, 2));
  LOG.info(data);
  res.send(data);
};

const mapRoleResource = async (req, res) => {
  LOG.info('Inside mapRoleResource');
  res.setHeader('Content-Type', 'application/json');
  const errors = validationResult(req); // Finds the validationResult
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    }).send();
    return;
  };
  const {
    roleId,
    resource
  } = req.body;
  LOG.debug(roleId + '#' + resource[0].id + ' # ' + resource[0].status);

  var data = await uacServices.mapRoleResource(req)
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE') {
    res.status(400);
  } else {
    res.status(201); //as new role is created
  }
  // LOG.info(JSON.stringify(data, undefined, 2));
  LOG.info(data);
  res.send(data);
};

//getRoleResource
const getRoleResource = async (req, res) => {
  LOG.info('Inside getRoleResource');
  res.setHeader('Content-Type', 'application/json');

  var pageNo = 0;
  var size = 0;
  var query = {
    status: 1,
    order: "ASC"
  };
  var paginated = req.query.isPaginationRequired == null ? false : req.query.isPaginationRequired;
  var order = (req.query.order != null && ["ASC", "DESC"].includes(req.query.order.toString().trim().toUpperCase())) ? req.query.order.toString().trim().toUpperCase() : "ASC";

  if (paginated) {
    pageNo = parseInt(req.query.pageNumber);
    size = parseInt(req.query.pageSize);

    if (pageNo < 0 || pageNo == 0) {
      res.status(404);
      res.send({
        "message": "invalid page number"
      });
      return;
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
  }
  query.roleId = req.query.roleId;
  var data = await uacServices.getAllRoleResources(query);
  if (data.message != 'SUCCESS') {
    res.status(500);
  } else if (data.data.length == 0) {
    data.message = 'No Role Resource found.';
    res.status(404);
  } else {
    res.status(200);
  }
  LOG.info(data);
  res.send(data);
};

//getParentResource
const getParentResource = async (req, res) => {
  LOG.info('Inside getParentResource');
  res.setHeader('Content-Type', 'application/json');

  var query = {
      status: 1,
      order: "ASC"
  };

  var data = await uacServices.getAllParentResource();
  if(data.message != 'SUCCESS'){
      res.status(500);
  }
  else if(data.data.length == 0){
    data.message = 'No Parent Resource found.';
    res.status(404);
  }else{
    res.status(200);
  }
  LOG.info(data);
  res.send(data);
};

//getUIResource
const getUIResource = async (req, res) => {
  LOG.info('Inside getUIResource');
  res.setHeader('Content-Type', 'application/json');

  var query = {
      status: 1,
      order: "ASC"
  };

  var data = await uacServices.getUIResource(req);
  if(data.message != 'SUCCESS'){
      res.status(500);
  }
  else if(data.data.length == 0){
    data.message = 'No Parent Resource found.';
    res.status(404);
  }else{
    res.status(200);
  }
  LOG.info(data);
  res.send(data);
};

//getAllEE
const getAllEE = async (req, res) => {
  LOG.info('Inside getAllEE');
  res.setHeader('Content-Type', 'application/json');

  var data = await uacServices.getAllEE(req);
  if(data.message != 'SUCCESS'){
      res.status(500);
  }
  else if(data.data.length == 0){
    data.message = 'No Executive Engineer found.';
    res.status(404);
  }else{
    res.status(200);
  }
  LOG.info(data);
  res.send(data);
};

//changePassword
const changePassword = async (req, res) => {
  LOG.info('Inside changePassword.');
  const errors = validationResult(req); // Finds the validationResult
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array()
    }).send();
    return;
  };
  var data =  await uacServices.changePassword(req);
  if (data.status === 'FAILURE') {
    res.status(500);
  } else if (data.status === 'DUPLICATE' || data.status === 'INVALID') {
    res.status(400).send(data);
  } else {
    res.status(200).send(data); //as new user is created
  }
};

module.exports = {
  // demo,
  validator,
  createUser,
  getRoles, getUsers,
  createRole,editUser,
  editRole,createResource,editResource,getResource,mapRoleResource,getRoleResource,
  getParentResource,getUIResource,getAllEE,changePassword
}
