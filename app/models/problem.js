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
  tags: DS.hasMany (),
  submissions: DS.hasMany('submissions'),
  userCount: DS.attr(),
  solutionStubs: DS.hasMany('solutionStub'),
  timeLimit: DS.attr({defaultValue: 2}),
});
