var Main = function(game) {};

Main.prototype = Object.create(Stage.prototype);
Main.prototype.constructor = Main;

Main.prototype.id = 2;
Main.prototype.name = "Test Screen";

Main.prototype.init = function(){
  this._player = new Player(game);

  this._stage1Sound = game.add.audio('stage1-music');
  this._hitFx       = game.add.audio('hit-fx');

  this._proximityDelay = 700; // ms
  this._enemySpeed     = 3000; // ms
}

// cria um inimigo em um posição randomica, mas longe
Main.prototype.createEnemy = function(runTime)
{
  // inicia inimigo e seta posição default(randomica)
  var enemy  = new Enemy(game, {_hitFx:this._hitFx});
  enemy.create('enemy-test');
  enemy.setPosition();

  // registra evento de final de corrida
  enemy._event.add('onEndRun', function(e){
    e.enemy.kill();
  }, {}, this);

  // registra evento de click no inimigo
  enemy._event.add('onEnemyClick', function(e){

    var distance = game.physics.arcade.distanceBetween(e.enemy._element.position, this._player._element.position)

    var actionAreaSize = this._player._actionArea.diameter / 2;

    if(distance < actionAreaSize)
      e.enemy.hit(distance < ((actionAreaSize / 3) * 2)); // mata o inimigo no hit
    //
    
    
  }, {}, this);

  // faz o inimigo correr até o jogador
  enemy.runTo(this._player._element.position, runTime + this._proximityDelay);

  return enemy;
  
}

Main.prototype.onEndTransition = function(e)
{
  console.log('Entrou no:', this.name);

  // cria(sprite) jogador coloca o jogador no centro
  this._player.create('player-test');
  this._player._element.x = game.world.centerX;
  this._player._element.y = game.world.centerY;
  this._player._element.anchor.set(0.5);


  // carrega e espera o som terminar o decode
  game.sound.setDecodedCallback([ this._stage1Sound, this._hitFx ], function(){
    
    // inicia a musica
    this._stage1Sound.play();

    // Phaser.Timer.SECOND

    // hit simples
    for (var i = 8; i < 14; i++) {
      this.makeHit(Phaser.Timer.SECOND * i)
    };

    this.makeHit(23800)

    // hit simples
    for (var i = 16; i < 32; i++) {
      this.makeHit(Phaser.Timer.SECOND * i)
    };

    // hit dobrado
    for (var i = 32; i < 40; i++) {
      this.makeHit(Phaser.Timer.SECOND * i)
      this.makeHit((Phaser.Timer.SECOND * i) + (Phaser.Timer.SECOND / 2))
    };

    // hit simples
    for (var i = 40; i < 54; i++) {
      this.makeHit(Phaser.Timer.SECOND * i)
    };

    this.makeHit(56600)
    this.makeHit(56800)
    this.makeHit(57000)
    this.makeHit(57200)
    this.makeHit(57400)
    
    this.makeHit(58600)
    this.makeHit(58800)
    this.makeHit(59000)
    this.makeHit(59200)
    this.makeHit(59400)

    this.makeHit(60600)
    this.makeHit(60800)
    this.makeHit(61000)
    this.makeHit(61200)
    this.makeHit(61400)
    this.makeHit(61600)


    this.makeHit(62600)
    this.makeHit(62800)
    this.makeHit(63000)
    this.makeHit(63200)
    this.makeHit(63400)
    this.makeHit(63600)

    this.makeHit(64700)
    this.makeHit(64900)
    this.makeHit(65100)
    this.makeHit(65300)
    this.makeHit(65600)
    this.makeHit(65900)

    this.makeHit(66700)
    this.makeHit(66900)
    this.makeHit(67100)
    this.makeHit(67300)
    this.makeHit(67500)

    this.makeHit(68700)
    this.makeHit(68900)
    this.makeHit(69100)
    this.makeHit(69300)
    this.makeHit(69500)
    this.makeHit(69700)

    this.makeHit(70700)
    this.makeHit(70900)
    this.makeHit(71100)
    this.makeHit(71300)
    this.makeHit(71500)
    this.makeHit(71700)


    // hit simples
    for (var i = 73; i < 78; i++) {
      this.makeHit(Phaser.Timer.SECOND * i)
    };

    // hit dobrado
    for (var i = 81; i < 88; i++) {
      this.makeHit(Phaser.Timer.SECOND * i)
      this.makeHit((Phaser.Timer.SECOND * i) + (Phaser.Timer.SECOND / 2))
    };
    
  }, this);

  
  
}


Main.prototype.makeHit = function(time)
{
  // 8000

  // 3000

  // cria um inimigo a cada 1/2 sec
  game.time.events.add(time - this._enemySpeed, function(){
    // game.time.events.loop(Phaser.Timer.SECOND/2, this.createEnemy, this);

    this.createEnemy(this._enemySpeed)
  }, this);
}