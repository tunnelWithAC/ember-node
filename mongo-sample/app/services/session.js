import Ember from 'ember';

export default Ember.Service.extend({
  token: null,
  authenticate(log, pass){
    return $.ajax({
      method: 'POST',
      url: '/token',
      data: {
        username: log,
        password: pass
      }
    }).then((info) => {
      this.set('token', info.access_token);
    });
  }
});
