import DS from 'ember-data';

export default DS.Model.extend ({
  currentattemptId: DS.belongsTo ('quiz_attempt'),
  questionId: DS.attr(),
  answerId: DS.attr()
});
