const sql = require("mssql");
const config = require('./dbpool-config.json');
const {logger} = require('./../config/log-config');
const LOG = logger.getLogger('sql.js');
// connect to your database
// sql.connect(process.env.SQL_URI, function (err) {
//
//     if (err) console.log(err);
//     else console.log('DataBase Connected');
//     // create Request object
// });

// const cpool = new sql.ConnectionPool('mssql://' + config.user + ':' + config.password + '@' + config.server + ':' + '1433/' + config.database); // TODO:- enable tcp in mssql service of server

// connect to your database
const cpool = sql.connect(config, function (err) {
    if (err) console.log(err);
    else console.log('DataBase Connected');
});

module.exports = {
  sql, cpool
}

