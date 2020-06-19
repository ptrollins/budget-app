const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BudgetsSchema = new Schema(
  {
    username: String,
    name: String,
    amount: Number,
    period: String,
  },
  {
    timestamps: true,
  }
);

const Budgets = mongoose.model("Budgets", BudgetsSchema);

module.exports.getBudgetsByUser = (username) => {
  return Budgets.find({ username: username }).exec();
};

module.exports.createBudget = (budget) => {
  return Budgets.create(budget);
};

module.exports.updateBudget = (replacementInfo) => {
  return Budgets.findOneAndUpdate(
    { username: replacementInfo.username, name: replacementInfo.oldBudgetName },
    {
      name: replacementInfo.newBudgetName,
      amount: replacementInfo.newBudgetAmount,
    },
    {
      new: true,
      useFindAndModify: false,
    }
  ).exec();
};

module.exports.deleteBudget = (query) => {
  return Budgets.deleteOne({
    name: query.name,
    username: query.username,
  }).exec();
};
