import DS from 'ember-data';

export default DS.Model.extend ({
  name           : DS.attr (),
  url            : DS.attr (),
  createdBy      : DS.attr (),
  lastModifiedBy : DS.attr (),
  createdAt      : DS.attr (),
  updatedAt      : DS.attr (),
  deletedAt      : DS.attr ()
});
