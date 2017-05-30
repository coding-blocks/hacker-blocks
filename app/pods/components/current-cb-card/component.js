import Ember from 'ember';

export default Ember.Component.extend({
    init() {
        this._super(...arguments);
    },
    didRender() {
        this._super(...arguments);
        if($('#daily-problem-description')[0].scrollHeight > $('#daily-problem-description')[0].clientHeight){
            $('#overflow-description').css('display','block');
        }
    }

});
