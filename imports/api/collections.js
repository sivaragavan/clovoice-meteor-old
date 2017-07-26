import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Collections = new Mongo.Collection("collections");

if (Meteor.isServer) {
  Meteor.publish("collections", function () {
    return Collections.find({
      owner: this.userId
    });
  });
}

Meteor.methods({
  'createCollection'(name) {
    check(name, String);

    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var id = Collections.insert({
      name,
      createdAt: new Date(),
      owner: Meteor.userId(),
    });

    return id;
  },

  'setName'(collectionId, name) {
    check(collectionId, String);
    check(name, String);

    const collection = Collections.findOne(collectionId);
    if (collection.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Collections.update(collectionId, { $set: { name } });
  },
});
