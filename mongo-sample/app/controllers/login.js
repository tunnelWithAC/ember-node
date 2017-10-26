import Ember from 'ember';
import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  init: function() {
    Ember.Logger.log("Sessune", this.get('session'));
  },
  email: 'conall.daly95@gmail.com',
  password: 'test1234',
  errorMessage: '',
  actions: {

    login() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:oauth2', email, password).then((response)=> {

        this.set('session.store.cookieExpirationTime', "test");
        var session_data = this.get('session').get('session').get('content');
        var u_id = session_data.authenticated.user.id;
        this.set('session.store.userID', u_id);
          Ember.Logger.log("LOGIN RESPONSE:" , response, u_id);
        Ember.Logger.log("cookie:", this.get('session.store.userID'));
        this.transitionToRoute('posts');
      },
      (success) => {
        Ember.Logger.log("Success", success)
      },
      (err) => {
        this.set('errorMessage', err.responseText.display_message);
      });

    }
  }
});
