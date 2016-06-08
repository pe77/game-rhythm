var PkLoading = function () {};

PkLoading.prototype = {

  loadScripts: function () {

    // utils / vendor
    game.load.script('WebFont', 'com/pkframework/vendor/webfontloader.js');
    game.load.script('polyfill',   'com/pkframework/utils/polyfill.js');
    game.load.script('utils',   'com/pkframework/utils/utils.js');

    // game elements
    game.load.script('pkGame', 'com/pkframework/PkGame.js');
    game.load.script('pkElement', 'com/pkframework/element/PkElement.js');
    game.load.script('pkEvent', 'com/pkframework/event/PkEvent.js');
    game.load.script('pkTransition', 'com/pkframework/state/PkTransition.js');
    game.load.script('pkState', 'com/pkframework/state/PkState.js');

    // ui
    game.load.script('pkButton', 'com/pkframework/ui/PkButton.js');
    game.load.script('pkModal', 'com/pkframework/ui/PkModal.js');
  },

  loadSounds: function() {
    
  },

  loadImages: function () {

  },

  loadFonts: function () {

  },

  init: function () {

    this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "game-loading");
    this.logo       = game.make.sprite(game.world.centerX, 200, 'game-logo');
    this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    
    this.logo.anchor.setTo(0.5);
    this.status.anchor.setTo(0.5);

    
  },

  preload: function () {
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    this.load.setPreloadSprite(this.loadingBar);

    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadSounds();
  },

  addGameStates: function () {

  },

  onEndLoad: function () {

  },


  create: function() {
    this.status.setText('Ready!');
    this.addGameStates();
    
    // evento de termino 
    this.onEndLoad();

    setTimeout(function () {
      console.log('Ready');
      if(PkLoading.initState)
      {
        console.log('init state:' + PkLoading.initState);
        game.state.start(PkLoading.initState);
      }
    }, 1000);


  }
};
