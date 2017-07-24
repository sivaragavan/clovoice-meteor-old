import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Collections = new Mongo.Collection('collections');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish collections that are public or belong to the current user
  Meteor.publish('collections', function collsPublication() {
    return Collections.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'collections.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a collection
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Collections.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'collections.remove'(collectionId) {
    check(collectionId, String);

    const collection = Collections.findOne(collectionId);
    if (collection.private && collection.owner !== Meteor.userId()) {
      // If the collection is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Collections.remove(collectionId);
  },
  'collections.setChecked'(collectionId, setChecked) {
    check(collectionId, String);
    check(setChecked, Boolean);

    const collection = Collections.findOne(collectionId);
    if (collection.private && collection.owner !== Meteor.userId()) {
      // If the collection is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Collections.update(collectionId, { $set: { checked: setChecked } });
  },
  'collections.setPrivate'(collectionId, setToPrivate) {
    check(collectionId, String);
    check(setToPrivate, Boolean);

    const collection = Collections.findOne(collectionId);

    // Make sure only the collection owner can make a collection private
    if (collection.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Collections.update(collectionId, { $set: { private: setToPrivate } });
  },
});