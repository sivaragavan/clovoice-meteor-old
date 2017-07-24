import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Collections } from '../api/collections.js';

// Collection component - represents a single collection
export default class Collection extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('collections.setChecked', this.props.collection._id, !this.props.collection.checked);
  }

  deleteCollection() {
    Meteor.call('collections.remove', this.props.collection._id);
  }

  togglePrivate() {
    Meteor.call('collections.setPrivate', this.props.collection._id, !this.props.collection.private);
  }

  render() {
    // Give collections a different className when they are checked off,
    // so that we can style them nicely in CSS
    const collectionClassName = classnames({
      checked: this.props.collection.checked,
      private: this.props.collection.private,
    });

    return (
      <li className={collectionClassName}>
        <button className="delete" onClick={this.deleteCollection.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={this.props.collection.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        {this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            {this.props.collection.private ? 'Private' : 'Public'}
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.collection.username}</strong>: {this.props.collection.text}
        </span>
      </li>
    );
  }
}

Collection.propTypes = {
  // This component gets the collection to display through a React prop.
  // We can use propTypes to indicate it is required
  collection: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};