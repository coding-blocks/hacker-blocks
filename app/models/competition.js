import DS from 'ember-data';
import moment from 'npm:moment';

export default DS.Model.extend ({
  name           : DS.attr (),
  organization   : DS.belongsTo ('organization'),
  overview       : DS.attr(),
  description    : DS.attr(),
  prizes         : DS.attr(),
  startDate      : DS.attr(),
  endDate        : DS.attr(),
  createdBy      : DS.attr (),
  lastModifiedBy : DS.attr (),
  createdAt      : DS.attr (),
  updatedAt      : DS.attr (),
  deletedAt      : DS.attr (),
  contests       : DS.hasMany (),

  startDateString: Ember.computed ('startDate', function () {
    return moment.unix (this.get ('startDate')).format ('DD MMMM YYYY')
  }),

  endDateString: Ember.computed ('endDate', function () {
    return moment.unix (this.get ('endDate')).format ('DD MMMM YYYY')
  })
});
