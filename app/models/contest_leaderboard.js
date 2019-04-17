import DS from 'ember-data'

export default DS.Model.extend({
  score: DS.attr(),
  contest: DS.belongsTo('contest'),
  user: DS.belongsTo('user'),
  college: DS.belongsTo('college')
})