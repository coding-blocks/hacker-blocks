import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr(),
  userId: DS.attr(),
  contestId: DS.attr()
});
