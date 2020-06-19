import React from "react";

import Items from "./Items.jsx";

class PeriodBudgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgetName: "",
      budgetAmount: "",
      budgetPeriod: this.props.period,
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNumbersFormChange = this.handleNumbersFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.createBudget(this.state);
    this.setState({
      budgetName: "",
      budgetAmount: "",
    });
  }

  render() {
    return (
      <div className="create">
        <div className="create-editor">
          <h2>{this.props.budgetPeriod} BUDGET</h2>
          <div>
            {this.props.budgets.map((budget) => (
              <li className="feed-list-item">
                <div className="feed-list-item-title">{budget.name}</div>
                <div className="feed-list-item-byline">
                  ${budget.amount} total
                </div>
                <Items
                  currentUser={this.props.currentUser}
                  budget={budget.name}
                />
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
              className="create-submit-button"
              type="submit"
              onClick={this.handleFormSubmit}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default PeriodBudgets;
