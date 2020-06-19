import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state);
    this.setState({
      username: "",
      password: "",
    });
  }

  render() {
    return (
      <div className="login-box">
        <form>
          <h2>Login</h2>
          <input
            className="create-input"
            type="login"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={(event) => this.handleFormChange(event)}
          ></input>
          <input
            className="create-input"
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={(event) => this.handleFormChange(event)}
          ></input>
          <button
            className="create-submit-button"
            type="submit"
            onClick={this.handleFormSubmit}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
