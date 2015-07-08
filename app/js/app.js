'use strict';

require('./stage.js');
var Hexes = require('./Model/Hexes.js');
var Terrain = require('./Model/Terrain.js');
var HexesView = require('./View/HexesView.js');

var axialDirections = [
    { q: 0, r: -1 }, // up, left
    { q: 1, r: -1 }, // up, right
    { q: -1, r: 0 }, // left
    { q: 0, r: 0 }, // center
    { q: 1, r: 0 }, // right
    { q: -1, r: 1 }, // down, left
    { q: 0, r: 1 }, // down, right
    { q: 0, r: -2 },
    { q: 1, r: -2 },
    { q: -2, r: 0 },
    { q: 0, r: 0 },
    { q: 2, r: 0 },
    { q: -1, r: 2 },
    { q: 0, r: 2 }
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
for (var i = 0; i < 14; i++) {
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
var hexesView = new HexesView(hexes);
