import Ember from 'ember';

export default Ember.Route.extend({
	content: 'test',

	model: function() {
		return this.store.findAll('post');
	},

	
});
