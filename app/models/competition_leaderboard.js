import DS from 'ember-data';

export default DS.Model.extend({
  score: DS.attr(),
  competition: DS.belongsTo('competition'),
  user: DS.belongsTo('user'),
  college: DS.belongsTo('college')
})