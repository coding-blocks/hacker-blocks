import Ember from 'ember';

export default Ember.Controller.extend({
    tabs: [
        {
            name: 'About',
            icon: '/images/about.svg'
        },
        {
            name: 'Contests',
            icon: '/images/question.svg'
        },
        {
            name: 'Leaderboard',
            icon: '/images/prize.svg'
        },
        {
            name: 'FAQ\'s',
            icon: '/images/question.svg'
        }
    ],

    activeTab: 2
});
