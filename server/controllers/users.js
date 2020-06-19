var { users } = require("../models");

module.exports = {
  get: (req, res) => {
    users
      .getUser(req.query.username)
      .then((user) => {
        if (user.password === req.query.password) {
          res.status(200).send(user);
        } else {
          res.sendStatus(403);
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(403);
      });
  },

  post: (req, res) => {
    users
      .createUser(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
