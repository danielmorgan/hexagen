'use strict';

var Backbone = require('backbone');
var Konva = require('konva');
require('backbone.konvaview');
var Layers = require('../layers.js');
var HexView = require('../View/HexView.js');

var SkyView = Backbone.KonvaView.extend({
    initialize: function() {
        this.addToBackground();
        this.render();
    },

    el: function() {
        var graphic = new Image();
        graphic.src = 'img/background.jpg';

        var backgroundImage = new Konva.Image({
            width: window.innerWidth * 2,
            height: window.innerHeight * 2,
            x: -window.innerWidth / 2,
            y: -window.innerHeight / 2,
            image: graphic
        });

        return backgroundImage;
    },

    addToBackground: function() {
        Layers.background.add(this.el);
    },

    render: function() {
        Layers.background.draw();
    }
});

module.exports = SkyView;
