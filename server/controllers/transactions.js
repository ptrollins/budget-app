var { transactions } = require('../models');

module.exports = {
  get: (req, res) => {
    let user = req.query.user;
    transactions
      .getTransactionsByUser(user)
      .then((transactions) => {
        console.log('get transactions success: ', transactions);
        res.status(200).send(transactions);
      })
      .catch((err) => {
        console.log('getTransactions: ', err);
        res.sendStatus(500);
      });
  },

  post: (req, res) => {
    transactions
      .createTransaction()
      .then((transactions) => {
        console.log('post transaction success: ', transactions);
        res.status(201);
      })
      .catch((err) => {
        console.log('createTransaction: ', err);
        res.sendStatus(500);
      });
  },

  put: (req, res) => {
    transactions
      .updateTransaction()
      .then((transactions) => {
        console.log('post transaction success: ', transactions);
        res.status(201);
      })
      .catch((err) => {
        console.log('updateTransaction: ', err);
        res.sendStatus(500);
      });
  },

  delete: (req, res) => {
    transactions
      .deleteTransaction()
      .then((transactions) => {
        console.log('delete transaction success: ', transactions);
        res.status(200);
      })
      .catch((err) => {
        console.log('deleteTransaction: ', err);
        res.sendStatus(500);
      });
  },
};
