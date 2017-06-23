/**
 * Created by umair on 6/22/17.
 */


import Ember from 'ember';

export default Ember.Service.extend({
  socket: null,
  init(userId, channelName) {
    this.socket = io('http://localhost:3001');
    this.socket.on('connect', () => {
      this.socket.emit('join', {user_id: userId});
    })
  },
  addChatListener(listener) {
    this.socket.on('message', (data) => {
      listener.onData(data);
    });
  },
  addPresenceListener(listener) {
    this.socket.on('join', (data) => {
      listener.join(data.user_id);
    });
    this.socket.on('leave', (data) => {
      listener.leave(data.user_id);
    });
  }
});
