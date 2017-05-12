import Ember from 'ember';

export default Ember.Component.extend({
    submissionResult: null,
    didRender() {
        this._super(...arguments);
        let submission = this.get('problem.topSubmission.submission');
        console.log(submission);
        if (submission) {
            if (submission.get('result') === -1) {
                console.log('compilation error');
                this.set('submissionResult', -1);
            }
            else if (submission.get('result') === 1) {
                if (submission.get('score') === 0) {
                    console.log('wrong answer');
                    this.set('submissionResult', -1);
                }
                else if (submission.get('score') > 0 && submission.get('score') < 100) {
                    console.log('partailly correct');
                    this.set('submissionResult', 0);
            console.log(this.get('submissionResult'));    
            }
                else {
                    console.log('correct');
                    this.set('submissionResult', 1);
                }
            }
        }
    }
});
