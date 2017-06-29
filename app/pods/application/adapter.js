import DS from 'ember-data';
import env from '../../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  namespace: 'api',
  host: env.apiEndpoint,
  urlForQueryRecord(query) {
    if(query.custom) {
      switch (query.custom.ext){
        case 'url' :
              let url =  query.custom.url;
              delete query.custom;
              return `${this._super(...arguments)}/${url}`;
        case 'weekly':
               return `${this._super(...arguments)}/weekly/${query.problem_id}`;
      }
    } else  {
      return this._super(...arguments);
    }

  },
  urlForQuery(query) {
    if(query.custom) {
      switch (query.custom.ext) {
        case 'url' :
          let url =  query.custom.url;
          delete query.custom;
          return `${this._super(...arguments)}/${url}`;
      }
    } else  {
      return this._super(...arguments);
    }
  },
  authorizer: 'authorizer:custom'
});
