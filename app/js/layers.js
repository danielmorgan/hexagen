'use strict';

var Backbone = require('backbone');
var Konva = require('konva');
var Map = require('./Layer/Map.js');
var Background = require('./Layer/Background.js');

Map.on('dragmove', Background.move);

new Konva.Animation(null, Background).start();
new Konva.Animation(null, Map).start();

var Layers = {
    background: Background,
    map: Map
};

module.exports = Layers;
