"use strict";

require("./stage.js");
var HexCollection = require("./Model/HexCollection.js");
var HexCollectionView = require("./View/HexCollectionView.js");

var colors = ['#222222', '#2ecc71',  '#3498db', '#ecf0f1', '#34495e', '#f1c40f', '#e74c3c'];
var axialDirections = [
    { q: 0, r: -1 }, // up, left
    { q: 1, r: -1 }, // up, right
    { q: -1, r: 0 }, // left
    { q: 0, r: 0 },
    { q: 1, r: 0 }, // right
    { q: -1, r: 1 }, // down, left
    { q: 0, r: 1 } // down, right
];
var hexes = [];

for (var i = 0; i < 7; i++) {
    var color = colors[i];
    var q = axialDirections[i].q;
    var r = axialDirections[i].r;

    hexes.push({ fill: color, q: q, r: r });
}

new HexCollectionView(new HexCollection(hexes));
