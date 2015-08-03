'use strict';

var Backbone = require('backbone');
var HexView = require('../View/HexView.js');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');

var HexGridView = Backbone.KonvaView.extend({

    initialize: function(hexes) {
        // console.log('> HexGridView.initialize()');

        this.collection = hexes;
        this.collection.each(this.addOneHex);

        this.listenTo(this.collection, 'add', this.addOneHex);
    },

    addOneHex: function(hex) {
        // console.log('> HexGridView.addOneHex()');

        var hexView = new HexView({ model: hex });
        Layers.map.add(hexView.el);
    },

    render: function() {
        // console.log('> HexGridView.render()');

        Layers.map.draw();

        return this;
    }
});

module.exports = HexGridView;
