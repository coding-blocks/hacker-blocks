/**
 * Created by umair on 02/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  submitCount: DS.attr(),
  difficulty: DS.attr(),
  image: DS.attr('string', {defaultValue: "https://s1.postimg.org/wyhyiimtb/image.png"}),
  tags: DS.attr(),
  submissions: DS.hasMany('submissions'),
  leaderboard: DS.hasMany('submissions', {async: true}),
  userCount: DS.attr()
});
