import Ember from 'ember';

export default Ember.Service.extend({
  token: null,
  client_key: null,
  isAuthenticated: false,
  errorMessage: null,
  currentUser: null,

  authenticate(email, pass){
    return $.ajax({
      //host: 'http://localhost:8081',
      method: 'POST',
      url: 'http://localhost:8081/token',
      data: {
        grant_type: 'password',
        email: email,
        password: pass
      }
    }).then((info) => {
      this.set('token', info.data.access_token);
      this.set('userID', info.data.user.id);
      //this.set('client_key', info.client_key);
      console.log(info.data);
      this.set('isAuthenticated', true );

    });
  }
});
