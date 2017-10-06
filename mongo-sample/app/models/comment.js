import DS from 'ember-data';

export default DS.Model.extend({
	content: DS.attr('string'),
	date: DS.attr('date'),
	votes: DS.attr('number'),
  post: DS.belongsTo('post'),
	user: DS.belongsTo('user')
});
