"use strict";

var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var Konva = require("konva");
var KonvaView = require("backbone.konvaview");
var Layers = require("../layers.js");
var GrassTile = require("./GrassTile.js");


var HexView = Backbone.KonvaView.extend({
    initialize: function() {
        console.log("HexView.initialize()")

        this.addToMap();
        this.render();
        this.listen();
    },

    listen: function() {
        console.log("HexView.listen()")

        this.listenTo(this.model, "change", this.update);
    },

    el: function() {
        console.log("HexView.el()");

        var radius = 80;
        var width = radius * 1.75;
        var height = radius * 2;
        var grassTile = new GrassTile();

        var polygon = new Konva.RegularPolygon({
            sides: 6,
            radius: radius,
            x: this.model.get("x"),
            y: this.model.get("y"),
            stroke: "black",
            strokeWidth: 1,
            opacity: 1
        });

        var image = new Konva.Image({
            width: width,
            height: height + 15,
            x: this.model.get("x") - (width / 2),
            y: this.model.get("y") - (height / 2),
            image: grassTile.el
        });

        var tile = new Konva.Group();
        tile.add(image, polygon);

        return tile;
    },

    changeFill: function() {
        console.log("HexView.changeFill()")

        var colors = ['#222222', '#2ecc71',  '#3498db', '#ecf0f1', '#34495e', '#f1c40f', '#e74c3c'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        // console.log("HexView.changeFill()", color)

        this.model.set({ fill: color, opacity: 0.5 });
    },

    addToMap: function() {
        console.log("HexView.addToMap()")

        Layers.map.add(this.el);
    },

    render: function() {
        console.log("HexView.render()", this.model.get("x"), this.model.get("y"));

        Layers.map.draw();
    },

    update: function(object) {
        console.log("HexView.update()");

        console.log(this.el.children[0].attrs.image["src"]);

        if (this.el.children[0].attrs.image["src"] == "http://localhost:3000/img/paper.png") {
            this.el.children[0].attrs.image["src"] = "img/grass.png"
        } else {
            this.el.children[0].attrs.image["src"] = "img/paper.png"
        }

        this.render();
    },

    events: {
        "click": "changeFill"
    }
});

module.exports = HexView;
