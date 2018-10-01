/**
 * Created by siddharth on 28/11/17.
 */
import Ember from 'ember';
const { inject: { service }, Component } = Ember;

export default Ember.Controller.extend({
  store: service (),
  session: service (),
  routing: service ('-routing'),
  actions: {
    unlock () {
      const store = this.get ('store'),
        problem = this.get ('model.problem'),
        contest = this.get ('model.contest'),
        userId = this.get('session').get('data').authenticated.user_id
      ;

      const unlockedEditorial = store.createRecord ('unlocked_editorial', {
        problem_id: problem.id,
        contest_id: contest.id,
        user_id: userId
      })

      unlockedEditorial
        .save ()
        .then (() => this.send ('editorialUnlocked'))
        .catch ((error) => {
          this.set ('error', 'Could not fetch editorial! It is likely that an editorial does not exist for this problem, or that the contest does not have hints enabled. If you believe this to be in error, please contact us at support@codingblocks.com.')
        })
    }
  }
});
