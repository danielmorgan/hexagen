"use strict";

// Dependencies
var Backbone = require("backbone");
var Konva = require("konva");
require("backbone.konvaview");


// Init world
var Game = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
});
var Map = new Konva.Layer();
Game.add(Map);


// Hex model
var Hex = Backbone.Model.extend({
    defaults: {
        stroke: "black",
        x: 0,
        y: 0
    }
});


// Hex collection
var HexCollection = Backbone.Collection.extend({ model: Hex });


// Hex view
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

        Map.add(this.el);
	},

    render: function() {
        console.log("HexView.render()");

        Map.draw();
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



var World = Backbone.KonvaView.extend({
    initialize: function() {
        console.log("World.initialize()");

        hexes.each(function(hex){
            new HexView({ model: hex });
        }, this);
    }
});

new World();
