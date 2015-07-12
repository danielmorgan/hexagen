'use strict';

var Backbone = require('backbone');
var Konva = require('konva');

var background = new Konva.Layer();
var map = new Konva.Layer({ draggable: true });

function move(e) {
    background.x(background.x() - (e.evt.movementX / 5));
    background.y(background.y() - (e.evt.movementY / 5));
    background.draw();
}

map.on('dragmove', move);

new Konva.Animation(null, background).start();
new Konva.Animation(null, map).start();


var Layers = {
    background: background,
    map: map
};

module.exports = Layers;
