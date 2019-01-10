import DS from 'ember-data';

export default DS.Model.extend ({
  title       : DS.attr (),
  description : DS.attr (),
  createdBy   : DS.attr (),
  image       : DS.attr (),
  createdAt   : DS.attr (),
  updatedAt   : DS.attr (),
  deletedAt   : DS.attr (),
  track       : DS.belongsTo ('track'),
  contests    : DS.hasMany ('contest'),
  unlockedLevels: DS.hasMany ('unlocked-level'),
  unlocked: Ember.computed ('unlockedLevels', function () {
    return (this.get ('unlockedLevels').toArray ().length > 0)
  })
});
