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

export function lang(param) {
  return lang_codes;
}

export default Ember.Helper.helper(lang);
