"use strict";

var Backbone = require("backbone");
var Konva = require("konva");
var Hexes = require("../Model/Hexes.js");
var HexView = require("../View/HexView.js");
var Layers = require("../layers.js");
var hexagon;

var HexesView = Backbone.View.extend({
    initialize: function(hexes) {
        console.log("HexesView.initialize()");

        this.hexes = hexes;

        this.hexes.each(function(hex){
            hexagon = new HexView({ model: hex });
        }, this);

		var amplitude = 5;
		var period = 2000;
        var originalPosY = hexagon.el.getY();
        var anim = new Konva.Animation(function(frame) {
        	hexagon.el.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + originalPosY);
        }, Layers.map);
        // anim.start();
    }
});

module.exports = HexesView;