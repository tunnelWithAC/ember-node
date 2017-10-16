import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{

  model(params) {
    return Ember.RSVP.hash({
      post: this.store.find('post', params.post_id),
      comments: this.store.query('comment', {
        post: params.post_id
      })
    });
  },
  setupController(controller, model) {
    this._super(...arguments);
    Ember.set(controller, 'post', model.post);
    Ember.set(controller, 'comments', model.comments);
  }
});
