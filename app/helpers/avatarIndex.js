/**
 * Created by himank on 1/3/18.
 */

export function getAvatarIndex(num) {
  return num % 36 + 1; 
}

export default Ember.Helper.helper(getAvatarIndex);
