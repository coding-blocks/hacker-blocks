import Ember from 'ember';
import Env from '../../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  ajax : service(),
  store: service (),
  routing: service('-routing'),
  currentAttemptService: service('current-attempt'),
  currentUser: service('current-user'),
  serverTime: Ember.inject.service (),
  breadCrumb: Ember.Object.create({
    title: 'Contest'
  }),
  model() {
    let {contest} = this.modelFor('contests.contest');
    let tags = [];
    contest.get("problems").forEach(function (prob) {
      if (prob.get("tags") != null) {
        prob.get("tags").forEach(function (tag) {
          if(tags.indexOf(tag) ===-1) {
            tags.pushObject(tag);
          }
        })
      }
    });
    return Ember.RSVP.hash({
      contest: contest,
      tags:tags,
      currentAttempt: this.get('currentAttemptService').getCurrentAttempts(contest.id)
    }).then(hash=>{
      let contest = hash.contest;
      let contestId = contest.get('id');
      let authHeaders = this.get('currentUser').getAuthHeaders();

      hash.submissionCount = this.get('ajax').request(Env.apiEndpoint + '/api/submissions/submissionCount', {
        headers: authHeaders,
        data: { contestId: contestId },
        accepts: 'application/json'
      }).catch(err=>{
        Raven.captureException(err);
        return 0; // set submission count to zero
      });

      contest.get ('quizzes').map (quiz => {
        quiz.set ('contest', contest)

        let store = this.get ('store')
        store.findRecord ('quiz', quiz.id)
          .then (question => {
              store.findRecord ('question', question.id)
            })
          })

      return Ember.RSVP.hash(hash);
      });
  },
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('currentAttempt', model.currentAttempt)
    controller.set('contest', model.contest)
    controller.set('submissionCount', model.submissionCount ? model.submissionCount[0].count : 0 );
  },
  beforeModel() {
     let {contest} = this.modelFor('contests.contest');
     let presentDate = this.get ('serverTime').getUnixTime ();
     if(contest.get('startTime') >= presentDate && contest.get('endTime') >= presentDate ) {
        this.transitionTo('contests.upcoming',contest.id);
     }// else if(contest.get('endTime') <= presentDate) {
        // this.transitionTo('contests.contest.ended');
     // }
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
	this.transitionTo('contests.contest.attempt', model.contest.id)
    }
  }
});
