import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('problem-my-submissions', 'Integration | Component | problem my submissions', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{problem-my-submissions}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#problem-my-submissions}}
      template block text
    {{/problem-my-submissions}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
