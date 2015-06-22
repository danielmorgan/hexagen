"use strict";

var Konva = require("konva");
var Layers = require("./layers.js");

var Stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight
});

Stage.add(Layers.map);