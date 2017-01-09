/**
 * Created by umair on 09/01/17.
 */

import Ember from 'ember';

var lang_codes = {
  "c": "C",
  "cpp": "C++",
  "py2": "Python",
  "java": "Java"
};

export function getlang(param) {
  return lang_codes[param];
}

export default Ember.Helper.helper(getlang);
