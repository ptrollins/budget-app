import React from "react";

import Transactions from "./Transactions.jsx";

class Budgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetName: "",
      budgetAmount: "",
      currentlyEditing: "",
      newBudgetName: "",
      newBudgetAmount: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNumbersFormChange = this.handleNumbersFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleNumbersFormChange(event) {
    const numbersValidation = /^[0-9\b]+$/;

    if (
      event.target.value === "" ||
      numbersValidation.test(event.target.value)
    ) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleEditChange(currentlyEditing, event) {
    this.setState({
      currentlyEditing: currentlyEditing,
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.createBudget({
      username: this.props.currentUser,
      name: this.state.budgetName,
      amount: this.state.budgetAmount,
      period: this.props.budgetPeriod,
    });
    this.setState({
      budgetName: "",
      budgetAmount: "",
    });
  }

  handleEditSubmit(event) {
    event.preventDefault();
    this.props.editBudget({
      username: this.props.currentUser,
      oldBudgetName: this.state.currentlyEditing,
      newBudgetName: this.state.newBudgetName,
      newBudgetAmount: this.state.newBudgetAmount,
    });
    this.setState({
      currentEditing: "",
      newBudgetName: "",
      newBudgetAmount: "",
    });
  }

  handleDelete(budget) {
    this.props.deleteBudget(budget);
  }

  render() {
    return (
      <div className="create-editor">
        <h2>{this.props.budgetPeriod} Budgets</h2>
        <div>
          {this.props.budgets.map((budget) => (
            <li className="feed-list-item">
              <h2>{budget.name}</h2>
              <div className="feed-list-item-byline">
                ${budget.amount} total
              </div>
              <Transactions
                currentUser={this.props.currentUser}
                budget={budget.name}
              />
              <hr></hr>
              <input
                className="create-budget-input"
                type="text"
                placeholder={budget.name}
                name="newBudgetName"
                value={this.state.newBudgetName}
                onChange={(event) => this.handleEditChange(budget.name, event)}
              ></input>
              <input
                className="create-budget-input"
                type="text"
                placeholder={budget.amount}
                name="newBudgetAmount"
                value={this.state.newBudgetAmount}
                onChange={(event) => this.handleEditChange(budget.name, event)}
              ></input>
              <button
                className="edit-budget-button"
                type="submit"
                onClick={(event) => this.handleEditSubmit(event)}
              >
                Edit Budget
              </button>
              <button
                className="delete-button"
                onClick={() => this.handleDelete(budget)}
              >
                x
              </button>
            </li>
          ))}
        </div>

        <form className="feed-list-item">
          <input
            className="create-budget-input"
            type="text"
            placeholder="Name"
            name="budgetName"
            value={this.state.budgetName}
            onChange={(event) => this.handleFormChange(event)}
          ></input>
          <input
            className="create-budget-input"
            type="text"
            placeholder="Amount"
            name="budgetAmount"
            value={this.state.budgetAmount}
            onChange={(event) => this.handleNumbersFormChange(event)}
          ></input>
          <button
            className="edit-budget-button"
            type="submit"
            onClick={this.handleFormSubmit}
          >
            Add Budget
          </button>
        </form>
      </div>
    );
  }
}

export default Budgets;
