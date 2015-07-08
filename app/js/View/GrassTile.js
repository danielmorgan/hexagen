"use strict";

var Backbone = require("backbone");


var GrassTile = Backbone.View.extend({

    el: function() {
        var image = new Image();
        image.src = "img/paper.png";
        
        return image;
    }

});

module.exports = GrassTile;
