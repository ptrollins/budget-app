import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <h1>Profile of {this.props.currentUser}</h1>;
  }
}

export default Profile;
