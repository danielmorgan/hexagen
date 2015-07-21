'use strict';

var Backbone = require('backbone');
var Terrain = require('./Terrain.js');

var Hex = Backbone.Model.extend({
    defaults: {
        terrain: Terrain.grass,
        q: 0,
        r: 0
    }
});

module.exports = Hex;
