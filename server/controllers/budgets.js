var { budgets } = require('../models');

module.exports = {
  get: (req, res) => {
    let user = req.query.user;
    budgets
      .getBudgetsByUser(user)
      .then((budgets) => {
        console.log('get budgets success: ', budgets);
        res.status(200).send(budgets);
      })
      .catch((err) => {
        console.log('getBudgets: ', err);
        res.sendStatus(500);
      });
  },

  post: (req, res) => {
    budgets
      .createBudget()
      .then((budgets) => {
        console.log('post budgets success: ', budgets);
        res.status(201);
      })
      .catch((err) => {
        console.log('createBudget: ', err);
        res.sendStatus(500);
      });
  },

  put: (req, res) => {
    budgets
      .updateBudget()
      .then((budgets) => {
        console.log('post budgets success: ', budgets);
        res.status(201);
      })
      .catch((err) => {
        console.log('updateBudget: ', err);
        res.sendStatus(500);
      });
  },

  delete: (req, res) => {
    budgets
      .deleteBudget()
      .then((budgets) => {
        console.log('delete budgets success: ', budgets);
        res.status(200);
      })
      .catch((err) => {
        console.log('deleteBudget: ', err);
        res.sendStatus(500);
      });
  },
};
