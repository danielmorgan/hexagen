"use strict";

var Backbone = require("backbone");

var Hex = Backbone.Model.extend({
	initialize: function() {
		var width = 160;
		var height = Math.sqrt(3)/2 * width;
		var horiz = 3/4 * width;
		var vert = height;
		var q = this.get("q");
		var r = this.get("r");

		if (q % 2 != 0) {
			var offset = 1/2 * vert;
		} else {
			var offset = 0;
		}

		var x = q;
		var y = r;
		var z = y - (x + (x&1)) / 2;

		this.set("x", x * horiz);
		this.set("y", (z * vert) + offset);

		console.log(this);
	},

    defaults: {
        stroke: "black",
        q: 0,
        r: 0
    }
});

module.exports = Hex;