
import DS from 'ember-data';

export default DS.Model.extend({
  p_id: DS.attr(),
  s_id: DS.attr(),
  submission: DS.belongsTo('submission'),
});
