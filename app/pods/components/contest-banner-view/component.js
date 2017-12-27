import Ember from 'ember';
import ENV from '../../../config/environment';
export default Ember.Component.extend({
	submissionCount: null,
	init () {
		this._super(...arguments);
		Ember.$.ajax({
			method: "GET",
			data:{
				contestId: this.get('contest.id'),
			},
			url: (ENV.apiEndpoint + '/api/submissions/submissionCount')
		}).done(res => {
			this.set("submissionCount",res[0].count);
		}).fail (err => {
            console.log(err);
        });
	}
});
