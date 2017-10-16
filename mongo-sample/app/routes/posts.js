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
  var posts = controller.get('posts').content ;
  //uservotes.objectAt(0)._data.post = "tst";
  //console.log("a", uservotes.objectAt(0)._data.post);
  //uservotes.objectAt(0).push({vote: 'up'});
  //Ember.Logger.log("posts: ",posts);
  //Ember.Logger.log("uservotes", uservotes);


  /*if(uservotes.objectAt(0) && posts.objectAt(0)){
    //Ember.Logger.log("No. uv: ", uservotes.length);
    //Ember.Logger.log("No. posts: ", posts.length);
    //console.log("uv", uservotes.objectAt(0)._data);
    var firstUservote = uservotes.objectAt(0)._data.post;
    //console.log("Finding post: ", firstUservote);
    for(var i = 0; i < 3; i++){
      var post_id = uservotes.objectAt(i)._data.post;
      //console.log("Finding post: ", post_id);
      posts.forEach(function(post){
        //console.log(post.id);
        if(post.id === post_id){
          //console.log("Match for " + i + " found");
          var vote_value = uservotes.objectAt(i)._data.value;
          if(vote_value === 1){
            //console.log("Upvote");
            //console.log(uservotes.objectAt(i));
          }
          else {
            //console.log("Downvote");
          }
        }
      });
    }
    /*uservotes.forEach(function(uservote, index) {
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
