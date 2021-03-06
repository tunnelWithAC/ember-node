import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    //payload = { notes: payload.data };
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    //payload = { note: payload.data };
    return this._super(store, primaryModelClass, payload, id);
  },

    serializeId: function(id) {
        return id.toString();
    }
});
