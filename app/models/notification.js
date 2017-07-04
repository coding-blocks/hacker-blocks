import DS from 'ember-data';

export default DS.Model.extend({
  message: DS.attr(),
  notiIcon: DS.attr(),
  bgColor: DS.attr(),
  link: DS.attr(),
});