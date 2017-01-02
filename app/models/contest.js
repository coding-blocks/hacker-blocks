/**
 * Created by umair on 30/12/16.
 */

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  start_time: DS.attr(),
  end_time: DS.attr(),
  location: DS.attr(),
  image: DS.attr(),
  problems: DS.attr()
});

