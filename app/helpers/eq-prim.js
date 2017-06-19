/**
 * Created by umair on 6/17/17.
 */


import Ember from 'ember';

export function eq(params) {
  return params.reduce((a, b) => {
    return a == b;
  });
}

export default Ember.Helper.helper(eq);

