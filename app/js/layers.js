'use strict';

var Backbone = require('backbone');
var Konva = require('konva');
var HexMap = require('./Layer/HexMap.js');
var Background = require('./Layer/Background.js');

HexMap.on('dragmove', Background.move);
document.addEventListener('mousewheel', function(event) {
    HexMap.scrollWheelZoom(event);
});

new Konva.Animation(null, Background).start();
new Konva.Animation(null, HexMap).start();

var Layers = {
    background: Background,
    map: HexMap
};

module.exports = Layers;
