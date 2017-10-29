import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  session: Ember.inject.service('session'),

  model() {
    var session_data = this.get('session').get('session').get('content');
    var u_id = session_data.authenticated.user.id;

    return Ember.RSVP.hash({
      posts: this.store.findAll('post'),
      //return uservotes for only currentUser
      uservotes: this.store.query('uservote', {
        user: u_id
      })
      //uservotes: this.store.findAll('uservote')
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'posts', model.posts);
    Ember.set(controller, 'uservotes', model.uservotes);

    let uservotes  = controller.get('uservotes').content ;
    var posts = model.posts;

    if(uservotes.objectAt(0) !== null&& uservotes.objectAt(0) !== undefined && posts.objectAt(0)){
      uservotes.forEach(function(uservote){
        if(uservote._data.value !== undefined &&  uservote._data.value !== null){
          posts.forEach(function(post){
            if(post.id === uservote._data.post){
              if(uservote._data.value === 1){
                post.data.upvoted = true;
              }
              else if(uservote._data.value === -1){
                post.data.downvoted = true;
              }
            }
          });
        }
      });
      Ember.set(controller, 'posts', posts);
    }
  }
});
