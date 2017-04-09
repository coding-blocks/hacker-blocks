/**
 * Created by umair on 02/01/17.
 */

import Ember from 'ember';
import DS from 'ember-data';

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  submitCount: DS.attr(),
  difficulty: DS.attr(),
  image: DS.attr('string', {defaultValue: "https://s1.postimg.org/wyhyiimtb/image.png"}),
  tags: DS.attr(),
  day: DS.attr(),
  UTCDay: Ember.computed('day', function () {
    console.log(typeof day);
    return this.get('day').toString().substring(6,8);
  }),
  UTCMonth: Ember.computed('day', function () {
    let month = this.get('day').toString().substring(4, 6);
    return months[parseInt(month)];
  }),
  submissions: DS.hasMany('submissions'),
  leaderboard: DS.hasMany('submissions', {async: true}),
  userCount: DS.attr()
});
