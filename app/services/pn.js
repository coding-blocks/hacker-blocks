
import Ember from 'ember';

export default Ember.Service.extend({
  pubnub: null,
  init(user_id) {
    this.pubnub = new PubNub({
      publishKey: 'pub-c-025e09ff-15ab-4e1f-ba9c-339e51eacc4d',
      subscribeKey: 'sub-c-669496ec-2e5b-11e7-97de-0619f8945a4f',
      uuid: user_id,
      ssl:true
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
