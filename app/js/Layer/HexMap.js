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
        this.scale({
            x: this.scale().x - (event.deltaY / 5000),
            y: this.scale().y - (event.deltaY / 5000)
        });

        if (this.scale().x < minScale) {
            this.scale({ x: minScale, y: minScale });
        }

        if (this.scale().x > maxScale) {
            this.scale({ x: maxScale, y: maxScale });
        }
    }
});

module.exports = HexMap;
