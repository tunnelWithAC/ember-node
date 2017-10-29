import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  displayNotifications: false,

  actions: {
    displayNotifications(){
      this.toggleProperty('displayNotifications');
    }
  }
});
