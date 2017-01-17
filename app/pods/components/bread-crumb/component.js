import Ember from 'ember';

const {
  get,
  getOwner,
  Component,
  computed,
  getWithDefault,
  assert,
  typeOf,
  setProperties,
  A: emberArray,
  String: { classify }
} = Ember;
const {
  bool,
  readOnly
} = computed;

/*
* This file contains one of the hackiest codes I've written. So please don't judge.
* - omerjerk
* */

const paths = [
    {
      route: 'contests.index',
      name: 'All Contests'
    },{
    route: 'contests.contest.index',
    name: 'Problems'
  },{
    route: 'contests.contest.index',
    name: 'Problem'
  }
];

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  breadCrumbs: computed('routing.currentRouteName', {
    get() {
      const routeName = this.get('routing.currentRouteName');
      const route = getOwner(this).lookup(`route:${routeName}`);

      let breadCrumbs = this._lookupBreadCrumb(routeName);
      return breadCrumbs;
    }
  }).readOnly(),

  _lookupBreadCrumb: function (routeName) {
    let i = 0;
    for (i = 0; i < paths.length && i < 2; ++i) {
      if (paths[i]['route'] === routeName) {
        break;
      }
    }

    var breadcrumbs = [];
    for (let j = 0; j < i; ++j) {
      breadcrumbs.push(paths[j]);
    }
    breadcrumbs.push(paths[i]);
    return breadcrumbs;
  }
});
