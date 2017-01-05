import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('problem-leaderboard', 'Integration | Component | problem leaderboard', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{problem-leaderboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#problem-leaderboard}}
      template block text
    {{/problem-leaderboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
