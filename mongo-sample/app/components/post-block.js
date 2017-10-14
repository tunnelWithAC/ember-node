import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveComment(text, postID){
       this.attrs.comment(text, postID);
    }
  }
});
