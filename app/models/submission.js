/**
 * Created by umair on 05/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr(),
  userName: DS.attr(),
  photo:DS.attr(),
  source: DS.attr(),
  judgeResult: DS.attr(),
  submitAt: DS.attr('date'),
  language: DS.attr(),
  score: DS.attr(),
  explanation: DS.attr ('string'),
  result: DS.attr(),
  problemId: DS.attr('string'),
  collegeName: DS.attr ('string'),
  problemName:DS.attr('string'),
  isTopSubmission:DS.attr('boolean'),
  tcRuns: DS.attr(),
  problem:DS.belongsTo('problem',{inverse:'top'}),
  contest:DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  certificateEarned: DS.attr ('boolean'),
  plagiarismDetected: DS.attr('boolean')
});
