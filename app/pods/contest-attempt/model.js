import DS from 'ember-data';

export default DS.Model.extend({
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),
  userId: DS.attr(),
  contestId: DS.attr()
});
