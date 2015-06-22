"use strict";

var Backbone = require("backbone");

var Hex = Backbone.Model.extend({
    defaults: {
        stroke: "black",
        x: 0,
        y: 0
    }
});

module.exports = Hex;