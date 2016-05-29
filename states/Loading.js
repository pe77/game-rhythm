var Loading = function () {};

Loading.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');


    

    // game elements
    game.load.script('gameConst', 'objects/Game.js');
    game.load.script('GameElement', 'objects/GameElement.js');
    game.load.script('transition', 'objects/Transition.js');
    game.load.script('cevent', 'objects/Event.js');
    game.load.script('stage', 'objects/Stage.js');

    game.load.script('player', 'objects/Player.js');
    game.load.script('Enemy', 'objects/Enemy.js');


    // states
    game.load.script('main', 'states/game/Main.js');
    /*
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('credits', 'states/Credits.js');
    game.load.script('options', 'states/Options.js');

    /*
    game.load.script('food', 'states/game/Food/Bar.js');
    game.load.script('health', 'states/game/Health/Hospital.js');
    game.load.script('money', 'states/game/Money/Traffic.js');


    // game elements
    game.load.script('player', 'objects/Player.js');
    game.load.script('gameElement', 'objects/Game.js');
    game.load.script('action', 'objects/Actions.js');
    game.load.script('transition', 'objects/Transition.js');
    game.load.script('statusBar', 'objects/ui/StatusBar.js');
    game.load.script('portrait', 'objects/ui/Portrait.js');
    game.load.script('button', 'objects/ui/Button.js');
    game.load.script('actionBonus', 'objects/ui/ActionBonus.js');
    game.load.script('resourceIcon', 'objects/ui/ResourceIcon.js');
    game.load.script('modal', 'objects/Modal.js');
    */
  },

  loadBgm: function () {

    game.load.audio('stage1-music', 'assets/sounds/stage1.mp3');
    game.load.audio('hit-fx', 'assets/sounds/hit.mp3');
    // thanks Kevin Macleod at http://incompetech.com/
    // game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
    // game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
  },
  // varios freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
    

    game.load.image('player-test', 'assets/images/states/test/player.png');
    game.load.image('enemy-test', 'assets/images/states/test/enemy.png');
    
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    utils.centerGameObjects([this.logo, this.status]);

    
  },

  preload: function () {
    game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();
  },

  addGameStates: function () {

    /*
    game.state.add("GameMenu",GameMenu);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
    game.state.add("Options",Options);
    */
    
    game.state.add("Main", Main);
  },

  addGameMusic: function () {

    music = game.add.audio('dangerous');
    music.loop = true;
    // music.play();
  },

  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    // cria jogo
    gameController = new Game(player);

    // cria transicao
    transition = new Transition();
    transition.init(game);

    setTimeout(function () {
      game.state.start("Main");
    }, 1000);
  }
};
