import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import TopNav from './TopNav';

export default class Header extends React.Component {

  render() {

    return <div className="header">
      <TopNav />
      <div className="jumbotron">
        {this.props.showCollections ?
          <a href={FlowRouter.path("collectionsList")}>Collections</a>
          : ""}
        <h1>{this.props.title}</h1>
      </div>
    </div>
  }
}

Header.propTypes = {
  title: PropTypes.string,
  showCollections: PropTypes.bool,
}
