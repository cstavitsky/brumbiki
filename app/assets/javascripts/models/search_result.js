var SearchResult = Backbone.Model.extend({
  initialize: function() {
    var attributes = this.attributes;
    if (attributes.handle.match(/^[^@]/)) {
       attributes.handle = "@" + attributes.handle;
    }
  }
});
