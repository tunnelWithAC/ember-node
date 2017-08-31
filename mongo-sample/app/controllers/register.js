import Ember from 'ember';

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
          console.log(this.get('session').get('token'));
          this.transitionToRoute('post');
        }, (err) => {
          alert("Error: " + err.responseText);
        });
      /*var post = this.store.createRecord('post', {
        content: text,
        author: '26 Aug',
        votes: 0
      });
      post.save();*/
    }
  }
});
