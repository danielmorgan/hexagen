"use strict";

var Backbone = require("backbone");
var HexCollection = require("../Model/HexCollection.js")
var HexView = require("../View/HexView.js")

var HexCollectionView = Backbone.View.extend({
    initialize: function(hexes) {
        console.log("HexCollectionView.initialize()");

        this.hexes = hexes;

        this.hexes.each(function(hex){
            new HexView({ model: hex });
        }, this);
    }
});

module.exports = HexCollectionView;