import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	text: DS.attr('string'),
	//user: DS.attr('string'),
	date: DS.attr('date'),
	visible: DS.attr('boolean'),
	upvoted: DS.attr('boolean'),
	downvoted: DS.attr('boolean'),
	votes: DS.attr('number'),
	countComments: DS.attr('number'),

	comments: DS.hasMany('comment'),
	user: DS.belongsTo('user')
	//image: DS.attr('file'),
	//imageUrl: Ember.computed.alias('thumbnailImage.thumbnail_image.url')

});
