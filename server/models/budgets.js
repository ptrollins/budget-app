const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BudgetsSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'Users', unique: true },
    category: String,
    amount: Number,
    period: String,
    end: Date,
  },
  {
    timestamps: true,
  }
);

const Budgets = mongoose.model('Budgets', BudgetsSchema);

module.exports.getBudgetsByUser = ({ _id }) => {
  return Budgets.find({ user: _id }).exec();
};

module.exports.createBudget = (budget) => {
  return Budgets.create(budget);
};

module.exports.updateBudget = (budget) => {
  return Budgets.findOneAndUpdate(
    { user: budget.user, category: budget.category },
    budget,
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec();
};

module.exports.deleteBudget = (budget) => {
  return Budgets.deleteOne(budget);
};
