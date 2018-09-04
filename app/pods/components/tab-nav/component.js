import Ember from 'ember';

export default Ember.Component.extend({
    actions:{
        setActiveTab(index){
            this.set('activeTab', index);
        }
    }
});
