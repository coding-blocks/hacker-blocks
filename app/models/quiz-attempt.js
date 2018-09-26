import DS from 'ember-data';

export default DS.Model.extend ({
  quiz: DS.belongsTo ('quiz'),
  // Fixme
  userId: DS.attr (),
  contest: DS.belongsTo ('contest'),
  result: DS.attr (),
  submission: DS.attr ()
});
