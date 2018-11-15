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
    download () {
      console.log ('TODO')
    },

    unlock () {
      const store = this.get ('store'),
        problem = this.get ('model.problem'),
        contest = this.get ('model.contest'),
        userId = this.get('session').get('data').authenticated.user_id
      ;

      // const existingTestcase = store.queryRecord ('unlocked_testcase', {
      //   p_id: problem.id,
      //   contest_id: contest.id
      // })

      const unlockedTestcase = store.createRecord ('unlocked_testcase', {
        problem_id: problem.id,
        contest_id: contest.id,
        user_id: userId
      })

      unlockedTestcase
        .save ()
        .then (() => this.send ('testcaseUnlocked'))
        .catch ((error) => {
          this.set ('error', 'Could not unlock testcases for downloading! It is likely that downloading is disabled for this contest. If you believe this to be in error, please contact us at support@codingblocks.com.')
        })
    }
  }
});
