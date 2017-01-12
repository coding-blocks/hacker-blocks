/**
 * Created by umair on 12/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  roll_number: DS.attr(),
  email: DS.attr(),
  photo: DS.attr(),
  is_active: DS.attr()
});
