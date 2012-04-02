/*global bbd Backbone _ ich dojo */

//Namespace
if (!this.bbd || typeof this.bbd !== 'object') {
    this.bbd = {};
}

/* Map Model */
bbd.MapModel = Backbone.Model.extend({
    initialize: function () {
        _.bindAll(this, 'activateSearch', 'updateSearchExtent');

        var initialExtent = new esri.geometry.Extent({ xmin: -12982292.126516413, ymin: 4001527.6187133053, xmax: -12963947.239727996, ymax: 4009171.3215418123, spatialReference: { 'wkid': 102100} });
        this.map = new esri.Map('map', { extent: initialExtent });
        var tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer');
        this.map.addLayer(tiledMapServiceLayer);

        this.drawToolbar = new esri.toolbars.Draw(this.map);
        dojo.connect(this.drawToolbar, 'onDrawEnd', this.updateSearchExtent);
        $('#map-search').click(this.activateSearch);
    },
    activateSearch: function () {
        this.drawToolbar.activate(esri.toolbars.Draw.EXTENT);
    },
    updateSearchExtent: function (geom) {
        this.drawToolbar.deactivate();
        this.trigger('searchExtentUpdated', geom, this);
    }
});