import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../parts/Header';

export default class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  signupClicked(event) {
    event.preventDefault();

    var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    var email = ReactDOM.findDOMNode(this.refs.email).value.trim();
    var password = ReactDOM.findDOMNode(this.refs.password).value.trim();
    var password2 = ReactDOM.findDOMNode(this.refs.password2).value.trim();

    if(password != password2) {
      this.setState({
        error: "Passwords didn't match"
      });
    } else {
      var _this = this;
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          name: name
        }
      }, function(err) {
        if(!err) {
          FlowRouter.go("home")
        } else {
          console.log(err)
          _this.setState({
            error: err.reason
          });
        }
      });
    }
  }

  render() {
    return <div className="signup">
      <Header title="Signup"/>
      <div className="text-center">
        <form className="signup-form" onSubmit={this.signupClicked.bind(this)}>
          <p><input type="text" ref="name" placeholder="Name" /></p>
          <p><input type="text" ref="email" placeholder="Email" /></p>
          <p><input type="password" ref="password" placeholder="Password" /></p>
          <p><input type="password" ref="password2" placeholder="Password Again" /></p>
          <p><input type="submit" value="Signup"/></p>
          {this.state.error}
        </form>
      </div>
    </div>
  }
}