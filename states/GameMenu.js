var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Backgroud\nJAVA", {
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

    this.addMenuOption('Novo jogo', function () {
      game.state.start("Main");
    });
    this.addMenuOption('Opcoes', function () {
      game.state.start("Options");
    });
    this.addMenuOption('Credits', function () {
      game.state.start("Credits");
    });

    
  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
