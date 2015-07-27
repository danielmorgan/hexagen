'use strict';

var CoordinateHelper = {
    radius: 80,
    directions: [
        { x: 0, y: 1, z: -1 }, // up, left
        { x: 1, y: 0, z: -1 }, // up, right
        { x: -1, y: 1, z: 0 }, // left
        { x: 1, y: -1, z: 0 }, // right
        { x: -1, y: 0, z: 1 }, // down, left
        { x: 0, y: -1, z: 1 } // down, right
    ],
    diagonals: [
        { x: -1, y: 2, z: -1 }, // up, left
        { x: 2, y: -1, z: -1 }, // up, right
        { x: 1, y: 1, z: -2 }, // up
        { x: -1, y: -1, z: 2 }, // down
        { x: -2, y: 1, z: 1 }, // down, left
        { x: 1, y: -2, z: 1 } // down, right
    ],

    getImageDimensions: function() {
        // console.log('> CoordinateHelper.getImageDimensions()');

        var width = this.radius + (this.radius * 3/4);
        var height = (this.radius * 2);

        return { width: width, height: height };
    },

    axialToPixel: function(q, r, centered) {
        // console.log('> CoordinateHelper.axialToPixel()');

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


    /**
     * TODO: implement
     */
    pixelToAxial: function(x, y) {
    },

    axialToCube: function(q, r) {
        // console.log('> CoordinateHelper.axialToCube()');

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
        // console.log('> CoordinateHelper.cubeToAxial()');

        return { q: x, r: z };
    }

}

module.exports = CoordinateHelper;
