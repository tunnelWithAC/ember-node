import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
/*
Snippets:

includes(){
  return array.mapBy('content').includes(param)
}

*/

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

    let uservotes  = controller.get('uservotes').content ;
    let posts = controller.get('posts').content ;

    Ember.Logger.log("posts: ",posts);
    Ember.Logger.log(uservotes);


    /*if(uservotes){
      Ember.Logger.log("No. uv: ", this.get('uservotes').content.length);
      Ember.Logger.log("No. posts: ", posts.content.length);
      //console.log("uv", uservotes.objectAt(0).data);
      uservotes.forEach(function(uservote, index) {
          console.log("First post = ", posts.objectAt(i).post);
          console.log("Looking for ", uservote.data.post);
          for(var i=0; i<posts.content.length; i++){
            console.log(" Current: " + posts.objectAt(i).post);
            if(uservote.data.post === posts.objectAt(i).post){
              console.log("match found");
              console.log(posts.objectAt(i).post);
              //pushObject
            }
          }
          /*
          find the post associated with each vote
            > > >push the value of the vote into the post
          //
          //mutableComments.pushObject(story);

      });
    }*/

  }

});
