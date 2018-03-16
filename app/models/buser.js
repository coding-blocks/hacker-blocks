import DS from 'ember-data';

export default DS.Model.extend({
    "batch-code": DS.belongsTo('batch-code'),
    batchCodeText: DS.attr(),
    userId: DS.attr(),
    createdBy: DS.attr(),
    batchCodeId: DS.attr(),
});
