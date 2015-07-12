'use strict';

var Konva = require('konva');
var Layers = require('./layers.js');

var Stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

for (var name in Layers) {
    var layer = Layers[name];
    Stage.add(layer);
}
