import Ember from 'ember';

export default Ember.Component.extend({
  attachments: null,
  selectedAttachment: null,

  init () {
    this._super (...arguments)
    let attachments = this.get ('contest.attachments').toArray ()
    this.set ('attachments', attachments)
    attachments.map (attachment => attachment.set ('displayClass', ''))
    attachments[0].set ('displayClass', 'active')
  },

  actions: {
    selectAttachment (id) {
      let attachments = this.get ('attachments')
      attachments.map (attachment => {
        attachment.set ('displayClass', '')

        if (attachment.id === id) {
          attachment.set ('displayClass', 'active')
        }
      })
    }
  }
});
