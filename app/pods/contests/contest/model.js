import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr(),
  name: DS.attr(),
  date: DS.attr(),
  location: DS.attr(),
  image: DS.attr()
});
