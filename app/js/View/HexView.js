'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var CoordinateHelper = require('../Helper/CoordinateHelper.js');

var HexView = Backbone.KonvaView.extend({
    animation: false,
    enableCoordinates: true,

    events: {
        'click #polygon': function() {
            this.collection.setSelected(this.model);
        }
    },

    initialize: function() {
        this.collection = this.model.collection;

        this.listenTo(this.collection, 'setSelected', this.toggleSelectedAnimation);
    },

    toggleSelectedAnimation: function(cid) {
        // console.log('> HexView.toggleSelectedAnimationOff()');
        
        if (! this.animation) {
            this.startAnimation(cid);
        } else {
            this.resetPosition();
            this.stopAnimation();
        }
    },

    startAnimation: function(cid) {
        // console.log('> HexView.startAnimation()', this.collection.selected.cid);

        if (this.model.cid === cid) {
            var amplitude = 10;
            var period = 2000;
            var self = this;

            this.animation = new Konva.Animation(function(frame) {
                self.el.setY(-amplitude * Math.sin(frame.time * 2 * Math.PI / period));
            }, Layers.map);

            this.animation.start();
        }
    },

    stopAnimation: function() {
        // console.log('> HexView.stopAnimation()');

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
        // console.log('> HexView.resetPosition()');
        this.animation.stop();

        var self = this;
        var period = 100;
        var pixelTolerance = 2.5;
        var startingPositionY = this.el.getY();

        this.animation = new Konva.Animation(function(frame) {
            var currentPositionY = self.el.getY();

            if (startingPositionY > 0) {
                self.el.setY(startingPositionY - (frame.time * 2 * Math.PI / period));
            } else {
                self.el.setY(startingPositionY + (frame.time * 2 * Math.PI / period));
            }

            if (currentPositionY < pixelTolerance && currentPositionY > -pixelTolerance) {
                this.stop();
                self.el.setY(0);
            }
        }, Layers.map);

        this.animation.start();

        callback;
    },

    el: function() {
        // console.log('> HexView.el()');

        var dimensions = this.getImageDimensions();
        var pixelCoordinates = this.axialToPixel(this.model.get('q'), this.model.get('r'));
        var terrainBackground = new Image();
        terrainBackground.src = this.model.get('terrain').image;
        var cubeCoordinates = this.axialToCube(this.model.get('q'), this.model.get('r'));

        var axialCoordinatesText = new Konva.Text({
            x: pixelCoordinates.x - 15,
            y: pixelCoordinates.y - 10,
            text: this.model.get('q') + ', ' + this.model.get('r'),
            fontSize: 18,
            fontFamily: 'Arial',
            fill: 'white'
        });

        var cubeCoordinateXText = new Konva.Text({
            x: pixelCoordinates.x + (this.radius / 2),
            y: pixelCoordinates.y - (this.radius / 2),
            text: cubeCoordinates.x,
            fontSize: 18,
            fontFamily: 'Arial',
            fill: 'black'
        });

        var cubeCoordinateYText = new Konva.Text({
            x: pixelCoordinates.x - (this.radius / 2) - 10,
            y: pixelCoordinates.y - (this.radius / 2),
            text: cubeCoordinates.y,
            fontSize: 18,
            fontFamily: 'Arial',
            fill: 'black'
        });

        var cubeCoordinateZText = new Konva.Text({
            x: pixelCoordinates.x - 5,
            y: pixelCoordinates.y + (this.radius / 2),
            text: cubeCoordinates.z,
            fontSize: 18,
            fontFamily: 'Arial',
            fill: 'black'
        });

        var polygon = new Konva.RegularPolygon({
            sides: 6,
            radius: this.radius,
            x: pixelCoordinates.x,
            y: pixelCoordinates.y,
            opacity: 1,
            id: 'polygon'
        });

        var image = new Konva.Image({
            width: dimensions.width,
            height: dimensions.height + 15,
            x: pixelCoordinates.x - (dimensions.width / 2),
            y: pixelCoordinates.y - (dimensions.height / 2),
            image: terrainBackground,
            id: 'image'
        });

        var tile = new Konva.Group();
        tile.add(image);
        if (this.enableCoordinates) {
            tile.add(axialCoordinatesText,
                cubeCoordinateXText,
                cubeCoordinateYText,
                cubeCoordinateZText);
        }
        tile.add(polygon);

        return tile;
    },

    render: function() {
        // console.log('> HexView.render()');

        return this;
    }
});
_.extend(HexView.prototype, CoordinateHelper);

module.exports = HexView;
