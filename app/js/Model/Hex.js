"use strict";

var Backbone = require("backbone");

var Hex = Backbone.Model.extend({
    radius: 80,

	initialize: function() {
        var center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };

        var height = this.radius * 2;
        var vert = height * 3/4
        var width = Math.sqrt(3)/2 * height;

        var q = this.get("q");
        var r = this.get("r");

        var offset = 0;
        if (q % 2 != 0) {
            var offset = 0.5;
        }

        var pixelCoordinates = this.axialToPixel(q, r);

		this.set("x", center.x + pixelCoordinates.x + offset);
		this.set("y", center.y + pixelCoordinates.y);
	},

    cubeToAxial: function(x, z) {
        return { q: x, r: z };
    },

    axialToCube: function(q, r) {
        var x = q;
        var z = r;
        var y = -x-z;

        if (x + y + z === 0) {
            return { x: x, y: y, z: z };
        } else {
            console.error('Cube coordinates do not equal 0!');
            return { x: 0, y: 0, z: 0 };
        }
    },

    axialToPixel: function(q, r) {
        var x = this.radius * Math.sqrt(3) * (q + r/2);
        var y = this.radius * 3/2 * r;

        return { x: x, y: y };
    },

    defaults: {
        stroke: "black",
        q: 0,
        r: 0
    }
});

module.exports = Hex;
