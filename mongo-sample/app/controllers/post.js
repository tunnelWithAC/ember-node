//cont { store } = this

import Ember from 'ember';
const { Logger } = Ember;
export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  //ajax: Ember.inject.service(),
  //post: "testung user vote",
  disableUp: false,
  disableDown: false,

  isPostRoute: true,

  postvotes: Ember.observer('uservotes', 'posts', function() {

  }),




  actions: {
    saveComment(text, postID){
      Logger.log("SENDcomment", text, postID);
      var comment = this.store.createRecord('comment', {
        content: text,
        post: postID,
        user: 'gobshite'
      });
      comment.save();
    },
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
        url: 'http://localhost:8081/api/downvote',
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

      //var file = document.getElementById('file-field').files[0];
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
