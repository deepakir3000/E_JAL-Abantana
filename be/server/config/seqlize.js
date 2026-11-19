const Sequelize = require('sequelize');
const config = require('./../db/dbpool-config.json');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.server,
  dialect:  'mssql',
  pool: config.pool,
  define: {
    underscored: true,
    timestamps: false
  }
});
sequelize
.authenticate()
.then(() => {
  console.log('Seqlize Connection has been established successfully.');
})
.catch(err => {
  console.error('Seqlize Unable to connect to the database:', err);
});

module.exports = sequelize;
