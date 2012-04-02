/*global bbd Backbone _ ich dojo */

//Namespace
if (!this.bbd || typeof this.bbd !== 'object') {
    this.bbd = {};
}

/* The Collection of ResultItem Models */
bbd.ResultsCollection = Backbone.Collection.extend({
    initialize: function (args) {
        _.bindAll(this, 'selectFeaturesCallback');

        this.mapModel = args.mapModel;

        this.query = new esri.tasks.Query();
        this.query.returnGeometry = true;
        this.query.spatialRelationship = esri.tasks.Query.SPATIAL_REL_INTERSECTS;

        this.highlightSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                                                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([225, 0, 0]), 3),
                                                                        new dojo.Color([125, 125, 125, 0.35]));

        this.featureLayer = new esri.layers.FeatureLayer(args.url, { mode: esri.layers.FeatureLayer.MODE_SELECTION, outFields: ['*'] });
        var selectionSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
                                                                        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 255, 255]), 2),
                                                                        new dojo.Color([125, 125, 125, 0.35]));
        this.featureLayer.setSelectionSymbol(selectionSymbol);
        dojo.connect(this.featureLayer, 'onSelectionComplete', this.selectFeaturesCallback);
        //dojo.connect(this.featureLayer, 'onError', this.queryErrback);
        this.mapModel.map.addLayer(this.featureLayer);

        this.mapModel.on('searchExtentUpdated', this.onSearchExtentUpdated, this);
    },
    model: bbd.ResultItem,
    findFeature: function (oid) {
        return _.find(this.featureLayer.getSelectedFeatures(), function (item) { return item.attributes.OBJECTID === oid; });
    },
    highlightFeature: function (oid) {
        var feat = this.findFeature(oid);
        feat.setSymbol(this.highlightSymbol);
    },
    unHighlightFeature: function (oid) {
        var feat = this.findFeature(oid);
        feat.setSymbol(this.featureLayer.getSelectionSymbol());
    },
    onSearchExtentUpdated: function (criteria) {
        this.query.geometry = criteria;
        this.featureLayer.selectFeatures(this.query);
    },
    selectFeaturesCallback: function (featureSet) {
        var items = _.pluck(featureSet, 'attributes');
        this.reset(items);
    }
});