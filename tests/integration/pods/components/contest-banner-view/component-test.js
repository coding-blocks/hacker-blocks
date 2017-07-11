import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('contest-banner-view', 'Integration | Component | contest banner view', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{contest-banner-view}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#contest-banner-view}}
      template block text
    {{/contest-banner-view}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
