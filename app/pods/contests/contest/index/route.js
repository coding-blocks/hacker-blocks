import Ember from 'ember';
import Env from '../../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  ajax : service(),
  store: service (),
  routing: service('-routing'),
  currentAttemptService: service('current-attempt'),
  currentContest: service('current-contest'),
  currentUser: service('current-user'),
  serverTime: Ember.inject.service (),
  breadCrumb: Ember.Object.create({
    title: 'Contest'
  }),
  model(params, transition) {
    const contest = this.get('currentContest').getContest()
    const tags = [];
    contest.get("problems").map(prob => {
      if (prob.get("tags") != null) {
        prob.get("tags").map(tag => {
          if (tags.indexOf(tag) === -1) {
            tags.pushObject(tag);
          }
        })
      }
    });
    const currentAttempt = this.get('currentAttemptService').getCurrentAttempts(contest.id)
    const authHeaders = this.get('currentUser').getAuthHeaders();
    const submissionCount = this.get('ajax').request(Env.apiEndpoint + '/api/submissions/submissionCount', {
      headers: authHeaders,
      data: { contestId: contest.id },
      accepts: 'application/json'
    }).catch(err=>{
      Raven.captureException(err);
      return 0; // set submission count to zero
    });

    const quiz = contest.get ('quizzes').map (quiz => {	
      quiz.set ('contest', contest)
      return this.get('store').findRecord('quiz', quiz.id, {reload: true})
        .then(quiz => {
          quiz.set('questionCount', quiz.hasMany('questions').ids().length)
          return quiz
        })
    })

    return Ember.RSVP.hash({
      contest,
      tags,
      currentAttempt,
      submissionCount,
      quiz
    })
  },
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('currentAttempt', model.currentAttempt)
    controller.set('contest', model.contest)
    controller.set('quiz', model.quiz)
    controller.set('submissionCount', model.submissionCount.count)
  },
  beforeModel() {
     let {contest} = this.modelFor('contests.contest');
     let presentDate = this.get ('serverTime').getTime ();
     if(contest.get('startTime') >= presentDate && contest.get('endTime') >= presentDate ) {
        this.transitionTo('contests.upcoming',contest.id);
     }
  },
  afterModel(model, transition) {
    const { currentAttempt, contest } = model;

    const quizzes = contest.get ('quizzes').toArray ()
    const problemCount = contest.get ('problems.length')
    const attachments = contest.get('attachments').toArray()

    if (quizzes.length === 1 && (! problemCount) && attachments.length === 0) {
      this.transitionTo ('contests.contest.quiz.index', contest.id, quizzes[0].id)
    }

    if ( Ember.isNone(contest.get('duration')) ) {
      return
    } else if (!currentAttempt) {
      transition.abort()
	    this.transitionTo('contests.contest.attempt', model.contest.id)
    }
  }
});
