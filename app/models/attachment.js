import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend ({
  title       : DS.attr (),
  description : DS.attr (),
  url         : DS.attr (),
  mime        : DS.attr (),
  contentType : DS.attr (),
  createdAt   : DS.attr (),
  updatedAt   : DS.attr (),
  createdBy   : DS.attr (),
  publishedBy : DS.attr ()
});
