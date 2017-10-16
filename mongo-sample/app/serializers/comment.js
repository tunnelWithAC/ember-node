import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    /*payload.data.forEach(function(obj, index){
			delete payload.data.objectAt(index).author;
		});*/
    Ember.Logger.log("normalizeResponse Comment", payload);
		payload = { comments:  payload.data };
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
		Ember.Logger.log("normalizeSingleResponse Comment", payload);
		payload.data = payload.posts;
		delete payload.posts;
		  payload = { comment: payload.data };
  // /  payload = { post: payload };
    //payload.data.attributes.amount = payload.data.attributes.cost.amount;
    //payload.data.attributes.currency = payload.data.attributes.cost.currency;

    //delete payload.data.attributes.cost;
		Ember.Logger.log("commentPayload", payload);
    return this._super(store, primaryModelClass, payload, id);
  },

    serializeId: function(id) {
        return id.toString();
    }
});
