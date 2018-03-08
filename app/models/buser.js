import DS from 'ember-data';

export default DS.Model.extend({
    bcode:DS.belongsTo(),
    batchCode: DS.attr(),
    userId: DS.attr(),
    createdBy: DS.attr(),
    batchCodeId: DS.attr(),
});
