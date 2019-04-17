import Ember from 'ember';

export default Ember.Component.extend({
  className: Ember.computed ('question.state', function () {
    const question = this.get ('question')
    return (question.answerId) ? 'bg-green' : ''
  }),

  reviewClass: Ember.computed ('question.review', function () {
    const question = this.get ('question')
    return (question.review) ? 'bg-yellow' : ''
  })
});
