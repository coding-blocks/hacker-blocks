import Ember from 'ember';

export default Ember.Controller.extend({
    tabs: ['About', 'Description', 'Prizes', 'FAQ\'s'],
    activeTab: 0
});
