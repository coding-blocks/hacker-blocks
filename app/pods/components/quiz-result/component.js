import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Component.extend({
  store: service ('store'),
  question: null,
  correct: null,
  answerId: null,
  didReceiveAttrs () {
    const submission = this.get ('submission'),
      questionId = submission['question-id'],
      answerId = submission['answer-id']
    ;

    this.set ('correct', (submission['score'] > 0))
    this.set ('answerId', answerId)
    this.set ('question', this.get ('store').findRecord ('question', questionId))

    console.log ('--> ', submission)
  }
});
