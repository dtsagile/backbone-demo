/*global bbd Backbone _ ich dojo */

//Namespace
if (!this.bbd || typeof this.bbd !== 'object') {
    this.bbd = {};
}

bbd.ResultsView = Backbone.View.extend({
    initialize: function (args) {
        _.bindAll(this, 'update');

        this.mapModel = args.mapModel;
        this.template = ich['results-set-template'];

        this.collection.on('reset', this.update, this);

        this.render();
    },
    className: 'results-set',
    update: function () {
        var tbody = this.$('.results-table tbody').children().remove().unbind().end();
        //use an array here rather than firehosing the DOM
        //perf is a bit better
        var els = [];
        //loop the collection...
        var template = this.options.template;
        this.collection.each(function (model) {
            //rendering a view for each model in the collection
            var view = new bbd.ResultItemView({ model: model, template: template, collection: this.collection });
            //adding it to our array
            els.push(view.render().el);
        }, this);
        //push that array into this View's "el"
        tbody.append(els);
    },
    render: function () {
        $(this.options.container).append(this.el);
        this.$el.html(this.template({ title: this.options.title }, true));
        return this;
    }
});