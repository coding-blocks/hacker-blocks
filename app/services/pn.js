
import Ember from 'ember';

export default Ember.Service.extend({
  pubnub: null,
  init(user_id) {
    console.log(user_id);
    this.pubnub = new PubNub({
      publishKey: 'pub-c-f2a77069-0a29-453f-8140-a8cc1fd879a8',
      subscribeKey: 'sub-c-3222e9f0-29a0-11e7-bc52-02ee2ddab7fe',
      uuid: user_id
    });
  },
  publishMessage(channel, message) {
    var publishConfig = {
      channel,
      message
    };
    this.pubnub.publish(publishConfig, function (status, response) {
    });
  },
  addListener(callbackMessage,callbackPresence) {
    this.pubnub.addListener({
      status: function (statusEvent) {
        if (statusEvent.category === "PNConnectedCategory") {
        }
      },
      message: function (message) {
        callbackMessage(message);
      } ,
      presence: function (p) {
        callbackPresence(p);
      }
    });
  },
  subscribe(channels) {
    this.pubnub.subscribe({
      channels,
      withPresence: true
    });
  },
  history(channel, callback) {
    this.pubnub.history(
      {
        channel,
        reverse: true,
        stringifiedTimeToken: true, 
      },
      function (status, response) {
        callback(response);
      });

  },
  presence(channels, callback) {
    this.pubnub.hereNow(
      {
        channels,
        includeUUIDs: true,
        includeState: true
      },
      function (status, response) {
        callback(response);
      }
    );
  },
  unsubscribe(channels) {
    this.pubnub.unsubscribe({
      channels,
      withPresence: true
    });
  },
  removeListener(){
    var existingListener = {
    message: function() {
    } 
}
 
this.pubnub.removeListener(existingListener);
  }
});
