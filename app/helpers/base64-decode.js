/**
 * Created by omerjerk on 18/2/17.
 */

import Ember from 'ember';

export function bas64decode(encodedData) {
  return atob(encodedData);
}

export default Ember.Helper.helper(bas64decode);
