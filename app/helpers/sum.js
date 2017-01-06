/**
 * Created by umair on 05/01/17.
 */

import Ember from 'ember';

export function sum(params) {
  return params.reduce((a, b) => {
    return a + b;
  });
}

export default Ember.Helper.helper(sum);
