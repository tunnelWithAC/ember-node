import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  email: 'conall.daly95@gmail.com',
  password: 'test1234',
  errorMessage: '',
  actions: {
    authenticate(){
      //_id: 59a86cc8d6c7b55b6898d00d
      //var user = this.store.find('user', '59a86cc8d6c7b55b6898d00d');
      //console.log(user);

      this.get('session').authenticate(
        this.get('email'),
        this.get('password')).then( (response)=> {
          //this.transitionToRoute('post');
        }, (err) => {
          this.set('errorMessage', err.responseText.display_message);
          //alert("Error: " + err.responseText);
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
