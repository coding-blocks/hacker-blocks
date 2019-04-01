import DS from 'ember-data';

export default DS.Model.extend ({
  userId: DS.attr (),
  contestId: DS.attr (),
  problemId: DS.attr (),
  createdAt: DS.attr (),
  updatedAt: DS.attr ()
});
