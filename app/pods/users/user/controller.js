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
	    toast.info('batch code has been added.');
	})
	.catch(error => {
		const toast = this.get('toast');
		toast.error('unable to add batch code!', 'error');
	});
    }  
  },
});
