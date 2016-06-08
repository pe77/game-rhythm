// Global Variables
var
  game = new Phaser.Game(800, 480, Phaser.AUTO, 'game'),
  Main = function () {},

  player
  // ui


  ;


Main.prototype = {

  preload: function () {
    // loading, logo
    game.load.image('game-loading',  'assets/images/loading.png');
    game.load.image('game-logo',    'assets/images/logo.png');

    game.load.script('pk-loading',  'com/pkframework/PkLoading.js');
    game.load.script('loading',  'com/game/Loading.js');
  },

  create: function () {
    
    game.state.add('loading', Loading);
    game.state.start('loading');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
