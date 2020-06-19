const db = require('./index.js');
var { budgets, transactions, users } = require('../server/models');

const sampleUsers = [
  {
    username: 'julia',
    password: 'password',
    salt: '',
    firstName: 'Julia',
    lastName: 'McNeill',
  },
  {
    username: 'preston',
    password: 'password',
    salt: '',
    firstName: 'Preston',
    lastName: 'Rollins',
  },
];

const sampleTransactions = [];

const sampleBudget = [];

const insertSampleBlogs = function () {
  users
    .create(sampleUsers)
    .then(() => {
      return transactions.create(sampleTransactions);
    })
    .then(() => {
      return budgets.createBudget(sampleBudget);
    })
    .then(() => db.disconnect());
};

insertSampleBlogs();
