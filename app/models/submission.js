/**
 * Created by umair on 05/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  time: DS.attr(),
  language: DS.attr(),
  score: DS.attr(),
  result: DS.attr()
});
