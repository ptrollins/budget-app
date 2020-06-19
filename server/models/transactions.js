const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', unique: true },
  category: String,
  amount: Number,
  date: Date,
});

const Transactions = mongoose.model('Transactions', TransactionsSchema);

module.exports.getTransactionsByUser = ({ _id }) => {
  return Transactions.find({ user: _id }).exec();
};

module.exports.createTransaction = (transaction) => {
  return Transactions.create(transaction);
};

module.exports.updateTransaction = ({ _id, category }) => {
  return Transactions.findOneAndUpdate(
    { user: _id },
    { $push: { Transactions: category } },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec();
};

module.exports.deleteBudget = (budget) => {
  return Transactions.deleteOne(budget);
};
