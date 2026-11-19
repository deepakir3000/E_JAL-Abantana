const {
    Sequelize
} = require('sequelize');

let sequelize = require('./../../config/seqlize');

let feedbackQuestion = sequelize.define('feedbackQuestion', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    feedback__questions: Sequelize.STRING,
}, {
    sequelize,
    modelName: 'feedbackQuestion',
    freezeTableName: true,
    tableName: 'mst_feedback_questions',
});

feedbackQuestion.sync();


module.exports = {
    feedbackQuestion
};