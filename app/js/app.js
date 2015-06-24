"use strict";

require("./stage.js");
var HexCollection = require("./Model/HexCollection.js");
var HexCollectionView = require("./View/HexCollectionView.js");

var colors = ["green", "green", "green", "green", "green", "blue", "blue", "blue", "yellow"];
var axialDirections = [
    { q: 0, r: -1 }, // up, left
    { q: 0, r: 1 }, // down, right
    { q: -1, r: 0 }, // left
    { q: 1, r: 0 }, // right
    { q: 1, r: -1 }, // up, right
    { q: -1, r: 1 } // down, left
]
var hexes = [];

for (var i = 0; i < 10; i++) {
    var color = colors[Math.floor(Math.random() * colors.length)];
    var j = Math.floor(Math.random() * axialDirections.length);
    var q = axialDirections[j].q;
    var r = axialDirections[j].r;

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