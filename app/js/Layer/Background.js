'use strict';

var _ = require('underscore');
var Konva = require('konva');

var Background = new Konva.Layer();

_.extend(Background, {
	move: function(e) {
		this.x(this.x() - (e.evt.movementX / 5));
		this.y(this.y() - (e.evt.movementY / 5));
		this.draw();
	}
});

module.exports = Background;