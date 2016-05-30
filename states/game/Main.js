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
  this._musicBPM       = 120; // ms


}

// cria um inimigo em um posição randomica, mas longe
Main.prototype.createEnemy = function(runTime, angle)
{
  // angulo de onde virá (-1 = random)
  angle = angle || -1;

  // inicia inimigo e seta posição default(randomica)
  var enemy  = new Enemy(game, {_hitFx:this._hitFx});
  enemy.create('enemy-test');
  enemy.setPosition(null, angle);

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
  enemy.runTo(this._player._element.position, runTime + this._proximityDelay, runTime, angle);

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

    this.pulseLoop()

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

    this.makeHit(56600, 90)
    this.makeHit(56800, 90)
    this.makeHit(57000, 90)
    this.makeHit(57200, 90)
    this.makeHit(57400, 90)
    
    this.makeHit(58600, 45)
    this.makeHit(58800, 45)
    this.makeHit(59000, 45)
    this.makeHit(59200, 45)
    this.makeHit(59400, 45)

    this.makeHit(60600, 90)
    this.makeHit(60800, 90)
    this.makeHit(61000, 90)
    this.makeHit(61200, 90)
    this.makeHit(61400, 90)
    this.makeHit(61600, 90)


    this.makeHit(62600, 300)
    this.makeHit(62800, 300)
    this.makeHit(63000, 300)
    this.makeHit(63200, 300)
    this.makeHit(63400, 300)
    this.makeHit(63600, 300)

    this.makeHit(64700, 200)
    this.makeHit(64900, 200)
    this.makeHit(65100, 200)
    this.makeHit(65300, 200)
    this.makeHit(65600, 200)
    this.makeHit(65900, 300)

    this.makeHit(66700, 45)
    this.makeHit(66900, 70)
    this.makeHit(67100, 45)
    this.makeHit(67300, 70)
    this.makeHit(67500, 45)

    this.makeHit(68700, 90)
    this.makeHit(68900, 90)
    this.makeHit(69100, 90)
    this.makeHit(69300, 90)
    this.makeHit(69500, 90)
    this.makeHit(69700, 90)

    this.makeHit(70700, 300)
    this.makeHit(70900, 300)
    this.makeHit(71100, 300)
    this.makeHit(71300, 300)
    this.makeHit(71500, 300)
    this.makeHit(71700, 300)


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


Main.prototype.pulseMark = function(even)
{
  even = even === true ? true : false;

  if(even)
  {
    this._player._element.scale.x = 0.9;
    this._player._element.scale.y = 1.1;
  }
  else
  {
    this._player._element.scale.x = 1.1;
    this._player._element.scale.y = 0.9;
  }

  // desenha outro circulo a area de ação
  circle = new Phaser.Circle(0, 0, 140);

  var graphics = game.add.graphics(0, 0);
  graphics.lineStyle(1, 0x00ff00, 1);
  graphics.drawCircle(circle.x, circle.y, circle.diameter);


  graphics.x = this._player._element.x
  graphics.y = this._player._element.y


  var markPulser      = game.add.tween(graphics);
  markPulser.to({
    width:graphics.width + 100,
    height:graphics.height + 100,
    alpha:0
  }, 100, null, true);

  this._actionArea = circle;
}

// pulsa a cada bpm/2 pra marcar tempo
Main.prototype.pulseLoop = function()
{
  // calcula tempo do pulso
  var pulseTime = (Phaser.Timer.SECOND * 60) / this._musicBPM;


  var even = true;

  this.pulseMark(even); // pulso inicial

  // loop
  game.time.events.loop(pulseTime, function(){
    this.pulseMark(even = !even);
  }, this)
}

Main.prototype.makeHit = function(time, angle)
{
  // angulo de onde virá (-1 = random)
  angle = angle || -1;

  // cria um inimigo a cada 1/2 sec
  game.time.events.add(time - this._enemySpeed, function(){
    // game.time.events.loop(Phaser.Timer.SECOND/2, this.createEnemy, this);

    this.createEnemy(this._enemySpeed, angle)
  }, this);
}