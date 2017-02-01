/**
 * Created by umair on 09/01/17.
 */

import Ember from 'ember';

export function lang(param) {
  let lang_codes = {
    "c": "C",
    "cpp": "C++",
    "py2": "Python",
    "java": "Java"
  };
  return lang_codes;
}

export default Ember.Helper.helper(lang);
