import Ember from 'ember';

export default Ember.Service.extend({
  token: null,
  client_key: null,

  authenticate(log, pass){
    return $.ajax({
      //host: 'http://localhost:8081',
      method: 'POST',
      url: 'http://localhost:8081/token',
      data: {
        grant_type: 'password',
        username: log,
        password: pass
      }
    }).then((info) => {
      this.set('token', info.access_token);
      //this.set('client_key', info.client_key);
      console.log(info);
    });
  }
});
