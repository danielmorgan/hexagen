'use strict';

var _ = require('underscore');
var Konva = require('konva');

var Background = new Konva.FastLayer();

_.extend(Background, {
	move: function(event) {
		Background.x(Background.x() - (event.evt.movementX / 5));
		Background.y(Background.y() - (event.evt.movementY / 5));
		Background.draw();
	}
});

module.exports = Background;
