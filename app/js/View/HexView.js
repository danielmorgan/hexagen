"use strict";

var Backbone = require("backbone");
var Konva = require("konva");
var KonvaView = require("backbone.konvaview");
var Layers = require("../layers.js");

var HexView = Backbone.KonvaView.extend({
	initialize: function() {
        console.log("HexView.initialize()")

        this.addToMap();
        this.render();
        this.listen();
	},

    listen: function() {
        this.listenTo(this.model, "change", this.update);
    },

	el: function() {
        console.log("HexView.el()")

		return new Konva.RegularPolygon({
            sides: 6,
            radius: 80,
            x: this.model.get("x"),
            y: this.model.get("y"),
            fill: this.model.get("fill"),
            stroke: this.model.get("stroke")
		});
	},

    changeFill: function() {
        console.log("HexView.changeFill()")
        var colors = ["red", "yellow", "green", "purple", "white"];
        var color = colors[Math.floor(Math.random() * colors.length)];
        console.log("HexView.changeFill()", color)

        this.model.set({ fill: color, opacity: 0.5 });
    },

	addToMap: function() {
        console.log("HexView.addToMap()")

        Layers.map.add(this.el);
	},

    render: function() {
        console.log("HexView.render()");

        Layers.map.draw();
    },

    update: function(object) {
        console.log("HexView.update()");
        this.el.attrs["fill"] = this.model.get("fill");

        this.render();
    },

    events: {
        "click": "changeFill"
    }
});

module.exports = HexView;