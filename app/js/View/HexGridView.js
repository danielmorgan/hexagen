'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Terrain = require('../Model/Terrain.js');
var Hex = require('../Model/Hex.js');
var HexView = require('../View/HexView.js');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var CoordinateHelper = require('../Helper/CoordinateHelper.js');

var HexGridView = Backbone.KonvaView.extend({

    initialize: function(hexes) {
        // console.log('> HexGridView.initialize()');

        this.collection = hexes;

        this.addInitialHexes();

        this.listenTo(this.collection, 'add', this.addOneHex);
    },

    addInitialHexes: function() {
        var baseGrassHexView = new HexView({
            model: new Hex({ terrain: Terrain.grass })
        });
        baseGrassHexView.el.cache();

        this.collection.each(function(hex) {
            var pixelCoordinates = CoordinateHelper.axialToPixel(hex.get('q'), hex.get('r'));
            Layers.map.add(baseGrassHexView.el.clone({
                x: pixelCoordinates.x,
                y: pixelCoordinates.y
            }));
        });
    },

    addOneHex: function(hex) {
        console.log('> HexGridView.addOneHex()');

        var hexView = new HexView({ model: hex });
        Layers.map.add(hexView.el);
    },

    render: function() {
        console.log('> HexGridView.render()');

        Layers.map.draw();

        return this;
    }
});

module.exports = HexGridView;
