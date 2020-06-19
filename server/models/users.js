const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    username: String,
    password: String,
    salt: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('Users', UsersSchema);

module.exports.getUser = ({ username }) => {
  return Users.find(
    { username: username },
    'username, firstName, lastName'
  ).exec();
};

module.exports.getUserPassword = ({ username }) => {
  return Users.findOne({ username: username }, 'password salt').exec();
};

module.exports.createUser = (user) => {
  return Users.create(user);
};

module.exports.updateUser = (user) => {
  return Users.findOneAndUpdate({ username: user.username }, user, {
    new: true,
    useFindAndModify: false,
  }).exec();
};

module.exports.deleteBudget = (budget) => {
  return Users.deleteOne(budget);
};
