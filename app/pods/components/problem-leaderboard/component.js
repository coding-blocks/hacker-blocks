import Ember from 'ember';

import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  getLeaderBoard: task(function * () {
    let contestId = this.get('contestId');
    let problemId = this.get('problemId');
    let customParams = {contest_id: contestId, custom: {ext: 'url', url: 'leaderboard'}};
    if (problemId) {
      customParams.problem_id = problemId;
    }
    let leaderBoard = yield this.get('store').query('submission', customParams)
    this.set('leaderBoard', leaderBoard);
    let yourRank = leaderBoard.get('meta').yourRank;
    console.log("yourRank", yourRank);
    this.set('youRank', yourRank);
  }),
  init() {
    this._super(...arguments);
    this.get('getLeaderBoard').perform();
  }
});
