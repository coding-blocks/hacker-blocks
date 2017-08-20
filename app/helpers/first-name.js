import Ember from 'ember';

export function firstName([fullName]) {
  if (fullName === undefined) {
    return ""
  }

  const firstName = fullName.w () [0]

  return firstName.capitalize ()
}

export default Ember.Helper.helper(firstName);
