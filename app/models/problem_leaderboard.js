import DS from 'ember-data';

export default DS.Model.extend({
  score: DS.attr(),
  submit_at: DS.attr(),
  language: DS.attr(),
  problem: DS.belongsTo('problem'),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  college: DS.belongsTo('college')
})