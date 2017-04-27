/**
 * Created by umair on 2/21/17.
 */

import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(sessionData, block) {
    block("oauth-id", sessionData.oauth_id);
    block("access-token", sessionData.auth_token);
  }
});
