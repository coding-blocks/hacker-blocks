import Ember from 'ember';

export default Ember.Component.extend({
    submissionResult: null,
    didRender() {
        this._super(...arguments);
        let submission = this.get('problem.top');
/*
     submissionResult -1 WA
     submissionResult  0 Partially Solved
     submissionResult  1 Correct Answer
*/
        if (submission.get('isTopSubmission')) {
           if (submission.get('result') === -1) {
                this.set('submissionResult', -1);
            } else if (submission.get('result') === 1) {
                this.set('submissionResult', 1);
            } else if (submission.get('result') === 0) {
                if (submission.get('score') === 0) {
                    this.set('submissionResult', -1);
                } else if (submission.get('score') > 0) {
                    this.set('submissionResult', 0);
                }
            }
        }
    }

});
