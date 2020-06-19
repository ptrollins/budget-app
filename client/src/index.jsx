import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
import Period from "./components/Period.jsx";
import Profile from "./components/Profile.jsx";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "budgets",
      loginView: "login",
      isLoggedIn: false,
      currentUser: "",
    };

    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  loginUser(user) {
    axios
      .get(`/users?username=${user.username}&password=${user.password}`)
      .then(({ data }) => {
        this.setState({
          isLoggedIn: true,
          currentUser: data.username,
        });
      })
      .catch((error) => console.log("User has entered the wrong information."));
  }

  logoutUser() {
    this.setState({
      isLoggedIn: false,
      currentRole: "",
    });
  }

  createUser(user) {
    axios
      .post("/users", {
        username: user.username,
        password: user.password,
        role: user.role,
      })
      .then(() => {
        this.setState({
          loginView: "login",
        });
      })
      .catch((error) => console.log(error));
  }

  changeLoginView(option) {
    this.setState({
      loginView: option,
    });
  }

  changeView(option) {
    this.setState({
      view: option,
    });
  }

  renderLoginView() {
    const { loginView } = this.state;

    if (loginView === "login") {
      return <Login loginUser={this.loginUser} />;
    } else {
      return <SignUp createUser={this.createUser} />;
    }
  }

  renderView() {
    const { view } = this.state;

    if (view === "profile") {
      return <Profile currentUser={this.state.currentUser} />;
    } else {
      return <Period currentUser={this.state.currentUser} />;
    }
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn ? (
          <div>
            <div className="nav">
              <span className="logo">Budget Tracker</span>
              <span
                className={
                  this.state.loginView === "login"
                    ? "nav-selected"
                    : "nav-unselected"
                }
                onClick={() => this.changeLoginView("login", [])}
              >
                Login
              </span>
              <span
                className={
                  this.state.loginView === "signUp"
                    ? "nav-selected"
                    : "nav-unselected"
                }
                onClick={() => this.changeLoginView("signUp", [])}
              >
                Sign Up
              </span>
            </div>
            <div className="main">{this.renderLoginView()}</div>
          </div>
        ) : (
          <div>
            <div className="nav">
              <span
                className="logo"
                onClick={() => this.changeView("budgets", [])}
              >
                Budget Tracker
              </span>
              <span
                className={
                  this.state.view === "budgets"
                    ? "nav-selected"
                    : "nav-unselected"
                }
                onClick={() => this.changeView("budgets", [])}
              >
                Budgets
              </span>
              <span
                className={
                  this.state.view === "profile"
                    ? "nav-selected"
                    : "nav-unselected"
                }
                onClick={() => this.changeView("profile", [])}
              >
                Profile
              </span>
              <span
                className={"nav-unselected"}
                onClick={() => this.logoutUser()}
              >
                Logout
              </span>
            </div>

            <div className="main">{this.renderView()}</div>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
