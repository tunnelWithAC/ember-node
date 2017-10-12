import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    /*payload.data.forEach(function(obj, index){
			delete payload.data.objectAt(index).author;
		});*/

		payload = { posts: payload.data };
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
		payload.data = payload.posts;
		delete payload.posts;
		  payload = { post: payload.data };
  // /  payload = { post: payload };
    //payload.data.attributes.amount = payload.data.attributes.cost.amount;
    //payload.data.attributes.currency = payload.data.attributes.cost.currency;

    //delete payload.data.attributes.cost;
		Ember.Logger.log("Payload2", payload);
    return this._super(store, primaryModelClass, payload, id);
  },

    serializeId: function(id) {
        return id.toString();
    }
});
