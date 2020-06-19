import React from "react";
import axios from "axios";

import PeriodBudgets from "./PeriodBudgets.jsx";

class Budgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "monthly",
      monthlyBudgets: [
        {
          username: "julia",
          name: "Groceries",
          amount: 200,
          period: "monthly",
        },
        {
          username: "julia",
          name: "Dining Out",
          amount: 100,
          period: "monthly",
        },
      ],
      yearlyBudgets: [
        {
          username: "julia",
          name: "Vacations",
          amount: 1000,
          period: "yearly",
        },
      ],
    };

    this.createBudget = this.createBudget.bind(this);
  }

  // componentDidMount() {
  //   this.getBudgets();
  // }

  createBudget(newBudget) {
    axios
      .post("/budgets", {
        username: newBudget.currentUser,
        name: newBudget.budgetName,
        amount: newBudget.budgetAmount,
        period: newBudget.budgetPeriod,
      })
      .then(() => {
        this.getBudgets();
      })
      .catch((error) => console.log(error));
  }

  getBudgets(user) {
    axios
      .get(`/budgets?username=${user.username}`)
      .then(({ data }) => {
        var newMonthlyBudgets = this.state.monthlyBudgets.slice();
        var newYearlyBudgets = this.state.yearlyBudgets.slice();
        for (var budget in data) {
          if (budget.period === "monthly") {
            newMonthlyBudgets.push(budget);
          } else if (budget.period === "yearly") {
            newYearlyBudgets.push(budget);
          }
        }
        this.setState({
          monthlyBudgets: newMonthlyBudgets,
          yearlyBudgets: newYearlyBudgets,
        });
      })
      .catch((error) => console.log(error));
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  renderView() {
    const { view } = this.state;

    if (view === "monthly") {
      return (
        <PeriodBudgets
          currentUser={this.props.currentUser}
          budgetPeriod={this.state.view}
          budgets={this.state.monthlyBudgets}
          createBudget={this.state.createBudget}
        />
      );
    } else {
      return (
        <PeriodBudgets
          currentUser={this.props.currentUser}
          budgetPeriod={this.state.view}
          budgets={this.state.yearlyBudgets}
          createBudget={this.state.createBudget}
        />
      );
    }
  }

  render() {
    return (
      <div>
        <div className="subNav">
          <span
            className={
              this.state.view === "monthly" ? "nav-selected" : "nav-unselected"
            }
            onClick={() => this.changeView("monthly", [])}
          >
            Monthly
          </span>
          <span
            className={
              this.state.view === "yearly" ? "nav-selected" : "nav-unselected"
            }
            onClick={() => this.changeView("yearly", [])}
          >
            Yearly
          </span>
        </div>

        <div className="main">{this.renderView()}</div>
      </div>
    );
  }
}

export default Budgets;
