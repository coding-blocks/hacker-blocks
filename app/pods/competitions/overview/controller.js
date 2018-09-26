import Ember from 'ember';
import config from '../../../config/environment';
const { inject: { service }, Component } = Ember;

export default Ember.Controller.extend({
  currentUser: service ('current-user'),
  session: service ('session'),
  notifications: service ('toast'),
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

  activeTab: 0,

  actions: {
    participate (competitionId) {
      const store = this.get ('store'),
        userId = this.get('session').get('data').authenticated.user_id,
        notifications = this.get ('notifications')
      ;

      store
        .queryRecord ('CompetitionAttempt', {
          competitionId: competitionId,
          custom: {
            ext: 'url',
            url: 'current'
          }
        })
        .then (attempt => {
          if (attempt)
            return attempt

          return store.createRecord ('CompetitionAttempt', {
            competitionId: competitionId,
            userId: userId
          }).save ()
        })
        .then (attempt => {
          this.transitionToRoute ('competitions.view', competitionId)
        })
        .catch (error => {
          notifications.error ('Something went wrong, please refresh the page or try again later!')
        })
    },
    popup() {
      var redirectionPath = window.location.pathname;
      redirectionPath = redirectionPath.replace(/^\/|\/$/g, '');
      localStorage.setItem('redirection-path', redirectionPath);
      window.location = "https://account.codingblocks.com/oauth/authorize?" +
        "response_type=code" +
        "&client_id=2146237097" +
        "&redirect_uri=" + config.publicUrl
      }
  }
});
