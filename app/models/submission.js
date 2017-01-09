/**
 * Created by umair on 05/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  user: DS.attr(),
  submitAt: DS.attr(),
  langCodename: DS.attr(),
  score: DS.attr(),
  result: DS.attr()
});
