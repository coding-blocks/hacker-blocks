import Ember from 'ember';

export function present(list) {
  return list[1].includes(list[0]);
}

export default Ember.Helper.helper(present);

