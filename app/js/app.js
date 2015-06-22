"use strict";

require("./stage.js");
var HexCollection = require("./Model/HexCollection.js");
var HexCollectionView = require("./View/HexCollectionView.js");

var hexes = new HexCollection([
    {
        fill: "yellow",
        x: 100,
        y: 100
    },
    {
        fill: "orange",
        x: 238,
        y: 100
    },
    {
        fill: "lightblue",
        x: 169,
        y: 220
    },
    {
        fill: "blue",
        x: 307,
        y: 220
    }
]);

new HexCollectionView(hexes);