var Main = function(game) {};

Main.prototype = Object.create(PkState.prototype);

Main.prototype.name = "Test Screen";

Main.prototype.init = function(){
  
  this._player = new Player(game);

  // game.time.desiredFps = 30
  // game.forceSingleUpdate = true

  this._hitFx       = game.add.audio('hit-fx');


  // valores padrão
  this._proximityDelay = 600; // ms
  this._markTime       = 3000; // ms
  this._musicBPM       = 60;

  this._enemyGroup = [];
  
  // inicia contagem de tempo
  game.time.events.start();
}

// cria um inimigo em um posição randomica, mas longe
Main.prototype.createEnemy = function(hitTime, angle)
{
  // angulo de onde virá (-1 = random)
  angle = angle || -1;

  // inicia inimigo e seta posição default(randomica)
  var enemy  = new Enemy(game, {_hitFx:this._hitFx, _player:this._player, _speed:20});
  enemy.create('enemy-test');
  enemy.setPosition(angle);

  // se o inimigo conseguiu atingir jogador
  enemy._event.add('onEndRun', function(e){
    // console.log('kill sem hitar')
  }, this);

  // quando o inimigo morre
  enemy._event.add('onEnemyKill', function(e){

    // remove do grupo de inimigos ativos
    var tempGroup = [];
    for (var i = 0; i < this._enemyGroup.length; i++)
      if(this._enemyGroup[i]._id != e.enemy._id)
        tempGroup.push(this._enemyGroup[i]);
    //

    this._enemyGroup = tempGroup;
  }, this);

  // registra evento de click no inimigo
  enemy._event.add('onEnemyClick', function(e){
    e.enemy.hit(); // mata o inimigo no hit
    
  }, this);

  // faz o inimigo correr até o jogador em X
  enemy.run(hitTime);
  // enemy.runTo(this._player._element.position, hitTime + this._proximityDelay, hitTime);

  // add no grupo 
  this._enemyGroup.push(enemy);

  return enemy;
  
}


Main.prototype.onEndTransition = function(e)
{
  // cria um botão de voltar
  var bkBtn = new PkButton('btn-back', 'btn-back');
  bkBtn.create(game);
  bkBtn._event.add('onInputUp', function(e){
    this._transition.change('GameMenu');
  }, this);

  // coloca no canto inferior direito
  bkBtn._element.x = game.width - bkBtn._element.width - 10;
  bkBtn._element.y = game.height - bkBtn._element.height - 10;


  // carrega configuração da musica
  var xml = game.cache.getXML('stage'+musicGame.selectedMusic+'-xml');

  this._music = new Music(game);
  this._music.loadXmlData(xml);
  
  this._music._event.add('onPulse', function(e){
    this.pulseMark(e.even, e.pulseTime); // pulso inicial
  }, this);


  game.debug.text('carregando musica... ',50,200);

  // evento de decode da musica
  this._music._event.add('onDecodeComplete', function(e){
    // console.log('finish decode', this._music.getPulsesBetween(8, 14, 1));

    // carrega e espera o efeito de batida
    game.sound.setDecodedCallback([ this._hitFx ], function(){
      
      game.debug.text('musica pronta!',50,230);
      // inicia a musica
      this._music.play();

      // carrega hits do xml da musica

      // custom notes
      var enemiesHit = xml.getElementsByTagName("enemy")
      for (var i = 0; i < enemiesHit.length; i++)
      {
        var type = parseInt(enemiesHit[i].attributes.type.value);
        var time = parseInt(enemiesHit[i].attributes.time.value);
        var angle = parseInt(enemiesHit[i].attributes.angle.value);

        this.makeHit(time, angle);
      };

      // loops
      var enemiesHitLoop = xml.getElementsByTagName("loop");
      
      for (var k = 0; k < enemiesHitLoop.length; k++)
      {
        var from = parseInt(enemiesHitLoop[k].attributes.from.value);
        var to = parseInt(enemiesHitLoop[k].attributes.to.value);
        var times = parseInt(enemiesHitLoop[k].attributes.times.value);
        var angle = parseInt(enemiesHitLoop[k].attributes.angle.value);
        var pulses = this._music.getPulsesBetween(from, to, times);

        for (var i = 0; i < pulses.length; i++)
          this.makeHit(pulses[i], angle)
        //
        //

      };
      
      
    }, this); 

  }, this);


  this._music.loadSong('stage'+musicGame.selectedMusic+'-music');

  // cria(sprite) jogador coloca o jogador no centro
  this._player.create();
  this._player._element.x = game.world.centerX;
  this._player._element.y = game.world.centerY;

  
}


Main.prototype.pulseMark = function(even, pulseTime)
{
  this._player.pulse(even, pulseTime);

  for (var i = 0; i < this._enemyGroup.length; i++) 
    if(this._enemyGroup[i]._element.alive)
      this._enemyGroup[i].pulse(even, pulseTime);
  //

}

Main.prototype.makeHit = function(time, angle)
{
  // angulo de onde virá (-1 = random)
  angle = angle || -1;

  // cria um inimigo a cada 1/2 sec
  game.time.events.add(time - this._markTime, function(){
    // game.time.events.loop(Phaser.Timer.SECOND/2, this.createEnemy, this);
    
    this.createEnemy(this._markTime, angle)
  }, this);
}

// sai da tela
Main.prototype.shutdown = function()
{
  // para os eventos de tempo
  game.time.events.stop()

  // para e remove a musica
  this._music.destroy();

  // jogador
  this._player.destroy();

  // remove inimigos restantes
  for (var i = 0; i < this._enemyGroup.length; i++) {
    this._enemyGroup[i].destroy();
  };

}