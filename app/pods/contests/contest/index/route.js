import Ember from 'ember';
import Env from '../../../../config/environment';

const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
  ajax : service(),
  routing: service('-routing'),
  currentAttemptService: service('current-attempt'),
  currentUser: service('current-user'),
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
          console.error(err);
          return 0; // set submission count to zero
        });

        return Ember.RSVP.hash(hash);
      });
  },
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set('submissionCount', model.submissionCount ? model.submissionCount[0].count : 0 );
  },
  beforeModel() {
     let {contest} = this.modelFor('contests.contest');
     let presentDate = Math.floor(new Date().valueOf() / 1000);
     if(contest.get('startTime') >= presentDate && contest.get('endTime') >= presentDate ) {
        this.transitionTo('contests.upcoming',contest.id);
     }// else if(contest.get('endTime') <= presentDate) {
        // this.transitionTo('contests.contest.ended');
     // }
  },
  afterModel(model, transition) {
    const { currentAttempt, contest } = model;
    this.set('breadCrumb.title',contest.get('name'));

    if ( Ember.isNone(contest.get('duration')) ) {
      return
    } else if (!currentAttempt) {
	this.transitionTo('contests.contest.attempt', model.contest.id)
    }
  }
});
