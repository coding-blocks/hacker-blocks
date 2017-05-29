import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('today-code-byte', 'Integration | Component | today code byte', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{today-code-byte}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#today-code-byte}}
      template block text
    {{/today-code-byte}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
