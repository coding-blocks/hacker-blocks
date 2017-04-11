import DS from 'ember-data';
import moment from 'npm:moment';

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
    problem : DS.belongsTo()
});
