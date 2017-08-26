import { test } from 'qunit';
import moduleForAcceptance from 'mongo-sample/tests/helpers/module-for-acceptance';
import startApp from '../helpers/start-app';

moduleForAcceptance('Acceptance | login');

test('visiting /login', function(assert) {
  visit('/login');
  //fillIn('input.name', 'My new post');
  andThen(function() {
    assert.equal(currentURL(), '/login');
  });
});
