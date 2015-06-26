"use strict";

require("./stage.js");
var HexCollection = require("./Model/HexCollection.js");
var HexCollectionView = require("./View/HexCollectionView.js");

var colors = ['black', '#FFD8D8',  '#F38383', '#E3E3FF', '#7290FF', '#E8FFCB', '#B7EB78'];
// var axialDirections = [
//     { r: 0, q: -1 }, // up, left
//     { r: 0, q: 1 }, // down, right
//     { r: -1, q: 0 }, // left
//     { r: 1, q: 0 }, // right
//     { r: 1, q: -1 }, // up, right
//     { r: -1, q: 1 } // down, left
// ];
var axialDirections = [
    { r: 0, q: 0 },
    { r: 0, q: -1 }, // up, left
    { r: 1, q: -1 }, // up, right
    { r: -1, q: 0 }, // left
    { r: 1, q: 0 }, // right
    { r: -1, q: 1 }, // down, left
    { r: 0, q: 1 } // down, right
];
var hexes = [];

for (var i = 0; i < 7; i++) {
    var color = colors[i];
    var q = axialDirections[i].q;
    var r = axialDirections[i].r;

    hexes.push({ fill: color, q: q, r: r });
}

// var hexes = new HexCollection([
//     {
//         fill: "yellow",
//         x: 100,
//         y: 100
//     },
//     {
//         fill: "orange",
//         x: 238,
//         y: 100
//     },
//     {
//         fill: "lightblue",
//         x: 169,
//         y: 220
//     },
//     {
//         fill: "blue",
//         x: 307,
//         y: 220
//     }
// ]);

new HexCollectionView(new HexCollection(hexes));
