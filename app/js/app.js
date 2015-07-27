'use strict';

var WorldGenerator = require('./Generator/WorldGenerator.js');

var world = WorldGenerator.newWorld(4);
WorldGenerator.render(world);
