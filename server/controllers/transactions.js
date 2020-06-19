var { transactions } = require("../models");

module.exports = {
  get: (req, res) => {
    transactions
      .getTransactionsByUser(req.query)
      .then((transactions) => {
        res.status(200).send(transactions);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  post: (req, res) => {
    transactions
      .createTransaction(req.body)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  delete: (req, res) => {
    transactions
      .deleteTransaction(req.query)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
};
