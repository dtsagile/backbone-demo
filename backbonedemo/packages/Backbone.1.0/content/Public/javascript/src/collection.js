//Namespace
if (!this.dts || typeof this.dts !== 'object') {
    this.dts = {};
}

////////////////////////////////////////////////////

//the collection of result items
dts.Collection = Backbone.Collection.extend({
    initialize: function (args) {
        this.baseUrl = args.baseUrl;
        this.bind('reset', function () { this.isDirty = false; });
    },
    baseUrl: '',
    url: function () {
        var url = this.baseUrl;
        //doing it this way results in a querystring, not a restful url, but it allows us to have no knowledge of the parameters
        //add params to url here
        return url;
    },
    isDirty: false,
    model: dts.Model
});