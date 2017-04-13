/**
 * Created by umair on 4/13/17.
 */

export function getRandom(num) {
  return Math.floor((Math.random() * num) + 1);
}

export default Ember.Helper.helper(getRandom);
