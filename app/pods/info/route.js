import Ember from 'ember';
import GetErrorDetail from '../../utils/get-error-details'
export default Ember.Route.extend({
  breadCrumb: {
    title: 'Information'
  },
  model (params) {
        let errorId = params.id;
        return Ember.RSVP.hash({
          error: GetErrorDetail(errorId)
        })
      },
});
