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

const indexPath = {
  'contests': true,
  'contests.contest': true,
  'contests.contest.problem': true,
  'contests.contest.problem.main': false,
  'contests.contest.problem.leaderboard': false,
  'contests.contest.problem.submissions': false,
  'dcb': true,
  'practice': true,
  'practice.problems': true,
  'practice.problems.problem': true
};

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  breadCrumbs: computed('routing.currentRouteName', {
    get() {
      const routeName = this.get('routing.currentRouteName');
      return this._lookupBreadCrumbs(routeName);
    }
  }).readOnly(),

  _lookupBreadCrumbs: function (routeName) {
    let routeNames = routeName.split('.');
    let lastRouteName = '';
    let breadCrumbs = [];
    for (let i = 0; i < routeNames.length; ++i) {
      let routeTitle = routeNames[i];
      if (routeTitle === 'index') { break; }
      let modifiedRouteName = (lastRouteName === ''? '' : lastRouteName + '.') + routeTitle;
      let route;
      if (indexPath[modifiedRouteName] === true) {
        modifiedRouteName = modifiedRouteName + '.index';
      }
      route = getOwner(this).lookup(`route:${modifiedRouteName}`);
      let breadCrumb = getWithDefault(route, 'breadCrumb', {
        title: routeTitle
      });
      
      breadCrumbs.push({name: breadCrumb.title, route: modifiedRouteName, id: 'bcrumb-' + routeTitle});
      lastRouteName = (lastRouteName === ''? '' : lastRouteName + '.') + routeTitle;
    }
    return breadCrumbs;
  }
});
