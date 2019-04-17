import DS from 'ember-data';

export default DS.Model.extend({
  level: DS.belongsTo ('level'),
  user_id: DS.attr ()
});

