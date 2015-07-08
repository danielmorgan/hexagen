'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var CoordinateHelper = require('../Helper/Coordinate.js');


var HexView = Backbone.KonvaView.extend({
    initialize: function() {
        // console.log('> HexView.initialize()');

        this.addToMap();
        this.render();
        this.listen();
    },

    listen: function() {
        // console.log('> HexView.listen()');

        this.listenTo(this.model, 'change', this.update);
    },

    el: function() {
        // console.log('> HexView.el()');

        var radius = 80;
        var width = radius + (radius * 3/4);
        var height = radius * 2;
        var pixelCoordinates = this.axialToPixel(this.model.get('q'), this.model.get('r'));
        var terrainBackground = new Image();
        terrainBackground.src = this.model.get('terrain').image;

        var polygon = new Konva.RegularPolygon({
            sides: 6,
            radius: radius,
            x: pixelCoordinates.x,
            y: pixelCoordinates.y,
            opacity: 1
        });

        var image = new Konva.Image({
            width: width,
            height: height + 15,
            x: pixelCoordinates.x - (width / 2),
            y: pixelCoordinates.y - (height / 2),
            image: terrainBackground
        });

        var tile = new Konva.Group();
        tile.add(image, polygon);

        return tile;
    },

    changeFill: function() {
        // console.log('> HexView.changeFill()');

        var colors = ['#222222', '#2ecc71',  '#3498db', '#ecf0f1', '#34495e', '#f1c40f', '#e74c3c'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        // console.log('HexView.changeFill()', color)

        this.model.set({ fill: color });
    },

    addToMap: function() {
        // console.log('> HexView.addToMap()');

        Layers.map.add(this.el);
    },

    render: function() {
        // console.log('> HexView.render()');

        Layers.map.draw();
    },

    update: function() {
        // console.log('> HexView.update()');

        this.el.children[1].attrs.fill = this.model.get('fill');

        this.render();
    },

    events: {
        'click': 'changeFill'
    }
});
_.extend(HexView.prototype, CoordinateHelper);

module.exports = HexView;
