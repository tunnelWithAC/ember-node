import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),
/*
  actions: {
    login(){
      Ember.Logger.log("Logging in");
    },
    logout(){
        this.get('session').invalidate();
    }

  }
  */
});
