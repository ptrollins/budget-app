import React from 'react';
import axios from 'axios';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      transactionName: '',
      transactionAmount: '',
      budgetRemaining: 0,
    };

    this.addTransaction = this.addTransaction.bind(this);
    this.deleteTransaction = this.deleteTransaction.bind(this);
    this.getTransactions = this.getTransactions.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleNumbersFormChange = this.handleNumbersFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.getTransactions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.budget !== this.props.budget) {
      this.getTransactions();
    }
  }

  addTransaction(newTransaction) {
    axios
      .post('/transactions', newTransaction)
      .then(() => {
        this.getTransactions();
      })
      .catch((error) => console.log(error));
  }

  deleteTransaction(transaction) {
    axios
      .delete(
        `/transactions?name=${transaction.name}&username=${this.props.currentUser}&budget=${transaction.budget}`
      )
      .then(() => {
        this.getTransactions();
      })
      .catch((error) => console.log(error));
  }

  getTransactions() {
    axios
      .get(
        `/transactions?username=${this.props.currentUser}&budget=${this.props.budget}`
      )
      .then(({ data }) => {
        Promise.resolve(
          this.setState({
            transactions: data,
          })
        );
      })
      .then(() => this.setBudgetRemaining())
      .catch((error) => console.log(error));
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleNumbersFormChange(event) {
    const numbersValidation = /^[0-9\b]+$/;

    if (
      event.target.value === '' ||
      numbersValidation.test(event.target.value)
    ) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
  }

  handleFormSubmit(event) {
<<<<<<< HEAD
    console.log("key pressed");
    console.log(event);
    console.log(event.which);
    if (event.which == 13) {
      this.addTransaction({
        username: this.props.currentUser,
        budget: this.props.budget,
        name: this.state.transactionName,
        amount: this.state.transactionAmount,
        period: this.props.budgetPeriod,
      });
      this.setState({
        transactionName: "",
        transactionAmount: "",
      });
    }
=======
    event.preventDefault();
    this.addTransaction({
      username: this.props.currentUser,
      budget: this.props.budget,
      name: this.state.transactionName,
      amount: this.state.transactionAmount,
      period: this.props.budgetPeriod,
    });
    this.setState({
      transactionName: '',
      transactionAmount: '',
    });
>>>>>>> Calculate and display budget remaining
  }

  handleDelete(transaction) {
    this.deleteTransaction(transaction);
  }

  setBudgetRemaining() {
    let transaction,
      transactionTotal = 0;
    for (transaction of this.state.transactions) {
      transactionTotal += transaction.amount;
    }
    this.setState({
      budgetRemaining: this.props.budgetAmount - transactionTotal,
    });
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
=======
        <div className="feed-list-item" ref="canvas"></div>
        <div className="feed-list-item">{this.state.budgetRemaining}</div>
        <h4>Transaction List</h4>
>>>>>>> Calculate and display budget remaining
        {this.state.transactions.map((transaction) => (
          <div>
            <p className="transaction-info">
              {transaction.name}, ${transaction.amount}
            </p>
            <button
              className="delete-button"
              onClick={() => this.handleDelete(transaction)}
            >
              x
            </button>
          </div>
        ))}
        <div className="add-item-box">
          <input
            className="create-budget-input"
            type="text"
            placeholder="Name"
            name="transactionName"
            value={this.state.transactionName}
            onChange={(event) => this.handleFormChange(event)}
          ></input>
          <input
            className="create-budget-input"
            type="text"
            placeholder="Amount"
            name="transactionAmount"
            value={this.state.transactionAmount}
            onChange={(event) => this.handleNumbersFormChange(event)}
            onKeyPress={(event) => this.handleFormSubmit(event)}
          ></input>
        </div>
      </div>
    );
  }
}

export default Transactions;
