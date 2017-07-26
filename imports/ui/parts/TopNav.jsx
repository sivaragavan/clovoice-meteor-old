import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

class TopNav extends React.Component {

  logoutClicked(event) {
    event.preventDefault();
    Meteor.logout(function (err) {
      FlowRouter.go("home");
    })
  }
  
  render() {

    return <div className="topnav">

      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href={FlowRouter.path("home")}>
              <img className="logo" src="/img/logo-500-black.png" />
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="navbar-brand">CloVoice</li>
            </ul>
            {this.props.user ?
              <ul className="nav navbar-nav navbar-right">
                <li className="navbar-text">Signed in as </li>
                <li className="dropdown">
                  <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.user.profile.name} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a onClick={this.logoutClicked.bind(this)} >Logout</a></li>
                  </ul>
                </li>
              </ul>
              : ""}
          </div>
        </div>
      </nav>
    </div>
  }
}

TopNav.propTypes = {
  user: PropTypes.object,
};

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, TopNav);

