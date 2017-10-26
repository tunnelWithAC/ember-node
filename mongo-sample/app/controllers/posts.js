//cont { store } = this
import Ember from 'ember';
import EmberObject, { computed } from '@ember/object'

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  post: '',

  init: function() {
  },

  sortedPosts: Ember.computed.sort('posts', 'sortDefinition'),
  sortBy: 'date:desc', // default sort by date
  sortDefinition: Ember.computed('sortBy', function() {
    return [ this.get('sortBy') ];
  }),

  charactersRemaining: Ember.computed('post', function() {
    let text = this.get('post').length;
    return 256 - this.get('post').length;
  }),

  postDirty: Ember.computed('charactersRemaining', function() {
    if(this.get('charactersRemaining') === 256){
      Ember.Logger.log("Clean");
      return false;
    } else {
      Ember.Logger.log("Dirty");
      return true;
    }
  }),

  actions: {
    sortDate(){
      this.set('sortBy', 'date:desc');
      var u = this.get('session').get('store');
      Ember.Logger.log("u" , u);
      //598a2c2fd5937c37eb53b9cd
      var session_data = this.get('session').get('session').get('content');
      var u_id = session_data.authenticated.user.id;
      Ember.Logger.log("cookie:", u_id);
    },
    sortVotes(){
      this.set('sortBy', 'votes:desc');
    },
    upvote(post, vote){
      return $.ajax({
        method: 'POST',
        url: 'http://localhost:8081/api/upvote',
        data: {
          /*vote: vote,*/
          user: 'hardcodefornow',
          post: post
        }
      }).then((resp) => {
        Ember.Logger.log('RESP \n', resp.data.status);
        this.set('disableUp', resp.data.status);
        if(resp.data.status){
          Ember.Logger.log("changing vote", post);
          this.store.find('post', post).then(function(post){
            post.incrementProperty('votes');
          });
        }
      });
    },

    downvote(post, vote){
      Ember.Logger.log("Params: ", post, vote);
      $.ajax({
        method: 'POST',
        url: 'http://localhost:8081/api/downvote',
        data: {
          user: 'hardcodefornow',
          post: post
        }
      }).then((resp) => {
        Ember.Logger.log('RESP \n', resp.data.status);
        this.set('disableDown', resp.data.status);
        if(resp.data.status){
          Ember.Logger.log("changing vote", post);
          this.store.find('post', post).then(function(post){
            post.decrementProperty('votes');
          });
        }
      });
    },
    addPost() {
      var text = this.get('post');
      if(text.length > 256){
        text = text.substring(0,256);
      }
      var session_data = this.get('session').get('session').get('content');
      var u_id = session_data.authenticated.user.id;
      var post = this.store.createRecord('post', {
        text: this.get('post'),
        author: u_id,
        votes: 0
      });
      post.save();
      this.set('post', '');
    }
  }
});
