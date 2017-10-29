import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),
  newNotification: true,

  actions: {
    logout(){
        this.transitionToRoute('login');
        this.get('session').invalidate();
    },
    reload(){
      window.location.reload(true);
    }
  },

  //https://www.rvdh.de/2014/11/14/time-based-triggers-in-ember-js/
  checkNotifications: function() {
  var interval = 10000;
    Ember.run.later(this, function() {
      //Ember.Logger.log("Notification");
      //this.notifyPropertyChange('currentTimePulse');
      this.checkNotifications();
      //this.toggleProperty('newNotification');
    }, interval);
  }.on('init'),

});
