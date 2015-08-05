'use strict';

var _ = require('underscore');
var Konva = require('konva');

var initialScale = 0.5;
var minScale = 0.25;
var maxScale = 1;

var HexMap = new Konva.Layer({
    draggable: true,
    scale: { x: initialScale, y: initialScale }
});

_.extend(HexMap, {

    scrollWheelZoomAnimation: function() {
        if (targetScale > maxScale) { targetScale = maxScale; }
        if (targetScale < minScale) { targetScale = minScale; }
        if (event.deltaY < 0) { zoomDirection = 'in'; }
        if (event.deltaY > 0) { zoomDirection = 'out'; }

        console.log(zoomDirection,initialScale, targetScale);

        var animation = new Konva.Animation(function(frame) {
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

            document.title = frame.frameRate;
        }, self).start();
    },
    scrollWheelZoom: function(event) {
        var self = this,
            initialScale = self.scale().x,
            period = 500,
            zoomDirection,
            continueAnimation;

        var targetScale = initialScale - (event.deltaY / 1000);

        setTimeout(function() {
            scrollWheelZoomAnimation();
        }, 300);
    }
});

module.exports = HexMap;
