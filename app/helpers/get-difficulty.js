/**
 * Created by umair on 27/01/17.
 */

import Ember from 'ember';

var diff_codes = {
  0: "Easy",
  1: "Medium",
  2: "Hard",
  3: "Very Hard"
}

export function getDifficulty(param) {
  return diff_codes[param];
}

export default Ember.Helper.helper(getDifficulty);
