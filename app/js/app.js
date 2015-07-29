'use strict';

var WorldGenerator = require('./Generator/WorldGenerator.js');

var world = WorldGenerator.newWorld(6);
WorldGenerator.render(world);
