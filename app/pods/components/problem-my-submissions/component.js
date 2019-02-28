import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service('session'),
  currentContest: Ember.inject.service('current-contest'),
  store: Ember.inject.service(),
  init(){
    this._super(...arguments);
    const currentContestId = this.get('currentContest').getContest()
    this.set('contest', this.get('store').peekRecord('contest', currentContestId))
  }
});
