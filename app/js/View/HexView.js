'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var CoordinateHelper = require('../Helper/Coordinate.js');

var HexView = Backbone.KonvaView.extend({
    animation: false,

    events: {
        'click': 'setSelected'
    },

    initialize: function() {
        this.collection = this.model.collection;
    },

    setSelected: function() {
        console.log('> HexView.setSelected()');
        
        this.collection.setSelected(this.model);
        this.toggleSelectedAnimation();
    },

    toggleSelectedAnimation: function() {
        console.log('> HexView.toggleSelectedAnimation()');
        // this.model == this.collection.selected
        
        if (! this.animation) {
            this.startAnimation();
        } else {
            this.resetPosition();
            this.stopAnimation();
        }
    },

    startAnimation: function() {
        console.log('> HexView.animateHex()', this.collection.selected.cid);

        var amplitude = 5;
        var period = 2000;
        var self = this;

        this.animation = new Konva.Animation(function(frame) {
            self.el.setY(amplitude * Math.sin(frame.time * 2 * Math.PI / period));
        }, Layers.map);
        this.animation.start();
    },

    stopAnimation: function() {
        console.log('> HexView.stopAnimations()', this.model.get('selected'));

        if (this.el.getY() !== 0) {
            this.resetPosition(function() {
                this.animation.stop();
            });
        } else {
            this.animation.stop();
        }

        this.animation = false;
    },

    resetPosition: function(callback) {
        console.log('> HexView.resetPosition()');

        this.el.setY(0);
        callback;
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
