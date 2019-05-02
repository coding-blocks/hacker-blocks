import DS from 'ember-data';
import ApplicationAdapter from 'hack/pods/application/adapter'

export default ApplicationAdapter.extend({
  urlForUpdateRecord(id, modelName, snapshot) {
    return this._super(...arguments) + '/submit'
  }
});
