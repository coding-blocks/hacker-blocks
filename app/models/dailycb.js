import DS from 'ember-data';
import moment from 'npm:moment';
import Ember from 'ember';

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default DS.Model.extend({
    date : Ember.computed('day', {
        get(key){
            return moment(this.get('day'), 'YYYYMMDD').format('YYYY-MM-DD');
        },
        set(key,val){
            this.set('day', moment(val,'YYYY-MM-DD').format('YYYYMMDD'));
        }
    }),
    day : DS.attr(),
    UTCDay: Ember.computed('day', function () {
      console.log(typeof day);
      return this.get('day').toString().substring(6,8);
    }),
    UTCMonth: Ember.computed('day', function () {
      let month = this.get('day').toString().substring(4, 6);
      return months[parseInt(month)];
    }),
    problem : DS.belongsTo()
});
