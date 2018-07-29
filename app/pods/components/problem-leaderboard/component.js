import Ember from 'ember';

import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  getLeaderBoard: task(function * () {
    let competitionId = this.get ('competitionId');

    if (competitionId) {
      let leaderBoard = yield this.get ('store').query ('competition', {
        custom: {
          ext: 'url',
          url: `${competitionId}/leaderboard`
        }
      })

      this.set('leaderBoard', leaderBoard);
      this.set('yourRank', leaderBoard.meta.yourRank);

      return;
    }

    let contestId = this.get('contestId');
    let problemId = this.get('problemId');
    let customParams = {contest_id: contestId, custom: {ext: 'url', url: 'leaderboard'}};
    if (problemId) {
      customParams.problem_id = problemId;
    }

    let leaderBoard = yield this.get('store').query('submission', customParams);

    this.set('leaderBoard', leaderBoard);
    this.set('yourRank', leaderBoard.meta.yourRank);
  }),

  init () {
    this._super (...arguments);

    this.get ('getLeaderBoard').perform ();

    let refreshInterval = this.get ('refreshInterval')

    if (refreshInterval) {
      setInterval (
        _ => this.get ('getLeaderBoard').perform (),
        refreshInterval
      )
    }
  }
});
