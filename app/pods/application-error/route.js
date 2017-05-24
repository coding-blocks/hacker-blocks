import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller, errors) {
    let error = errors.errors.get('firstObject')

    if (! error.message) {
      if (error.status === "403") {
        error.message = 'You are not authorized to view that page.'
      }

      else if (error.status === "404") {
        error.message = 'The page you asked for doesn\'t exist!'
      }

      else if (error.status === "500") {
        error.message = 'Something Went Wrong!'
      }

    }

    this._super(...arguments)
  }
});
