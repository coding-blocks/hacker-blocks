import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let day = moment(moment().unix(), 'X').format("YYYYMMDD");

    return Ember.RSVP.hash({
      dailyCBs: this.get('store').query('dailycb', {count: 4, day}),
      contests: this.get('store').query('contest', {custom :  { ext : 'url',url : 'public'} })
    });
  }
});
