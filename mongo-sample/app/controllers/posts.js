//cont { store } = this
import Ember from 'ember';
import EmberObject, { computed } from '@ember/object'

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  //ajax: Ember.inject.service(),
  //post: "testung user vote",
  disableUp: false,
  disableDown: false,

  todos: null,

  sortedPosts: Ember.computed.sort('posts', 'sortDefinition'),
  sortBy: 'date:desc', // default sort by date
  dateSort: 'date:desc',
  voteSort: 'votes:desc',
  sortDefinition: Ember.computed('sortBy', function() {
    return [ this.get('sortBy') ];
  }),

  init() {

    this.set('todos', [
      EmberObject.create({ isDone: true }),
      EmberObject.create({ isDone: false }),
      EmberObject.create({ isDone: true }),
    ]);
  },

  selectedTodo: null,
  indexOfSelectedTodo: computed('selectedTodo', 'todos.[]', function() {
    console.log(this.get('selectedTodo'));
    return this.get('todos').indexOf(this.get('selectedTodo'));
  }),

  postvotes: Ember.observer('uservotes', 'posts', function() {
    console.log("Posts: ", this.get('posts'));
    let posts = this.get('posts');
    let uservotes = this.get('uservotes');
    var uv = Ember.A();
    if(uservotes){
      uservotes.forEach(function(uservote){
        console.log(uservote.id);
        uv.pushObject(uservote.id);
      });
    }
    console.log(uv);
    return "test";

  }),

  isTrue: function(param) {
    console.log(param);
    return false;
  }.property('uservotes'),

  actions: {
    sortDate(){
      this.set('sortBy', 'date:desc');
    },
    sortVotes(){
      this.set('sortBy', 'votes:desc');
    },
    saveComment(post, comment, index){
      Ember.Logger.log("Action called", post, comment, index);
      let posts  = this.get('posts');
      Ember.Logger.log(posts.objectAt(index));
      //this.set(posts.objectAt(index).comment, "");
      /*return $.ajax({
      method: 'POST',
      url: 'http://localhost:8081/api/comments',
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
});*/
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

downvote(post, vote){
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
  var post = this.store.createRecord('post', {
    content: this.get('post'),
    //image: file,
    author: '4 Sept',
    votes: 0
  });
  post.save();
},
addComment(){
  // var user = this.get.('session').currentUser();
  var comment = this.store.createRecord('comment', {
    comment: 'test'
  });
  comment.save();
}
}
});
