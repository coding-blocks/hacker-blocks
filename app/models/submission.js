/**
 * Created by umair on 05/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  user_id: DS.attr(),
  userName: DS.attr(),
  userPhoto:DS.attr(),
  source: DS.attr(),
  submitAt: DS.attr(),
  language: DS.attr(),
  score: DS.attr(),
  result: DS.attr(),
  problemId: DS.attr('string'),
  problemName:DS.attr('string'),
  isTopSubmission:DS.attr('boolean'),
  tcRuns: DS.attr()
});
