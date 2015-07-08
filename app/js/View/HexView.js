'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var GrassTile = require('./GrassTile.js');
var CoordinateHelper = require('../Helper/Coordinate.js');


var HexView = Backbone.KonvaView.extend({
    initialize: function() {
        console.log('HexView.initialize()');

        this.addToMap();
        this.render();
        this.listen();
    },

    listen: function() {
        console.log('HexView.listen()');

        this.listenTo(this.model, 'change', this.update);
    },

    el: function() {
        console.log('HexView.el()');

        var radius = 80;
        var width = radius + (radius * 3/4);
        var height = radius * 2;
        var grassTile = new GrassTile();
        var pixelCoordinates = this.axialToPixel(this.model.get('q'), this.model.get('r'));

        var polygon = new Konva.RegularPolygon({
            sides: 6,
            radius: radius,
            x: pixelCoordinates.x,
            y: pixelCoordinates.y,
            stroke: 'black',
            strokeWidth: 1,
            opacity: 1
        });

        var image = new Konva.Image({
            width: width,
            height: height + 15,
            x: pixelCoordinates.x - (width / 2),
            y: pixelCoordinates.y - (height / 2),
            stroke: 'purple',
            strokeWidth: 1,
            image: grassTile.el
        });

        var tile = new Konva.Group();
        tile.add(image, polygon);

        return tile;
    },

    changeFill: function() {
        console.log('HexView.changeFill()');

        var colors = ['#222222', '#2ecc71',  '#3498db', '#ecf0f1', '#34495e', '#f1c40f', '#e74c3c'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        // console.log('HexView.changeFill()', color)

        this.model.set({ fill: color, opacity: 0.5 });
    },

    addToMap: function() {
        console.log('HexView.addToMap()');

        Layers.map.add(this.el);
    },

    render: function() {
        console.log('HexView.render()');

        Layers.map.draw();
    },

    update: function() {
        console.log('HexView.update()');

        var images = ['img/paper.png', 'img/grass.png'];
        this.el.children[0].attrs.image.src = images[Math.floor(Math.random() * images.length)];

        this.render();
    },

    events: {
        'click': 'changeFill'
    }
});
_.extend(HexView.prototype, CoordinateHelper);

module.exports = HexView;
