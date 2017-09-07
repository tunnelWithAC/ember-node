import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    //payload.data.attributes.amount = payload.data.attributes.cost.amount;
    //payload.data.attributes.currency = payload.data.attributes.cost.currency;
    //delete payload.data.attributes.cost;
    //payload = { posts: payload.data };
    console.log("resp");
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    //payload = { post: payload.data };
    //payload.data.attributes.amount = payload.data.attributes.cost.amount;
    //payload.data.attributes.currency = payload.data.attributes.cost.currency;

    //delete payload.data.attributes.cost;
    console.log("resp");
    return this._super(store, primaryModelClass, payload, id);
  },

  serializeId: function(id) {
      return id.toString();
  }

});
