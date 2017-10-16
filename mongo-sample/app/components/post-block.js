import Ember from 'ember';

//https://alisdair.mcdiarmid.org/ember-closure-actions-have-return-values/
export default Ember.Component.extend({
  actions: {
    upvote(post, vote){
      this.attrs.upvote(post, vote);
    },
    downvote(post, vote){
      this.attrs.downvote(post, vote);
    },
    saveComment(text){
       this.attrs.comment(text);
       this.set('post.comment', '');
    }
  }
});
