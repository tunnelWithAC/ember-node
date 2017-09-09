//cont { store } = this
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  //ajax: Ember.inject.service(),
  //post: "testung user vote",
  disableUp: false,
  disableDown: false,


  postvotes: Ember.observer('uservotes', 'posts', function() {
    console.log('update');
    let uservotes  = this.get('uservotes') ;
    let posts = this.get('posts');



    if(uservotes){
      Ember.Logger.log("No. uv: ", this.get('uservotes').length);
      Ember.Logger.log("No. posts: ", posts.length);
      //console.log("uv", uservotes.objectAt(0).data);
      uservotes.forEach(function(uservote, index) {
          console.log(index, uservote.data.post);
          for(var i=0; i<posts.length; i++){
            console.log(" v " + posts.objectAt(i).post);
            if(uservote.data.post === posts.objectAt(i).post){
              console.log("match found");
              console.log(posts.objectAt(i).post);
              //pushObject
            }
          }
          /*
          find the post associated with each vote
            > > >push the value of the vote into the post
          */
          //mutableComments.pushObject(story);

      });
    }

  }),




  actions: {
    upvote(post, vote){
      return $.ajax({
        //host: 'http://localhost:8081',
        method: 'POST',
        url: 'http://localhost:8081/api/upvote',
        data: {
          vote: vote,
          user: this.get('session').userID,
          post: post.id
        }
      }).then((resp) => {
        this.set('disableUp', resp.data.status);
        if(resp.data.status){
          post.incrementProperty('votes');
        }
      });
    },

    vote(post, vote){
     $.ajax({
        //host: 'http://localhost:8081',
        method: 'POST',
        url: 'http://localhost:8081/api/vote',
        data: {
          user: this.get('session').userID,
          post: post.id
        }
      }).then((resp) => {
        this.set('disableDown', resp.data.status);
        if(resp.data.status){
          post.decrementProperty('votes');
        }
      });
    },

    addPost() {
      /*
      get index of each hashtag
      check if each hashtag is followed by a letter/number
      // https://stackoverflow.com/questions/18042133/check-if-input-is-number-or-letter-javascript
      get each word that is hashtagged
      surround each word with link
      */

      var file = document.getElementById('file-field').files[0];
      var post = this.store.createRecord('post', {
        content: this.get('post'),
        //image: file,
        author: '4 Sept',
        votes: 0
      });
      post.save();

    }
  }
});
