import Ember from 'ember';

export default Ember.Route.extend({

model() {
	//console.log(this.store.findAll('post'));
    return Ember.RSVP.hash({

      posts: this.store.findAll('post'),
      //return uservotes for only currentUser
      uservotes: this.store.findAll('uservote')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'posts', model.posts);
    Ember.set(controller, 'uservotes', model.uservotes);
  }

});
