'use strict';

var Backbone = require('backbone');
var Hex = require('./Hex.js');

var Hexes = Backbone.Collection.extend({
    model: Hex,
    comparator: 'r',
    selected: null,

    initialize: function() {
    },

    setSelected: function(hex) {
        console.log('> Hexes.setSelected()');

        this.selected = hex;
    }
});

module.exports = Hexes;
