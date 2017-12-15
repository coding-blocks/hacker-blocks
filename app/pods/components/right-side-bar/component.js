import Ember from 'ember';
import moment from 'moment';
import config from '../../../config/environment';
import httpValidator from '../../../utils/http-validator';

const { inject: { service } } = Ember;

const chatApi = function(url){
  return config.chatEndpoint + '/'+ url;
};

export default Ember.Component.extend({
  didRenderDone: false,
  chat: service('chat'),
  messages: Ember.A([]),
  toast: Ember.inject.service(),
  onlineUsers: Ember.A([]),
  session: service('session'),
  store: Ember.inject.service(),
  intervalId: null,
  init() {
    this._super(...arguments);
    if (!this.get('session.isAuthenticated')) {
      return;
    }
      var self = this;
      self.set('messages', Ember.A([]));
      let ids = [];
      Ember.$.ajax({
        method: "GET",
        url:chatApi('online')
      }).done(res => {
        res.data.forEach(user => {
          ids.push(user.user_id);
        });
        self.get('store').query('user', { user_id: ids, chat: true }).then(users => {
          users.forEach(user=>{
              let myUserId = self.get('session.data.authenticated.user_id');
              if (user.get('id') !== String(myUserId)) {
                if (user.get('photo') === null || user.get('photo') === '') {
                  user.set('photo', '/images/student/random-avatar2.jpg');
                } else if (httpValidator(user.get('photo'))){
                user.set('photo',user.get('photo').replace('http','https'));
              }
                let onlineUser = this.get('onlineUsers').find(onlineUser => {
                  return onlineUser.id === user.get('id');
                });
                if (!onlineUser) {
                  this.get('onlineUsers').pushObject(user);
                }
              }
          });
        });
      });

      this.get('chat').addChatListener((message) => {
        self.get('store').query('user', { user_id: message.data.user_id, chat: true}).then(users => {
          users.forEach(user =>{
            let sentTime = moment.unix(message.data.sentTime).format('MMM Do YYYY, h:mm a');
            let photo = (user.get('photo') === undefined)||(user.get('photo') === '') || (user.get('photo') === null) ? '/images/student/random-avatar2.jpg' : user.get('photo');
            if (httpValidator(photo)){
                photo = photo.replace('http','https');
              }
            let messageObj = {
              text: message.data.text,
              senderName: user.get('name'),
              senderPhoto: photo,
              sentTime: sentTime
            };
            this.get('messages').pushObject(messageObj);
           $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight") }, 1000);
        });
        });
      });
      this.get('chat').addPresenceListener({
        join: (presence) => {
          self.get('store').query('user', { user_id: presence.user_id, chat: true}).then(users => {
            users.forEach(user=>{
            let myUserId = self.get('session.data.authenticated.user_id');
            if (user.get('id') !== String(myUserId)) {
              if (user.get('photo') === null || user.get('photo') === '') {
                user.set('photo', '/images/student/random-avatar2.jpg');
              } else if (httpValidator(user.get('photo'))){
                user.set('photo',user.get('photo').replace('http','https'));
              }
              let onlineUser = this.get('onlineUsers').find(onlineUser => {
                return onlineUser.id === user.get('id');
              });
              if (!onlineUser) {
                let userObj = {
                  name: user.get('name'),
                  id: user.get('id'),
                  photo: user.get('photo')
                };
                this.get('onlineUsers').pushObject(userObj);
              }
            }
          });
          });
        },
        leave: (presence) => {
          let index = -1;
          let onlineUsers = this.get('onlineUsers');
          for(let i=0;i<onlineUsers.length;i++) {
            if(onlineUsers[i].id == presence.user_id ) {
              index = i;
            }
          }
          if (index >= 0) {
            this.get('onlineUsers').splice(index, 1);
            $('#' + presence.user_id).remove();
          }
        }
      });
    Ember.$.ajax({
      method: "GET",
      data:{
        limit: 100,
      },
      url:chatApi('messages')
    }).done(res => {
        let ids = [];
        res.data.forEach(message => {
          if(ids.indexOf(message.user_id)<=-1)
            ids.push(message.user_id);
        });
        self.get('store').query('user', {user_id:ids, chat:true}).then(users => {
        res.data.forEach(message => {
          users.forEach(user =>{
              if(user.id == message.user_id) {
                let sentTime = moment.unix(message.sent_time).format('MMM Do YYYY, h:mm a');
                let photo = (user.get('photo') === undefined) || (user.get('photo') === '') || (user.get('photo') === null) ? '/images/student/random-avatar2.jpg' : user.get('photo');
                if (httpValidator(photo)){
                  photo = photo.replace('http','https');
                }
                let messageObj = {
                  text: message.text,
                  senderName: user.get('name'),
                  senderPhoto: photo,
                  sentTime: sentTime
              };
              this.get('messages').pushObject(messageObj);
            }
            })
          })
          }).catch(err =>{
            Raven.captureException(err);
          });
        });

      /*scroll down to latest message in inbox*/
      $('#chat-icon').click(() => {
        $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight") }, 1000);
      });
  },
  didRender() {
    this._super(...arguments);
    if (this.get('didRenderDone') === false) {
      $.AdminBSB.rightSideBar.activate();
      this.set('didRenderDone', true);

    }
    if (this.get('session.isAuthenticated')) {
      $('#chat-icon').click(() => {
        if (this.get('intervalId') !== null) {
          window.clearInterval(this.get('intervalId'));
        }
      });
    }
  },
  actions: {
    sendMessage() {
      let myUserId = this.get('session.data.authenticated.user_id');
      let  message = this.get('message');
      let toast = this.get('toast');
      let chat = this.get('chat');
      if(message !== '' && message) {
        chat.publishMessage({ text: message,user_id:myUserId,sentTime:moment().unix()});
      } else {
        toast.info('You cannot send Blank Messages','Error');
      }
        this.set('message', '');
    }
  },
  blinkChatIcon() {
    new Audio("/media/notification-tone.mp3").play();
    if (!$('#rightsidebar').hasClass('open')) {
      var intervalId = window.setInterval(function () {
        $('#chat-icon .material-icons').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
      }, 2000);

      self.set('intervalId', intervalId);
    }
  }
});
