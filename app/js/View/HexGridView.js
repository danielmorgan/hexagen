'use strict';

var Backbone = require('backbone');
var Hex = require('../Model/Hex.js');
var HexView = require('../View/HexView.js');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');

var HexGridView = Backbone.KonvaView.extend({

    initialize: function(hexes) {
        // console.log('> HexGridView.initialize()');

        this.collection = hexes;

        this.addInitialHexes();

        this.listenTo(this.collection, 'add', this.addOneHex);
    },

    addInitialHexes: function() {
        var baseGrassHex = new Hex({
            x: 0,
            y: 0,
            terrain: { 'name': 'grass', 'image': 'img/grass.png' }
        })
        var baseGrassHexView = new HexView({ model: baseGrassHex });
        console.log(baseGrassHexView);
        baseGrassHexView.el.cache();

        this.collection.each(function(hex) {
            var grassHexView = baseGrassHexView.el.clone({
                x: hex.x,
                y: hex.y
            });
            grassHexView.cache();
            // var grassHexView = new HexView({ model: hex });
            Layers.map.add(grassHexView.el);
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
