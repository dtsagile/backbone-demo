//Namespace
if (!this.dts || typeof this.dts !== 'object') {
    this.dts = {};
}

//Event Aggregator
dts.eventAggregator = _.extend({}, Backbone.Events);

//The Router
dts.Router = Backbone.Router.extend({
    initialize: function (args) {               
		//setup pub/sub
        //dts.eventAggregator.bind('myEvent', this.myEventHandler, this);
    },
    routes: {
        '': 'index',
    },
    index: function () {
		//initialize the main view
		//new dts.AppView();
    }
});