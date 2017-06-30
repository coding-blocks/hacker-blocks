/**
 * Created by umair on 6/22/17.
 */


import Ember from 'ember';
// import config from '../../config/environment';

export default Ember.Service.extend({
  socket: null,
  init(userId) {
    this.socket = io('https://chat.cb.lk');
    this.socket.on('connect', () => {
      this.socket.emit('join', {user_id: userId});
    })
  },
  publishMessage(data) {
    this.socket.emit('new message', {data:data});
  },
  addChatListener(listener) {
    this.socket.on('message', (data) => {
      listener(data);
    });
  },
  addPresenceListener(listener) {
    this.socket.on('join', (data) => {
      listener.join(data);
    });
    this.socket.on('leave', (data) => {
      listener.leave(data);
    });
  }
});
