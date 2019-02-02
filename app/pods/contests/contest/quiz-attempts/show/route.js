import Ember from 'ember';

export default Ember.Route.extend({
  model (params) {
    const store = this.get ('store')
    const { contest, quiz } = this.modelFor ('contests.contest.quiz-attempts')
    const attempt = store.findRecord ('quiz-attempt', params.attempt_id)

    return Ember.RSVP.hash ({
      contest,
      quiz,
      attempt
    })
  },

  afterModel (model) {
    // const store = this.get ('store')
    // const questionIds = model.quiz.hasMany ('questions').ids ()
    //
    // const questions = Promise.all (questionIds.map (id => {
    //   const record = store.findRecord ('question', id)
    //   return record
    // }))
    //
    // model.questions = questions
  }
});
