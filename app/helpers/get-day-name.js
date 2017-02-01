/**
 * Created by umair on 01/02/17.
 */

import Ember from 'ember';

export function getDayName(params) {
  let weekday = new Array(7);
  weekday[0] =  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  return params.reduce((index, today) => {
    return weekday[(index + today) % 7];
  });
}

export default Ember.Helper.helper(getDayName);
