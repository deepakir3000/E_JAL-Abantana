const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let feedback = sequelize.define('feedback', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    question_id: Sequelize.INTEGER,
    questions: Sequelize.STRING,
    answer: Sequelize.STRING,
    user_id: Sequelize.INTEGER
}, {
    sequelize,
    modelName: 'feedback',
    freezeTableName: true,
    tableName: 'feedback',
});

feedback.sync();


module.exports = {
    feedback
};