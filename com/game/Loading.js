var Loading = function () {};

Loading.prototype = Object.create(PkLoading.prototype);

// carrega scripts
Loading.prototype.loadScripts = function()
{
  // superclass
  PkLoading.prototype.loadScripts.call(this);

  // controlador do jogo
  game.load.script('musicGame', 'com/game/MusicGame.js');

  // states
  game.load.script('main', 'com/game/states/Main.js');
  game.load.script('gamemenu','com/game/states/GameMenu.js');

  PkLoading.initState = 'GameMenu';


  // elementos do jogo
  game.load.script('HealthBar', 'com/game/ui/HealthBar.js');
  game.load.script('Player', 'com/game/elements/Player.js');
  game.load.script('Enemy', 'com/game/elements/Enemy.js');
  game.load.script('Music', 'com/game/elements/Music.js');


  // music scripts
  game.load.xml('stage1-xml', 'assets/sounds/stage1.xml');
  game.load.xml('stage2-xml', 'assets/sounds/stage2.xml');
  game.load.xml('stage3-xml', 'assets/sounds/stage3.xml');
  game.load.xml('stage4-xml', 'assets/sounds/stage4.xml');
};


// carrega musicas e sons
Loading.prototype.loadSounds = function()
{
	// musicas
	game.load.audio('stage1-music', 'assets/sounds/stage1.mp3');
  game.load.audio('stage2-music', 'assets/sounds/stage2.mp3');
  game.load.audio('stage3-music', 'assets/sounds/stage3.mp3');
  game.load.audio('stage4-music', 'assets/sounds/stage4.mp3');

  game.load.audio('hit-fx', 'assets/sounds/hit.mp3');
};


Loading.prototype.loadFonts = function()
{
	/*
	WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
    */
}

// carrega imagens
Loading.prototype.loadImages = function()
{
    game.load.image('player-test', 'assets/images/states/test/player.png');
    game.load.image('enemy-test', 'assets/images/states/test/enemy.png');

    // sprites
    game.load.spritesheet('player-sprite-idle', 'assets/images/player/player-sprite-idle.png', 25, 28, 2);
    game.load.spritesheet('hearth-sprite-beat', 'assets/images/player/hearth-sprite-beat.png', 28, 24, 2);
    
    
    // btns
    game.load.image('btn-m1', 'assets/images/buttons/m1.png');
    game.load.image('btn-m2', 'assets/images/buttons/m2.png');
    game.load.image('btn-m3', 'assets/images/buttons/m3.png');
    game.load.image('btn-m4', 'assets/images/buttons/m4.png');
    game.load.image('btn-back', 'assets/images/buttons/back.png');
};

// add states
Loading.prototype.addGameStates = function()
{
	game.state.add("GameMenu",GameMenu);
    game.state.add("Main", Main);
};

Loading.prototype.onEndLoad = function()
{
	musicGame = new MusicGame();
}
