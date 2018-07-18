import DS from 'ember-data';

export default DS.Model.extend ({
  name           : DS.attr (),
  organization   : DS.belongsTo ('organization'),
  overview       : DS.attr(),
  description    : DS.attr(),
  prizes         : DS.attr(),
  startDate      : DS.attr(),
  endDate        : DS.attr(),
  createdBy      : DS.attr (),
  lastModifiedBy : DS.attr (),
  createdAt      : DS.attr (),
  updatedAt      : DS.attr (),
  deletedAt      : DS.attr (),
  contests       : DS.hasMany ()
});
