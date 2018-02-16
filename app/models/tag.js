import DS from 'ember-data';

export default DS.Model.extend ({
  name  : DS.attr (),
  title : Ember.computed.oneWay ('name')
});
