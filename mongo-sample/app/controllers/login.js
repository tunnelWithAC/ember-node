import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  loginName: null,
  password: null,
  actions: {
    authenticate(){
      this.get('session').authenticate(
        this.get('loginName'),
        this.get('password')).then( ()=> {
          alert('Logged in');
          //this.transitionTo('post');
        }, (err) => {
          alert("Error: " + err.responseText);
        });
    },
    login() {
      let { identification, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
