import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Collections } from '../../../api/collections.js';
import CollectionItem from './CollectionItem';

import Header from '../../parts/Header';
import { Loading } from '../../parts/Loading';

class CollectionList extends React.Component {

  newCollection() {
    FlowRouter.go('collectionsNew');
  }

  renderCollections() {
    return this.props.collections.map((collection) => {
      return <CollectionItem key={collection._id} collection={collection} />;
    });
  }

  render() {
    return <div className="collections">
      <Header title="My Collections" />
      <div className="text-center">
        <button onClick={this.newCollection.bind(this)} className="btn btn-primary">New Collection</button>
        <br></br><br></br>
        {this.props.loading ? <Loading /> :
          this.renderCollections()
        }
      </div>
    </div>
  }
}

export default createContainer(() => {
  const subscription = Meteor.subscribe('collections');
  const loading = !subscription.ready();

  return {
    collections: Collections.find({}, { sort: { createdAt: -1 } }).fetch(),
    loading,
  };
}, CollectionList);


