import DS from 'ember-data';
import moment from 'npm:moment';
import Ember from 'ember';

export default DS.Model.extend ({
  name: DS.attr (),
  oneauthId: DS.attr ()
});
