/**
 * Created by umair on 4/19/17.
 */

import Ember from 'ember';
import moment from 'npm:moment';

export function isArchivedCB(dailyCB) {
  dailyCB = dailyCB[0]; //No idea why is this an Array
  if (dailyCB == undefined) {
    return;
  }
  let dayStamp = moment.unix(moment().unix()).format('YYYYMMDD');
  if (dailyCB.get('day') < dayStamp) {
    return true;
  }
  return false;
}



export default Ember.Helper.helper(isArchivedCB);
