import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Collections } from '../api/collections.js';

import Collection from './Collection.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('collections.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderCollections() {
    let filteredCollections = this.props.collections;
    if (this.state.hideCompleted) {
      filteredCollections = filteredCollections.filter(collection => !collection.checked);
    }
    return filteredCollections.map((collection) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = collection.owner === currentUserId;

      return (
        <Collection
          key={collection._id}
          collection={collection}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Collections ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Collections
          </label>

          <AccountsUIWrapper />

          {this.props.currentUser ?
            <form className="new-collection" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new collections"
              />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderCollections()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  collections: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
  Meteor.subscribe('collections');

  return {
    collections: Collections.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Collections.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);