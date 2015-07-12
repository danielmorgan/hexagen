'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var CoordinateHelper = require('../Helper/Coordinate.js');

var HexView = Backbone.KonvaView.extend({
    events: {
        'click': 'select'
    },

    initialize: function() {
        this.listenTo(this.model, 'change:selected', this.animateHex);
    },

    select: function() {
        this.model.set({
            selected: !this.model.get('selected')
        });
    },

    animateHex: function() {
        console.log('> HexView.animateHex()', this.model.get('selected'));

        var amplitude = 5;
        var period = 2000;
        var originalPosY = this.el.getY();
        var self = this;

        var animation = new Konva.Animation(function(frame) {
            self.el.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period) + originalPosY);
        }, Layers.map);

        if (this.model.get('selected')) {
            console.log('start');
            animation.start();
        } else {
            console.log('stop');
            animation.stop();
        }
    },

    el: function() {
        // console.log('> HexView.el()');

        var dimensions = this.getImageDimensions();
        var pixelCoordinates = this.axialToPixel(this.model.get('q'), this.model.get('r'));
        var terrainBackground = new Image();
        terrainBackground.src = this.model.get('terrain').image;

        var polygon = new Konva.RegularPolygon({
            sides: 6,
            radius: this.radius,
            x: pixelCoordinates.x,
            y: pixelCoordinates.y,
            opacity: 1
        });

        var image = new Konva.Image({
            width: dimensions.width,
            height: dimensions.height + 15,
            x: pixelCoordinates.x - (dimensions.width / 2),
            y: pixelCoordinates.y - (dimensions.height / 2),
            image: terrainBackground
        });

        var tile = new Konva.Group();
        tile.add(image, polygon);

        return tile;
    },

    render: function() {
        // console.log('> HexView.render()');

        Layers.map.add(this.el);
        Layers.map.draw();

        return this;
    }
});
_.extend(HexView.prototype, CoordinateHelper);

module.exports = HexView;
