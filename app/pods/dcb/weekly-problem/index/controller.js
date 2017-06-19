import Ember from 'ember';

export default Ember.Controller.extend({
    actions:{
        refreshModel(){
            var model = this.get('model');
            var p_id = model.p_id;
            this.set('model.dailycb',this.get('store').queryRecord('dailycb', {p_id}));
        }
    }
});
