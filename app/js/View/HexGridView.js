'use strict';

var Backbone = require('backbone');
var HexView = require('../View/HexView.js');

var HexGridView = Backbone.View.extend({
    initialize: function(hexes) {
        // console.log('> HexGridView.initialize()');

        this.collection = hexes;

        this.listenTo(this.collection, 'add', this.addHex);
    },

    render: function() {
        var self = this;

        this.collection.each(function(hex) {
            self.addHex(hex);
        });

        return this;
    },

    addHex: function(hex, collection, options) {
        var hexView = new HexView({ model: hex });
        hexView.render();
    }
});

module.exports = HexGridView;
