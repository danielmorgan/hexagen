'use strict';

var Backbone = require('backbone');
var HexView = require('../View/HexView.js');
var Konva = require('konva');
var Layers = require('../layers.js');

var HexGridView = Backbone.View.extend({

    initialize: function(hexes) {
        // console.log('> HexGridView.initialize()');

        this.collection = hexes;
        this.addHexesToEl();

        this.listenTo(this.collection, 'add', this.addHex);
    },

    addHexesToEl: function() {
        var group = new Konva.Group();

        this.collection.each(function(hex) {
            var hexView = new HexView({ model: hex });
            group.add(hexView.el);
        });

        this.setElement(group);
    },

    render: function() {
        Layers.map.add(this.el);
        Layers.map.draw();

        return this;
    }
});

module.exports = HexGridView;
