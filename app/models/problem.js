/**
 * Created by umair on 02/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  submitCount: DS.attr(),
  difficulty: DS.attr()
});
