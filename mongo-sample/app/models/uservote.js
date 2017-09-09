import DS from 'ember-data';

export default DS.Model.extend({
	//post: DS.belongsTo('post'),
	//user: DS.belongsTo('user'),
	user: DS.attr('string'),
	post: DS.attr('string'),
	value: DS.attr('number')

});
