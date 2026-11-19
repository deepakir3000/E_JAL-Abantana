const {
    Sequelize
} = require('sequelize');
let sequelize = require('./../../config/seqlize');
const {Application} = require('./../../models/formaction/applicationdetails.js');


let LocationDetails = sequelize.define('LocationDetails', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    application_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'application_details', // 'application_details' refers to table name
            key: 'id', // 'id' refers to column name in application_details table
        }
    },
    intake_loc: Sequelize.STRING,
    intake_latitude: Sequelize.STRING,
    intake_longitude: Sequelize.STRING,
    industry_loc: Sequelize.STRING,
    industry_latitude: Sequelize.STRING,
    industry_longitude: Sequelize.STRING,
    recomend_letter: Sequelize.STRING,
    mou_signed: Sequelize.STRING,
    created_by: Sequelize.BIGINT,
    created_on: Sequelize.DATE,
    updated_by: Sequelize.BIGINT,
    updated_on: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'LocationDetails',
    freezeTableName: true,
    tableName: 'location_docs',
});

LocationDetails.sync();
LocationDetails.belongsTo(Application);

module.exports = {
    LocationDetails
};