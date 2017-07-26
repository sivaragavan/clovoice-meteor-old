import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class CollectionItem extends React.Component {

  render() {
    return (
      <div>
        <a href={FlowRouter.path('collection', {collectionId: this.props.collection._id}, {})}>
          {this.props.collection.name}
        </a>
      </div>
    );
  }
}

CollectionItem.propTypes = {
  collection: PropTypes.object.isRequired
}