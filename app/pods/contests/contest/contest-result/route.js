import Ember from 'ember';
const { inject: { service }, Route } = Ember;

export default Ember.Route.extend({
    session: service('session'),
    breadCrumb: {
        title: 'Contest-Result'
    },
    model() {
       
        let { contest } = this.modelFor('contests.contest');
        
        let userId = this.get('session.data.authenticated.user_id');
         return Ember.RSVP.hash({
         contest,
         submissionModel:this.get('store').query('submission', { contest_id: contest.id, user_id: userId, timedContest: true }), 
    });  

},
    
});
