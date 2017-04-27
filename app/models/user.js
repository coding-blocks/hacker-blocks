/**
 * Created by umair on 12/01/17.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  userId:DS.attr('string'),
  name: DS.attr(),
  roll_number: DS.attr(),
  email: DS.attr(),
  photo: DS.attr('string', {
    defaultValue() { return "https://hack.codingblocks.com/images/placeholder-avatar.png" }
  }),
  is_active: DS.attr()
});
