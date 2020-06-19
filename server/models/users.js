const mongoose = require("mongoose");

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

const Users = mongoose.model("Users", UsersSchema);

module.exports.getUser = (username) => {
  return Users.findOne({ username: username }).exec();
};

module.exports.createUser = (user) => {
  return Users.create(user);
};
