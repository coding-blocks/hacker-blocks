import Ember from 'ember';

import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  collegeLeaderboard: Ember.computed('leaderBoard', function() {
    const colleges = []
    const leaderboard = this.get('leaderboard').sortBy()
    leaderboard.map(obj => {
      
      const hasCollege = colleges.findBy('college', obj.get('college.name'))

      if (!hasCollege) {
        colleges.pushObject({
          college: obj.get('college.name'),
          score: 0
        })
      }

      const row = colleges.findBy('college', obj.get('college.name'))
      row.score = row.score + obj.get('score')
    })
    return colleges
  }),
  collegeLeaderboardSorted: Ember.computed.sort('collegeLeaderboard', 'score:desc')
});
