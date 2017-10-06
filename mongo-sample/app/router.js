import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('post', function() {
    this.route('comments');
  });
  this.route('login');
  this.route('register');
  this.route('profile');
});

export default Router;
