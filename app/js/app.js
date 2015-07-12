'use strict';

var $ = require('jquery');
require('./stage.js');
var Hexes = require('./Model/Hexes.js');
var Terrain = require('./Model/Terrain.js');
var HexGridView = require('./View/HexGridView.js');
var SkyView = require('./View/SkyView.js');

var axialDirections = [
    { q: 0, r: -1 }, // up, left
    { q: 1, r: -1 }, // up, right
    { q: -1, r: 0 }, // left
    { q: 0, r: 0 }, // center
    { q: 1, r: 0 }, // right
    { q: -1, r: 1 }, // down, left
    { q: 0, r: 1 } // down, right
];

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return obj[result];
}

var hexArray = [];
for (var i = 0; i < 7; i++) {
    var terrain = pickRandomProperty(Terrain);
    var q = axialDirections[i].q;
    var r = axialDirections[i].r;

    hexArray.push({
        terrain: terrain,
        q: q,
        r: r
    });
}

var hexes = new Hexes(hexArray);
var hexGridView = new HexGridView(hexes);
hexGridView.render();
var skyView = new SkyView();

$(document).on('click', '.add', function(e) {
    var terrainName = $(this).data('terrain');
    hexes.add({
        q: $(this).data('q'),
        r: $(this).data('r'),
        terrain: Terrain[terrainName]
    });

    e.preventDefault();
});
