import DS from 'ember-data';

export default DS.Model.extend ({
  title       : DS.attr (),
  description : DS.attr (),
  createdBy   : DS.attr (),
  createdAt   : DS.attr (),
  updatedAt   : DS.attr (),
  deletedAt   : DS.attr (),
  track       : DS.belongsTo ('track')
});
