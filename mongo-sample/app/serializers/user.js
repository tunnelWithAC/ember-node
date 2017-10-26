import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  primaryKey: '_id',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    Ember.Logger.log("USER SERIALIZER");
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  normalizeSingleResponse(store, primaryModelClass, payload, id) {
    Ember.Logger.log("USER SERIALIZER");
    return this._super(store, primaryModelClass, payload, id);
  },

  serializeId: function(id) {
      return id.toString();
  }

});
