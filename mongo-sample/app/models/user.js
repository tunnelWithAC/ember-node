import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	email: DS.attr('string'),
	//dob: DS.attr('string'),
	date: DS.attr('date'),
	posts: DS.hasMany('post')

});
