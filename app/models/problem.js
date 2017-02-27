/**
 * Created by umair on 02/01/17.
 */

import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  contentObj: Ember.computed('content', function () {
    return JSON.parse(this.get('content'))
  }),
  submitCount: DS.attr(),
  difficulty: DS.attr(),
  image: DS.attr()
});
