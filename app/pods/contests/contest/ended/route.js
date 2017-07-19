import Ember from 'ember';
import moment from 'moment';
export default Ember.Route.extend({
     model() {
       let {contest} = this.modelFor('contests.contest');
       return Ember.RSVP.hash({
          contest: contest
       });
  }
});
