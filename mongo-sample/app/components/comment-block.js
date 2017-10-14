import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    saveComment(){
      Ember.Logger.log("Comment");
    }
  }
});
