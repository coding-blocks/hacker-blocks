import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  toast: Ember.inject.service(),
  actions: {
    addBuser(userId){
        this.get('store').createRecord('buser',{
            batchCodeText:this.get('batchCode'),
            userId:userId,
        }).save().then(result=> {
	    const toast = this.get('toast');
	    toast.info('Batch Code Has Been Added.');
	    //TODO: Fix this - New batch code does not appear until refreshed page.
	    window.location.reload(true);
	})
	.catch(error => {
		const toast = this.get('toast');
	if(error.errors[0].name === 'SequelizeUniqueConstraintError') {
      toast.warning('Batch Code Already Exists!', 'Warning');
    } else if (error.errors[0] === 'Invalid Batch Code.') {
      toast.error(error.errors[0], 'Error');
    } else {
      toast.info('Unable To Add Batch Code!', 'Error');
    }
  });
    }
  },
});
