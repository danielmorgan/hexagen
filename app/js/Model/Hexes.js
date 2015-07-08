'use strict';

var Backbone = require('backbone');
var Hex = require('./Hex.js');

var Hexes = Backbone.Collection.extend({
    model: Hex,
    comparator: 'r'
});

module.exports = Hexes;
