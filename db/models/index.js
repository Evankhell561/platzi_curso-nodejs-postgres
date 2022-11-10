const { UserSchema, User } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  return User;
}

module.exports = setupModels;
