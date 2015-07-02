"use strict";

var $ = require("jquery");
var _ = require("underscore");
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
        console.log("HexView.listen()")

        this.listenTo(this.model, "change", this.update);
    },

    el: function() {
        console.log("HexView.el()")

        var polygon = new Konva.RegularPolygon({
            sides: 6,
            radius: 80,
            x: this.model.get("x"),
            y: this.model.get("y"),
            fill: "#eee",
            opacity: 1
        });

        return polygon;
    },

    loadImage: function() {
        var grassTile = new Image();
        $(grassTile).on('load', null, this, function(event) {
            var self = event.data;

            var image = new Konva.Image({
                x: self.model.get("x") - (width / 2),
                y: self.model.get("y") - ((height - 15) / 2),
                image: grassTile.el,
                width: width,
                height: height
            });

            group.add(image);
        });
        grassTile.src = 'img/grass.png';
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

        this.el.attrs["fill"] = this.model.get("fill");

        this.render();
    },

    events: {
        "click": "changeFill"
    }
});

module.exports = HexView;
