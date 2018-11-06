import Ember from 'ember';

export function getElementAt(params/*, hash*/) {
  const [ array, index] = params
  console.log ("==============darsh============", params)
  return array[index] 
}

export default Ember.Helper.helper(getElementAt);
