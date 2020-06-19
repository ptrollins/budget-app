var { budgets, transactions, users } = require('./controllers');
var router = require('express').Router();

// Budgets
router.get('/budgets', budgets.get);
router.post('/budgets', budgets.post);

// Transactions
router.get('/transactions', transactions.get);
router.post('/transactions', transactions.post);

// Users
router.get('/users', users.get);
router.post('/users', users.post);

module.exports = router;
