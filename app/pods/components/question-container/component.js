import Ember from 'ember';

export default Ember.Component.extend({
  selectedChoiceId: Ember.computed.alias('questionSubmission.answerId'),
  didRender () {
    // if (window.MathJax && questionContainer) {
    //   Ember.run.later (_ => MathJax.Hub.Queue(["Typeset", MathJax.Hub, questionContainer]))
    // }
  },
  actions: {
    async toggleChoice (choiceId) {
      const selectedChoiceId = choiceId === this.get('selectedChoiceId') ? null : choiceId
      this.get('updateQuestionSubmissionTask').perform(selectedChoiceId)
    }
  }
});
