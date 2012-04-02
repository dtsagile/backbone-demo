/*global bbd Backbone _ ich dojo */

//Namespace
if (!this.bbd || typeof this.bbd !== 'object') {
    this.bbd = {};
}

/* ResultItem Model */
bbd.ResultItem = Backbone.Model.extend({});

/* ResultItem View */
bbd.ResultItemView = Backbone.View.extend({
    initialize: function (args) {
        this.template = ich['result-item-template1'];
        this.collection = args.collection;
    },
    tagName: 'tr',
    events: {
        'mouseenter': 'onMouseEnter',
        'mouseleave': 'onMouseLeave'
    },
    onMouseEnter: function (evt) {
        var oid = this.model.get('OBJECTID');
        this.collection.highlightFeature(oid);

        this.$el.addClass('active');
    },
    onMouseLeave: function () {
        var oid = this.model.get('OBJECTID');
        this.collection.unHighlightFeature(oid);

        this.$el.removeClass('active');
    },
    render: function () {
        var content = this.template(this.model.toJSON(), true);
        this.$el.html(content);
        return this;
    }
});