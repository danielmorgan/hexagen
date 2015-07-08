"use strict";

var CoordinateHelper = {
    radius: 80,

    axialToPixel: function(q, r, centered) {
        console.log("CoordinateHelper.axialToPixel()");

        centered = typeof centered !== 'undefined' ? centered : true;

        var offset = 0;
        if (q % 2 != 0) {
            offset = 0.5;
        }

        var x = this.radius * Math.sqrt(3) * (q + r/2) + offset;
        var y = this.radius * 3/2 * r;

        if (centered) {
            x = x + (window.innerWidth / 2);
            y = y + (window.innerHeight / 2);
        }

        return { x: x, y: y };
    },

    // TODO: implement
    pixelToAxial: function(x, y) {
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
    
    cubeToAxial: function(x, z) {
        return { q: x, r: z };
    }

}

module.exports = CoordinateHelper;
