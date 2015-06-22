"use strict";

var Backbone = require("backbone");
var Hex = require("./Hex.js");

var HexCollection = Backbone.Collection.extend({ model: Hex });

module.exports = HexCollection;