"use strict";

require("./stage.js");
var HexCollection = require("./Model/HexCollection.js");
var HexCollectionView = require("./View/HexCollectionView.js");

var colors = ['black', '#FFD8D8',  '#F38383', '#E3E3FF', '#7290FF', '#E8FFCB', '#B7EB78'];
var axialDirections = [
    { q: 0, r: 0 },
    { q: 0, r: -1 }, // up, left
    { q: 1, r: -1 }, // up, right
    { q: -1, r: 0 }, // left
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
