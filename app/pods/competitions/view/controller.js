import Ember from 'ember';

export default Ember.Controller.extend({
    tabs: [
        {
            name: 'About',
            icon: '/images/about.svg'
        },
        {
            name: 'Description',
            icon: '/images/desc.svg'
        },
        {
            name: 'Prizes',
            icon: '/images/prize.svg'
        },
        {
            name: 'FAQ\'s',
            icon: '/images/question.svg'
        }
    ],

    activeTab: 0
});
