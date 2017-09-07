import ApplicationAdapter from './application';
import FormDataAdapterMixin from 'ember-cli-form-data/mixins/form-data-adapter';

/*export default ApplicationAdapter.extend(FormDataAdapterMixin, {
});*/

import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	namespace: 'api',
	session: Ember.inject.service(),
	/*headers: Ember.computed('session.token', function(){
		return{
			'Authorization': `Bearer ${this.get('session.token')}`
		}
	}),*/
	host: 'http://localhost:8081'
});
