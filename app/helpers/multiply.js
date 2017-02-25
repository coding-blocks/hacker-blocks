/**
 * Created by umair on 2/25/17.
 */

import Ember from 'ember';

export function multiply(params) {
  return params.reduce((a, b) => {
    return a * b;
  });
}

export default Ember.Helper.helper(multiply);

