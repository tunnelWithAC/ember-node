import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

model(params) {
  console.log(this.store.query('comment', {
    post: '59a0a1c7e38ce00d0e87438c'
  }));
  return this.store.find('post', params.post_id);
  },
});
