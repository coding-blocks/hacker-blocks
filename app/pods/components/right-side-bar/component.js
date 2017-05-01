import Ember from 'ember';
import moment from 'moment';
import config from '../../../config/environment';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  PN: service('pn'),
  messages: Ember.A([]),
  session: service('session'),
  store: Ember.inject.service(),
  cachedMessages: Ember.A([]),
  init() {
    this._super(...arguments);
    if (this.get('session.isAuthenticated')) {
      var self = this;
      self.get('PN').subscribe([config.GLOBAL_CHAT_NAME]);
      self.get('PN').presence([config.GLOBAL_CHAT_NAME], res => {
        res.channels[config.GLOBAL_CHAT_NAME].occupants.forEach(user => {
          self.get('store').queryRecord('user', { user_id: user.uuid, chat: true }).then(user => {

            let myUserId = self.get('session.data.authenticated.user_id');

            if (user.get('id') !== String(myUserId)) {
              if (user.get('photo') === null || user.get('photo') === '') {
                user.set('photo', '/images/student/random-avatar2.jpg');
              }
              var $new_user = $('<li id="' + user.get('id') + '" class="list-group-item"><img src =' + user.get('photo') + ' width="25" class="img-circle marginR10">' + user.get('name') + '</li>')
              $('#online-users').append($new_user);
            }
          });
        });
      });

      self.get('PN').addListener(
        listenerObj => {
          var photo = (listenerObj.message.sender.photo === '') ? '/images/student/random-avatar2.jpg' : listenerObj.message.sender.photo;
          var sentTime = new Date(listenerObj.timetoken / 1e4);
          var messageObj = {
            text: listenerObj.message.text,
            senderName: listenerObj.message.sender.name,
            senderPhoto: photo,
            sentTime: moment(sentTime).format('MMM Do YYYY, h:mm a')
          };
          self.get('messages').pushObject(messageObj);
          $("#chatbox").animate({ scrollTop: $('#chatbox').prop("scrollHeight")}, 1000);
        },
        presenceObject => {
          if (presenceObject.action === 'join') {
            self.get('store').queryRecord('user', { user_id: presenceObject.uuid, chat: true }).then(user => {
              let myUserId = self.get('session.data.authenticated.user_id');
              if (user.get('id') !== String(myUserId)) {
                if (user.get('photo') === null || user.get('photo') === '') {
                  user.set('photo', '/images/student/random-avatar2.jpg');
                }
                var $new_user = $('<li id="' + user.get('id') + '" class="list-group-item"><img src =' + user.get('photo') + ' width="25" class="img-circle marginR10">' + user.get('name') + '</li>');
                $('#online-users').append($new_user);


              }
            });
          }
          else if (presenceObject.action === 'leave') {
            $('#' + presenceObject.uuid).remove();
          }
          else {
            console.log(presenceObject.action);
          }
        }
      );
      self.get('PN').history(config.GLOBAL_CHAT_NAME, res => {
        res.messages.forEach(message => {
          var photo = (message.entry.sender.photo === '') ? '/images/student/random-avatar2.jpg' : message.entry.sender.photo;
          var sentTime = new Date(message.timetoken / 1e4);
          var obj = {
            text: message.entry.text,
            senderName: message.entry.sender.name,
            senderPhoto: photo,
            sentTime: moment(sentTime).format('MMM Do YYYY, h:mm a')
          };
          self.get('cachedMessages').pushObject(obj);

        });
        });
    }
  },
  didRender() {
    this._super(...arguments);
    $.AdminBSB.rightSideBar.activate();
    if (this.get('session.isAuthenticated')) {
      var self = this;
      self.set('messages', self.get('cachedMessages'));
    }
  },
  actions: {
    sendMessage() {
      this.get('PN').publishMessage(config.GLOBAL_CHAT_NAME, { text: this.get('message'), sender: this.get('model') });
      this.set('message', '');
    }
  },


});
