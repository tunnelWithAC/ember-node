import Ember from 'ember';

export default Ember.Controller.extend({

  session: Ember.inject.service('session'),

  actions: {
    logout(){
        Ember.Logger.log("Logout called");
        this.get('session').invalidate();
    }

  }

});
