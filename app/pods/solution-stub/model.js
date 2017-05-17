import DS from 'ember-data';

export default DS.Model.extend({
  language: DS.attr(),
  body: DS.attr(),
  problem: DS.belongsTo('problem')
});
