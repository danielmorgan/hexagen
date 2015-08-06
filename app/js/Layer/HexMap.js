'use strict';

var _ = require('underscore');
var Konva = require('konva');

var initialScale = 0.5;
var minScale = 0.25;
var maxScale = 1;
var previousTime = new Date().getTime();

var HexMap = new Konva.Layer({
    draggable: true,
    scale: { x: initialScale, y: initialScale }
});

_.extend(HexMap, {
    scrollWheelZoom: function(event) {
        var self = this,
            initialScale = self.scale().x,
            zoomDirection;

        if (event.deltaY < 0) { zoomDirection = 'in'; }
        if (event.deltaY > 0) { zoomDirection = 'out'; }

        var targetScale = initialScale - (event.deltaY / 1000);
        var currentTime = new Date().getTime();
        var timeDifference = currentTime - previousTime;

        if (timeDifference > 200) {
            console.log("scrolling", zoomDirection);
            self.scrollWheelZoomAnimation(initialScale, targetScale, zoomDirection);
        }

        previousTime = currentTime;
    },

    scrollWheelZoomAnimation: function(initialScale, targetScale, zoomDirection) {
        var self = this,
            period = 500,
            continueAnimation = true;

        if (targetScale > maxScale) { targetScale = maxScale; }
        if (targetScale < minScale) { targetScale = minScale; }

        new Konva.Animation(function(frame) {
            if (zoomDirection == 'in') {
                var frameScale = initialScale + ((frame.time * 2 * Math.PI / period));
            }
            if (zoomDirection == 'out') {
                var frameScale = initialScale - ((frame.time * 2 * Math.PI / period));
            }
            if (frameScale > maxScale) {
                frameScale = maxScale;
                continueAnimation = false;
            }
            if (frameScale < minScale) {
                frameScale = minScale;
                continueAnimation = false;
            }

            if (continueAnimation) {
                self.scale({
                    x: frameScale,
                    y: frameScale
                });
            } else {
                this.stop();
            }

            console.log(frameScale);
            document.title = frame.frameRate;
        }, self).start();
    }
});

module.exports = HexMap;
