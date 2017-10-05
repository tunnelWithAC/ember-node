import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
export default DS.RESTAdapter.extend({
	namespace: 'api',
	session: Ember.inject.service(),
	//authorizer: 'authorizer:oauth2',
	/*headers: Ember.computed('session.token', function(){
		return{
			'Authorization': `Bearer ${this.get('session.token')}`
		}
	}),*/
	host: 'http://localhost:8081'
});
