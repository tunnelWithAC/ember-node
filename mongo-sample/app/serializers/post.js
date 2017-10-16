import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
		Ember.Logger.log("POST Serializer", payload.data);
		payload = { posts: payload.data };
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
		payload.data = payload.posts;
		delete payload.posts;
		Ember.Logger.log("1", payload.data);
		Ember.Logger.log("2", payload.data.content);
		payload = { post: payload.data };
		Ember.Logger.log("Payload2", payload);
    return this._super(store, primaryModelClass, payload, id);
  },

    serializeId: function(id) {
        return id.toString();
    }
});
