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
    scrollWheelZoom: function(event) {
        var self = this;
        var initialScale = self.scale().x;
        var targetScale = initialScale + (event.deltaY / 1000);
  
        console.log(initialScale, targetScale);

        var animation = new Konva.Animation(function(frame) {
            if (event.deltaY < 0) {
                var frameScale = initialScale - ((frame.time * 2 * Math.PI / 500) * (event.deltaY / 1000));
            } else {
                var frameScale = initialScale + ((frame.time * 2 * Math.PI / 500) * (event.deltaY / 1000));
            }

            self.scale({
                x: frameScale,
                y: frameScale
            });

            if (self.scale().x >= targetScale || self.scale().x <= targetScale) {
                this.stop();
            }

            document.title = frame.frameRate;
        }, self).start();
    }
});

module.exports = HexMap;
