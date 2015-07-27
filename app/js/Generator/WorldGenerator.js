'use strict';

var _ = require('underscore');
var CoordinateHelper = require('../Helper/CoordinateHelper.js');
var Terrain = require('../Model/Terrain.js');
var Hexes = require('../Model/Hexes.js');
var HexGridView = require('../View/HexGridView.js');
var SkyView = require('../View/SkyView.js');
require('../stage.js');

var WorldGenerator = {
    hexArray: [],

    newWorld: function(radius) {
        this.generateRadius(radius);

        return this.hexArray;
    },

    addHexToArray: function(direction, ring) {
        var coordinates = CoordinateHelper.cubeToAxial(direction.x, direction.z);

        this.hexArray.push({
            terrain: this.getRandomTerrain(),
            q: coordinates.q,
            r: coordinates.r
        });
    },

    generateRadius: function(radius) {
        var self = this;

        var outerIterator = -radius;
        while (outerIterator < radius + 1) {
            var x = outerIterator++;
            var innerIterator = -radius;
            while (innerIterator < radius + 1) {
                var y = innerIterator++;
                var z = -x - y;
                if (Math.abs(x) <= radius && 
                    Math.abs(y) <= radius && 
                    Math.abs(z) <= radius) {
                    self.addHexToArray({ x: x, y: y, z: z }, radius);
                }
            }
        }
    },

    getRandomTerrain: function() {
        var count = 0,
            chosenType;

        for (var type in Terrain) {
            if (Math.random() < 1 / ++count) {
               chosenType = type;
            }
        }

        return Terrain[chosenType];
    },

    render: function(hexArray) {
        var hexes = new Hexes(hexArray);
        var hexGridView = new HexGridView(hexes);
        hexGridView.render();

        var skyView = new SkyView();
        skyView.render();
    }

}

module.exports = WorldGenerator;
