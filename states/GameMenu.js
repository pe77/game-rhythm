var GameMenu = function() {};

GameMenu.prototype = {

  menuConfig: {
    startY: 180,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Jogo de musica\n(sem nome)", {
      font: 'bold 60pt Arial',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;

  },

  create: function () {

    console.log('GameMenu :: create');
    if (music.name !== "dangerous" && playMusic) {
      console.log('music IF');
      music.stop();
      music = game.add.audio('dangerous');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.existing(this.titleText);

    this.addMenuOption('Musica 1', function () {
      gameController.selectedMusic = 1;
      game.state.start("Main");
    });

    this.addMenuOption('Musica 2', function () {
      gameController.selectedMusic = 2;
      game.state.start("Main");
    });

    this.addMenuOption('Musica 3', function () {
      gameController.selectedMusic = 3;
      game.state.start("Main");
    });


    
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
