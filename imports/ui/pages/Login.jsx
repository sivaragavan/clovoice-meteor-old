import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Header from '../parts/Header';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  loginClicked(event) {
    event.preventDefault();

    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    var _this = this;
    Meteor.loginWithPassword(email, password, function (err) {
      if (err) {
        _this.setState({ error: "Email/Password didn't match" });
      }
    })
  }

  render() {
    return <div className="login">
      <Header title="Login"/>
      <div className="text-center">
        <form className="login-form" onSubmit={this.loginClicked.bind(this)}>
          <p><input type="text" ref="email" placeholder="Email" /></p>
          <p><input type="password" ref="password" placeholder="Password" /></p>
          <p><input type="submit" value="Login" /></p>
          {this.state.error}
        </form>
      </div>
    </div>
  }
}
