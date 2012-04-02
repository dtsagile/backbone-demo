//Namespace
if (!this.bbt || typeof this.bbt !== 'object') {
    this.bbt = {};
}

//the result item view
dts.AppView = Backbone.View.extend({
    tagName: 'tr',
	//OR el: 'selector',
	//className: 'foo-class',
    initialize: function (args) {
        _.bindAll(this, 'myHandler', 'myOtherHandler');
		
		this.template = ich.template-id;		

        this.collection.bind('reset', this.render, this);
		//OR
		//this.model.bind('reset', this.render, this);

        dts.eventAggregator.bind('pubSubEvent', this.myHandler);
        dts.eventAggregator.bind('otherPubSubEvent', this.myOtherHandler);

        this.render();
    },
    render: function () {
        //render the jQuery template
        var content = this.template(this.model.toJSON(), true);
        //take the rendered HTML and pop it into the DOM
        $(this.el).html(content);
		
		//OR
		//$(this.options.container).append(this.el);
        //$(this.el).html(this.template(this.model.toJSON(), true));
		
        return this;
    }
});