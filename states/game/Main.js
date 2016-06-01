var Main = function(game) {};

Main.prototype = Object.create(Stage.prototype);
Main.prototype.constructor = Main;

Main.prototype.id = 2;
Main.prototype.name = "Test Screen";

Main.prototype.init = function(){
  this._player = new Player(game);

  this._stage1Sound = game.add.audio('stage1-music');
  this._hitFx       = game.add.audio('hit-fx');

  // valores padrão
  this._proximityDelay = 600; // ms
  this._enemySpeed     = 3000; // ms
  this._musicBPM       = 60;

  this._enemyGroup = [];
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

  // se o inimigo conseguiu atingir jogador
  enemy._event.add('onEndRun', function(e){
    console.log('kill sem hitar')
  }, {}, this);

  // quando o inimigo morre
  enemy._event.add('onEnemyKill', function(e){

    // remove do grupo de inimigos ativos
    var tempGroup = [];
    for (var i = 0; i < this._enemyGroup.length; i++)
      if(this._enemyGroup[i]._id != e.enemy._id)
        tempGroup.push(this._enemyGroup[i]);
    //

    this._enemyGroup = tempGroup;
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

  // add no grupo 
  this._enemyGroup.push(enemy);

  return enemy;
  
}


Main.prototype.onEndTransition = function(e)
{
  console.log('Entrou no:', this.name);

  // carrega configuração da musica
  var xml = game.cache.getXML('stage1-xml');

  this._music = new Music(game);
  this._music.loadXmlData(xml);
  this._music.loadSong('stage1-music');
  return;


  this._enemySpeed      = parseInt(xml.getElementsByTagName("music")[0].attributes.speed.value);
  this._musicBPM        = parseInt(xml.getElementsByTagName("music")[0].attributes.bpm.value);
  this._proximityDelay  = parseInt(xml.getElementsByTagName("music")[0].attributes.proximityDelay.value);

  // cria(sprite) jogador coloca o jogador no centro
  this._player.create('player-test');
  this._player._element.x = game.world.centerX;
  this._player._element.y = game.world.centerY;
  this._player._element.anchor.set(0.5);

  // carrega e espera o som terminar o decode
  game.sound.setDecodedCallback([ this._stage1Sound, this._hitFx ], function(){
    
    // inicia a musica
    this._stage1Sound.play();

    this.pulseLoop();

    // carrega hits do xml da musica

    // custom notes
    var enemiesHit = xml.getElementsByTagName("enemy")
    for (var i = 0; i < enemiesHit.length; i++) {
      var type = parseInt(enemiesHit[i].attributes.type.value);
      var time = parseInt(enemiesHit[i].attributes.time.value);
      var angle = parseInt(enemiesHit[i].attributes.angle.value);

      this.makeHit(time, angle);
    };

    // loops
    var enemiesHitLoop = xml.getElementsByTagName("loop");
    
    for (var k = 0; k < enemiesHitLoop.length; k++) {
      var from = parseInt(enemiesHitLoop[k].attributes.from.value);
      var to = parseInt(enemiesHitLoop[k].attributes.to.value);
      var times = parseInt(enemiesHitLoop[k].attributes.times.value);
      var angle = parseInt(enemiesHitLoop[k].attributes.angle.value);

      console.log(to, from)

      for (var i = from; i <= to; i++)
      {
        var bpmTime = ((this._musicBPM * 1000) / 60) * i;

        for (var j = 1; j < times; j++)
        {
          this.makeHit(bpmTime + ((((this._musicBPM * 1000) / 60)) / 2), angle)
        };

        this.makeHit(bpmTime, angle)
        
      };

    };
    
    
  }, this); 
}


Main.prototype.pulseMark = function(even, pulseTime)
{
  this._player.pulse(even, pulseTime);

  for (var i = 0; i < this._enemyGroup.length; i++) 
    if(this._enemyGroup[i]._element.alive)
      this._enemyGroup[i].pulse(even, pulseTime);
  //

}

// pulsa de acordo com o bpm
Main.prototype.pulseLoop = function()
{
  // calcula tempo do pulso
  var pulseTime = (Phaser.Timer.SECOND * 60) / this._musicBPM;


  var even = true;

  this.pulseMark(even, pulseTime); // pulso inicial

  // loop
  game.time.events.loop(pulseTime, function(){
    this.pulseMark(even = !even, pulseTime);
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