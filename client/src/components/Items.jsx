import React from "react";

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h4>Item List</h4>
        {/* {this.props.budgets.map((budget) => (
          <li className="feed-list-item">
            <div className="feed-list-item-title">{budget.name}</div>
            <div className="feed-list-item-byline">${budget.amount} total</div>
            <Items currentUser={this.props.currentUser} budget={budget.name} />
          </li>
        ))} */}
      </div>
    );
  }
}

export default Items;
