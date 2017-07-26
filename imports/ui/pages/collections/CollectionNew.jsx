import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Header from '../../parts/Header';

export default class CollectionNew extends React.Component {

  createCollection() {
    var name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    Meteor.call("createCollection", name, function(error, result) {
      if (error) {
        alert(error.reason);
      } else {
        if(result) {
          FlowRouter.go(FlowRouter.path('collection', {collectionId: result}, {}));
        }
      }
    });
  }

  render() {
    return <div className="collectionNew">
      <Header title="Create New Collection" />
      <div className="text-center">
        <div><textarea ref="name" placeholder="Collection Name" ></textarea></div>
        <p><button onClick={this.createCollection.bind(this)} className="btn btn-warning">Create</button></p>
      </div>
    </div>
  }
}