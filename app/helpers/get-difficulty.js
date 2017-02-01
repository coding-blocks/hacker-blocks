/**
 * Created by umair on 27/01/17.
 */

import Ember from 'ember';

export function getDifficulty(param) {
  let diff_codes = {
    0: "Easy",
    1: "Medium",
    2: "Hard",
    3: "Very Hard"
  };
  return diff_codes[param];
}

export default Ember.Helper.helper(getDifficulty);
