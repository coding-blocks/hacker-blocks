import DS from 'ember-data';

export default DS.Model.extend ({
  userId: DS.attr (),
  contest: DS.belongsTo ('contest'),
  quizSubmissions: DS.attr (),
  quiz: DS.belongsTo ('quiz'),
  result: DS.attr (),
  submission: DS.attr ()
});
