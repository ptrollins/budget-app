var { budgets } = require("../models");

module.exports = {
  get: (req, res) => {
    budgets
      .getBudgetsByUser(req.query.username)
      .then((budgets) => {
        res.status(200).send(budgets);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  post: (req, res) => {
    budgets
      .createBudget(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  put: (req, res) => {
    budgets
      .updateBudget(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  delete: (req, res) => {
    budgets
      .deleteBudget(req.query)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
