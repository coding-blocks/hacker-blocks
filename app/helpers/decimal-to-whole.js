
import Ember from 'ember';

export function decimalToWhole(params) {
  return Math.round(parseFloat(params));
}

export default Ember.Helper.helper(decimalToWhole);
