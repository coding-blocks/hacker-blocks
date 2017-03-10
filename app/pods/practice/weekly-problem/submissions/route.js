import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  breadCrumb: {
    title: 'My Submissions'
  },
  model() {
    let userId = this.get('session.data.authenticated.user_id');
    var id = this.modelFor('practice.weekly-problem').problem_id;
    return this.get('store').query('submission', {problem_id : id, user_id: userId});
  }
});
