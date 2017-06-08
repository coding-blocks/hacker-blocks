import Ember from 'ember';

export default Ember.Route.extend({
    breadCrumb: {
      title: "Profile"
    },
    model(params) {
        let contests = Ember.A([]);
        let fetchedSubmissions = Ember.A([]);
        let submissionQuery = this.store.query('submission', { filter: { user_id: params.user_id, profile: true } });
        return submissionQuery.then(submissions => {

            submissions.forEach(submission => {
                fetchedSubmissions.push(submission);
                let contest = contests.find((contest) => {
                    return contest.get('id') === submission.get('contest').get('id');
                });
                if (!contest) {
                    contest = submission.get('contest');
                    contests.push(contest);
                }
            });

            fetchedSubmissions = submissions;

            return Ember.RSVP.hash({
                user: this.store.findRecord('user', params.user_id),
                fetchedSubmissions,
                contests
            });
        });


    },
    setupController(controller, model) {
        this._super(...arguments);
        Ember.set(controller, 'user', model.user);
        Ember.set(controller, 'submission', model.fetchedSubmissions);
        Ember.set(controller, 'contests', model.contests);
    }
});
