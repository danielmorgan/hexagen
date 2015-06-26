"use strict";

var Backbone = require("backbone");

var Hex = Backbone.Model.extend({
	initialize: function() {
        var centerX = window.innerWidth / 2;
        var centerY = window.innerHeight / 2;

        var radius = 80;
        var width = radius * (Math.sqrt(3) / 2);
        var height = radius * 2;

        var horizontal = width;
        var vertical = height * (3/4);

        var q = this.get("q");
        var r = this.get("r");

        var offset = 0;
        if (r % 2 != 0) {
            offset = horizontal / 2;
        }

        var x = q;
        var y = r;

        console.log('y:', y);

        var pixelX = centerX + (x * horizontal) + offset;
        var pixelY = centerY + (y * vertical);

		this.set("x", pixelX);
		this.set("y", pixelY);
	},

    defaults: {
        stroke: "black",
        q: 0,
        r: 0
    }
});

module.exports = Hex;
