import Ember from 'ember';
import moment from 'moment';
import config from '../../../config/environment';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  didRenderDone: false,
  PN: service('pn'),
  messages: Ember.A([]),
  onlineUsers: Ember.A([]),
  session: service('session'),
  store: Ember.inject.service(),
  intervalId: null,
  init() {
    this._super(...arguments);
    if (this.get('session.isAuthenticated')) {
      var self = this;
      self.set('messages', Ember.A([]));
      self.get('PN').subscribe([config.GLOBAL_CHAT_NAME]);

      self.get('PN').presence([config.GLOBAL_CHAT_NAME], res => {
        res.channels[config.GLOBAL_CHAT_NAME].occupants.forEach(user => {
          self.get('store').queryRecord('user', { user_id: user.uuid, chat: true }).then(user => {
            let myUserId = self.get('session.data.authenticated.user_id');
            if (user.get('id') !== String(myUserId)) {
              if (user.get('photo') === null || user.get('photo') === '') {
                user.set('photo', '/images/student/random-avatar2.jpg');
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

      self.get('PN').addListener(
        listenerObj => {
          var photo = (listenerObj.message.sender.photo === '') || (listenerObj.message.sender.photo === null) ? '/images/student/random-avatar2.jpg' : listenerObj.message.sender.photo;
          var sentTime = new Date(listenerObj.timetoken / 1e4);
          var messageObj = {
            text: listenerObj.message.text,
            senderName: listenerObj.message.sender.name,
            senderPhoto: photo,
            sentTime: moment(sentTime).format('MMM Do YYYY, h:mm a')
          };
          self.get('messages').pushObject(messageObj);
          $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight") }, 1000);

          new Audio("/media/notification-tone.mp3").play();
          if (!$('#rightsidebar').hasClass('open')) {
            var intervalId = window.setInterval(function () {
              $('#chat-icon .material-icons').fadeTo('slow', 0.5).fadeTo('slow', 1.0);
            }, 2000);

            self.set('intervalId', intervalId);
          }
        },
        presenceObject => {
          if (presenceObject.action === 'join') {
            self.get('store').queryRecord('user', { user_id: presenceObject.uuid, chat: true }).then(user => {
              let myUserId = self.get('session.data.authenticated.user_id');
              if (user.get('id') !== String(myUserId)) {
                if (user.get('photo') === null || user.get('photo') === '') {
                  user.set('photo', '/images/student/random-avatar2.jpg');
                }
                let onlineUser = this.get('onlineUsers').find(onlineUser => {
                  return onlineUser.id === user.get('id');
                });
                if (!onlineUser) {
                  this.get('onlineUsers').pushObject(user);
                }
              }
            });
          } else if (presenceObject.action === 'leave') {
            let index = this.get('onlineUsers').findIndex(onlineUser => {
              return onlineUser.id === presenceObject.uuid;
            });
            if (index >= 0) {
              this.get('onlineUsers').splice(index, 1);
              $('#' + presenceObject.uuid).remove();
            }
          }
        }
      );
      self.get('PN').history(config.GLOBAL_CHAT_NAME, res => {
        res.messages.forEach(message => {
          var photo = (message.entry.sender.photo === '') || (message.entry.sender.photo === null) ? '/images/student/random-avatar2.jpg' : message.entry.sender.photo;
          var sentTime = new Date(message.timetoken / 1e4);
          var obj = {
            text: message.entry.text,
            senderName: message.entry.sender.name,
            senderPhoto: photo,
            sentTime: moment(sentTime).format('MMM Do YYYY, h:mm a')
          };
          self.get('messages').pushObject(obj);
        });
      });

      /*scroll down to latest message in inbox*/
      $('#chat-icon').click(() => {
        $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight") }, 1000);
      });

    }
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
      this.get('PN').publishMessage(config.GLOBAL_CHAT_NAME, { text: this.get('message'), sender: this.get('model') });
      this.set('message', '');
    }
  },


});
