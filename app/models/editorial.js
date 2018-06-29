import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr(),
  p_id: DS.attr(),
  video: DS.attr()
});

