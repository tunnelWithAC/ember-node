import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	content: DS.attr('string'),
	author: DS.attr('string'),
	//date: DS.attr('date'),
	votes: DS.attr('number'),
	user: DS.belongsTo('user')
	//image: DS.attr('file'),
	//imageUrl: Ember.computed.alias('thumbnailImage.thumbnail_image.url')

});
