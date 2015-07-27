'use strict';

var _ = require('underscore');
var CoordinateHelper = require('../Helper/CoordinateHelper.js');
var Terrain = require('../Model/Terrain.js');
var Hexes = require('../Model/Hexes.js');
var HexGridView = require('../View/HexGridView.js');
var SkyView = require('../View/SkyView.js');
require('../stage.js');

var WorldGenerator = {

    newWorld: function(radius) {
        var hexArray = [];

        // generate center hex
        hexArray.push({
            terrain: this.getRandomTerrain(),
            q: 0,
            r: 0
        });

        // generate surrounding rings
        for (var i = 1; i < radius; i++) {
            _.each(CoordinateHelper.axialDirections, function(direction, index) {
                hexArray.push({
                    terrain: WorldGenerator.getRandomTerrain(),
                    q: direction.q * i,
                    r: direction.r * i
                });
            });
        }

        return hexArray;
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
