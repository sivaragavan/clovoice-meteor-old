import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Collections } from '../../../api/collections.js';

import Header from '../../parts/Header';
import { Loading } from '../../parts/Loading';

class Collection extends React.Component {

  render() {
    return <div className="start">
      {this.props.loading ? <Loading /> :
        <Header title={this.props.collection.name} showCollections />
      }
      <div className="text-center">
      </div>
    </div>
  }
}

Collection.propTypes = {
  collectionId: PropTypes.string.isRequired,
}

export default createContainer(({ collectionId }) => {
  const subscription = Meteor.subscribe('collections');
  const loading = !subscription.ready();

  return {
    collectionId,
    collection : Collections.findOne({ _id: collectionId }),
    loading
  };
}, Collection);
