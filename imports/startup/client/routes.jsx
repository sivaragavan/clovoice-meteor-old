import { FlowRouter } from 'meteor/kadira:flow-router'
import React from 'react'

import { mount } from 'react-mounter'

import { AppLayout } from '../../ui/layouts/AppLayout'
import Login from '../../ui/pages/Login'
import Signup from '../../ui/pages/Signup'

import CollectionList from '../../ui/pages/collections/CollectionList'
import CollectionNew from '../../ui/pages/collections/CollectionNew'

import Collection from '../../ui/pages/collection/Collection'

Accounts.onLogin(function () {
  if(FlowRouter.current().route.group.name === 'public')
  FlowRouter.go('collectionsList')
})

function checkLoggedIn(ctx, redirect) {
  if (!Meteor.userId()) {
    redirect("/")
  }
}

function redirectIfLoggedIn(ctx, redirect) {
  if (Meteor.userId()) {
    redirect("/collections/list")
  }
}

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [redirectIfLoggedIn]
});

publicRoutes.route('/signup', {
  name: 'signup',
  action(params, queryParams) {
    mount(AppLayout, { content: <Signup /> })
  }
})

publicRoutes.route('/', {
  name: 'home',
  action(params, queryParams) {
    mount(AppLayout, { content: <Login /> })
  }
})

const privateRoutes = FlowRouter.group({
  name: 'private',
  triggersEnter: [checkLoggedIn]
});

privateRoutes.route('/collections/list', {
  name: 'collectionsList',
  action(params, queryParams) {
    mount(AppLayout, { content: <CollectionList /> })
  }
})

privateRoutes.route('/collections/new', {
  name: 'collectionsNew',
  action(params, queryParams) {
    mount(AppLayout, { content: <CollectionNew /> })
  }
})

privateRoutes.route('/collections/:collectionId', {
  name: 'collection',
  action(params, queryParams) {
    mount(AppLayout, { content: <Collection collectionId={params.collectionId} /> })
  }
})