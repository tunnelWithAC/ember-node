import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  email: 'conall.daly95@gmail.com',
  password: 'test1234',
  errorMessage: '',
  actions: {
    authenticate(){
      this.get('session').authenticate(
        this.get('email'),
        this.get('password')).then( (response)=> {
          Ember.Logger.log(response);
          this.transitionToRoute('post');
        }, (err) => {
          this.set('errorMessage', err.responseText.display_message);
          //alert("Error: " + err.responseText);
        });
    },

    login() {
      let { email, password } = this.getProperties('email', 'password');
      this.get('session').authenticate('authenticator:oauth2', email, password).then( (response)=> {
        Ember.Logger.log(response);
        this.transitionToRoute('post');
      }, (err) => {
        this.set('errorMessage', err.responseText.display_message);
      });

    }
  }
});
