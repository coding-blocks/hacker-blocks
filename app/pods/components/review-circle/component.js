import Ember from 'ember';

export default Ember.Component.extend({
  className: Ember.computed ('question.state', function () {
    const question = this.get ('question')
    if (question.state === 'selected') {
      return 'bg-green'
    } else {
      return ''
    }
  }),
  reviewClass: Ember.computed ('question.review', function () {
    const question = this.get ('question')
    if (question.review === 'markForReview') {
      return 'bg-yellow'
    } else return ''
  })
});
