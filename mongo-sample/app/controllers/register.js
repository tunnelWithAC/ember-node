import Ember from 'ember';
const { Logger } = Ember;
export default Ember.Controller.extend({
  name: 'conall',
  email:'sample@email.com',
  password: 'yakubu',

  actions: {
    register() {
      var user = this.store.createRecord('user', {
        name: this.get('name'),
        email: this.get('email'),
        password: this.get('password')
      });
      user.save();

      this.get('session').authenticate(
        this.get('name'),
        this.get('password')).then( ()=> {
          Logger.log(this.get('session').get('token'));
          this.transitionToRoute('post');
        }, (err) => {
          alert("Error: " + err.responseText);
        });
    }
  }
});
