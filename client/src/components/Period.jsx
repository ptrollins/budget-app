import React from "react";
import axios from "axios";

import Budgets from "./Budgets.jsx";

class Period extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "monthly",
      monthlyBudgets: [],
      yearlyBudgets: [],
    };

    this.createBudget = this.createBudget.bind(this);
    this.deleteBudget = this.deleteBudget.bind(this);
    this.editBudget = this.editBudget.bind(this);
  }

  componentDidMount() {
    this.getBudgets();
  }

  createBudget(newBudget) {
    axios
      .post("/budgets", newBudget)
      .then(() => {
        this.getBudgets();
      })
      .catch((error) => console.log(error));
  }

  deleteBudget(budget) {
    axios
      .delete(`/budgets?username=${this.props.currentUser}&name=${budget.name}`)
      .then(() => {
        this.getBudgets();
      })
      .catch((error) => console.log(error));
  }

  editBudget(replacementInfo) {
    axios
      .put("/budgets", replacementInfo)
      .then(() => {
        this.getBudgets();
      })
      .catch((error) => console.log(error));
  }

  getBudgets() {
    axios
      .get(`/budgets?username=${this.props.currentUser}`)
      .then(({ data }) => {
        var newMonthlyBudgets = [];
        var newYearlyBudgets = [];
        for (var budget of data) {
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
        <Budgets
          currentUser={this.props.currentUser}
          budgetPeriod={this.state.view}
          budgets={this.state.monthlyBudgets}
          createBudget={this.createBudget}
          deleteBudget={this.deleteBudget}
          editBudget={this.editBudget}
        />
      );
    } else {
      return (
        <Budgets
          currentUser={this.props.currentUser}
          budgetPeriod={this.state.view}
          budgets={this.state.yearlyBudgets}
          createBudget={this.createBudget}
          deleteBudget={this.deleteBudget}
          editBudget={this.editBudget}
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

export default Period;
