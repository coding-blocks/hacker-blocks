/**
 * Created by umair on 07/02/17.
 */

import Ember from 'ember';

export function unixToTime(unix_time) {
  let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let date = new Date(unix_time*1000);
  var month = monthNames[date.getMonth()];
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = ("0"+date.getMinutes()).substr(-2);

  return day+" "+month;
}

export default Ember.Helper.helper(unixToTime);
