import Ember from 'ember';
import moment from 'moment';

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
      self.get('PN').subscribe(['global-chat-prac']);
      self.get('PN').presence(['global-chat-prac'], res => {
        res.channels['global-chat-prac'].occupants.forEach(user => {
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
          var sentTime = new Date(listenerObj.timetoken / 1e4);
          var messageObj = {
            text: listenerObj.message.text,
            sender: listenerObj.message.sender,
            sentTime: moment(sentTime).format('llll')
          };
          self.get('messages').pushObject(messageObj);
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
            console.log('left');
            $('#' + presenceObject.uuid).remove();
          }
          else {
            console.log(presenceObject.action);
          }
        }
      );
      self.get('PN').history('global-chat-prac', res => {
        res.messages.forEach(message => {
          var sentTime = new Date(message.timetoken / 1e4);
          var obj = {
            text: message.entry.text,
            sender: message.entry.sender,
            sentTime: moment(sentTime).format('MMM Do YYYY, h:mm a')
          };
          self.get('cachedMessages').pushObject(obj);
        });
      });
    }
  },
  didRender() {
    $.AdminBSB.rightSideBar.activate();
    if (this.get('session.isAuthenticated')) {
      var self = this;
      self.set('messages', self.get('cachedMessages'));
    }
  },
  actions: {
    sendMessage() {
      this.get('PN').publishMessage('global-chat-prac', { text: this.get('message'), sender: this.get('model').get('name') });
      this.set('message', '');
    }
  },


});
