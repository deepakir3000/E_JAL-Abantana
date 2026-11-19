const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let payment_jform = sequelize.define('payment_jform', {
    app_id: Sequelize.INTEGER,
    trsid: Sequelize.INTEGER,
    trs_head_secu: Sequelize.STRING,
    amount_process: Sequelize.FLOAT,
    amount_secu: Sequelize.FLOAT,
    status: Sequelize.STRING,
    bank_transaction_id: Sequelize.STRING,
    ref_no: Sequelize.STRING,
    dept_ref_id: Sequelize.STRING,
    bank_trs_dt: Sequelize.DATE,
    chalan_no_process: Sequelize.STRING,
    chalan_dt_process: Sequelize.DATE,
    chalan_no_secu: Sequelize.STRING,
    chalan_dt_secu: Sequelize.DATE,
}, {
    sequelize,
    modelName: 'payment_jform',
    freezeTableName: true,
    tableName: 'payment_jform',
});

payment_jform.sync();


module.exports = {
    payment_jform
};