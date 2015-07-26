'use strict';

var Backbone = require('backbone');
var Hex = require('./Hex.js');

var Hexes = Backbone.Collection.extend({
    model: Hex,
    comparator: 'r',
    selected: null,

    setSelected: function(hex) {
        this.selected = hex;
        this.trigger('setSelected', this.selected.cid);
    }
});

module.exports = Hexes;
