'use strict';

var WorldGenerator = require('./Generator/WorldGenerator.js');

var world = WorldGenerator.newWorld(3);
WorldGenerator.render(world);
