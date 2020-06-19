var { users } = require('../models');

module.exports = {
  get: (req, res) => {
    console.log('In users get');
    const username = req.query.username;
    users
      .getUser(username)
      .then((users) => {
        console.log('get users success: ', users);
        res.status(200).send(users);
      })
      .catch((err) => {
        console.log('getUser: ', err);
        res.sendStatus(500);
      });
  },

  post: (req, res) => {
    const user = req.body;
    users
      .createUser(user)
      .then((users) => {
        console.log('post users success: ', users);
        res.status(201);
      })
      .catch((err) => {
        console.log('createUser: ', err);
        res.sendStatus(500);
      });
  },

  // put: (req, res) => {
  //   users
  //     .updateUser()
  //     .then((users) => {
  //       console.log('post users success: ', users);
  //       res.status(201);
  //     })
  //     .catch((err) => {
  //       console.log('updateUser: ', err);
  //       res.sendStatus(500);
  //     });
  // },

  // delete: (req, res) => {
  //   users
  //     .deleteUser()
  //     .then((users) => {
  //       console.log('delete users success: ', users);
  //       res.status(200);
  //     })
  //     .catch((err) => {
  //       console.log('deleteUser: ', err);
  //       res.sendStatus(500);
  //     });
  // },
};
