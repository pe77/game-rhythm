// Global Variables
var
  game = new Phaser.Game(800, 480, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer,

  // jogador
  player,
  transition

  // ui


  ;


Main.prototype = {

  preload: function () {
    game.load.image('stars',    'assets/images/stars.jpg');
    game.load.image('loading',  'assets/images/loading.png');
    game.load.image('brand',    'assets/images/logo.png');

    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('loading',  'states/Loading.js');
  },

  create: function () {

    game.state.add('Loading', Loading);
    game.state.start('Loading');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
