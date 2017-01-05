import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('my-submissions', 'Integration | Component | my submissions', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{my-submissions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#my-submissions}}
      template block text
    {{/my-submissions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
