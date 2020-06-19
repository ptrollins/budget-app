const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TransactionsSchema = new Schema(
  {
    username: String,
    budget: String,
    name: String,
    budget: String,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

const Transactions = mongoose.model("Transactions", TransactionsSchema);

module.exports.getTransactionsByUser = (query) => {
  return Transactions.find({
    username: query.username,
    budget: query.budget,
  }).exec();
};

module.exports.createTransaction = (transaction) => {
  return Transactions.create(transaction);
};

module.exports.deleteTransaction = (budget) => {
  return Transactions.deleteOne(budget).exec();
};
