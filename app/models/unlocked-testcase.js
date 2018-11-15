import DS from 'ember-data';

export default DS.Model.extend({
  problem_id: DS.attr (),
  user_id: DS.attr (),
  contest_id: DS.attr (),
  urls: DS.attr ()
});

