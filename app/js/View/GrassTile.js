"use strict";

var Backbone = require("backbone");


var GrassTile = Backbone.View.extend({

    el: function() {
        var image = new Image();
        var images = ["img/paper.png", "img/paper.png", "img/grass.png"];
        image.src = images[Math.floor(Math.random() * images.length)];
        return image;
    }

});

module.exports = GrassTile;
