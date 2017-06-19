import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  toast: Ember.inject.service(),
  actions:{
    submitBatchCode(user)
    {
      var toast = this.get('toast');
      user.save().then(result => {
        toast.info('Batch Code Saved!','Message');
      })
        .catch(error => {
          toast.info('Something Went Wrong!','Message');
        });
    }
  },

});
