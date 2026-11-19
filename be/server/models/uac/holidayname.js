const {Sequelize} = require('sequelize');
// const {Status} = require('./../../models/uac/status.js');

let sequelize = require('./../../config/seqlize');

let Holidayname = sequelize.define('Holidayname', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },

    holiday_name: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'Holidayname',
    freezeTableName: true,
    tableName: 'mst_holidayname',
});

Holidayname.sync();
// Holidayname.belongsTo(Status);

module.exports = {
    Holidayname
};