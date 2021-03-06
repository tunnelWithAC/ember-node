import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    //payload.data.attributes.amount = payload.data.attributes.cost.amount;
    //payload.data.attributes.currency = payload.data.attributes.cost.currency;
    //delete payload.data.attributes.cost;

    payload = { uservotes: payload.data };
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    payload = { uservote: payload.data };
    //payload.data.attributes.amount = payload.data.attributes.cost.amount;
    //payload.data.attributes.currency = payload.data.attributes.cost.currency;

    //delete payload.data.attributes.cost;

    return this._super(store, primaryModelClass, payload, id);
  },

    serializeId: function(id) {
        return id.toString();
    }
});
