'use strict';

require('./stage.js');
var Hexes = require('./Model/Hexes.js');
var HexesView = require('./View/HexesView.js');

var colors = ['#222222', '#2ecc71',  '#3498db', '#ecf0f1', '#34495e', '#f1c40f', '#e74c3c'];
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
var hexArray = [];

for (var i = 0; i < 14; i++) {
    var color = colors[i];
    var q = axialDirections[i].q;
    var r = axialDirections[i].r;

    hexArray.push({ fill: color, q: q, r: r });
}

var hexes = new Hexes(hexArray);
var hexesView = new HexesView(hexes);
