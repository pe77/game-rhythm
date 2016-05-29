(function () {
    'use strict';

    var width = navigator.isCocoonJS ? window.innerWidth : 320,
        height = navigator.isCocoonJS ? window.innerHeight : 480,
        game, nanoha;

    game = new Phaser.Game(width, height, Phaser.WEBGL, '', {
        preload: preload,
        create: create,
        update: update
    });

    function preload() {
        game.load.image('bg', 'assets/bg.png');
        game.load.image('nanoha', 'assets/nanoha.png');
    }

    function getRatio(type, w, h) {
        var scaleX = width / w,
            scaleY = height / h,
            result = {
                x: 1,
                y: 1
            };

        switch (type) {
        case 'all':
            result.x = scaleX > scaleY ? scaleY : scaleX;
            result.y = scaleX > scaleY ? scaleY : scaleX;
            break;
        case 'fit':
            result.x = scaleX > scaleY ? scaleX : scaleY;
            result.y = scaleX > scaleY ? scaleX : scaleY;
            break;
        case 'fill':
            result.x = scaleX;
            result.y = scaleY;
            break;
        }

        return result;
    }

    function create() {
        var ratio = getRatio('all', 320, 480);

        if (navigator.isCocoonJS) {
            game.world._container.scale.x = ratio.x;
            game.world._container.scale.y = ratio.y;
            game.world._container.updateTransform();
        } else {
            game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            game.stage.scale.minWidth = 320;
            game.stage.scale.minHeight = 480;
            game.stage.scale.pageAlignHorizontally = true;
            game.stage.scale.setScreenSize(true);
        }

        game.add.sprite(0, 0, 'bg');

        nanoha = game.add.sprite(160, 240, 'nanoha');
        nanoha.anchor.x = 0.5;
        nanoha.anchor.y = 0.5;
    }

    function update() {
        nanoha.angle -= 2;
    }
})();