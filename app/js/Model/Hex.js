"use strict";

var Backbone = require("backbone");

var Hex = Backbone.Model.extend({
    defaults: {
        q: 0,
        r: 0
    }
});

module.exports = Hex;
