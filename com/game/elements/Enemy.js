var Enemy = function(game, attrs)
{
  // inicia gerenciador de eventos
  this._event = new PkEvent('enemy-event', this);

  this._popDistance   = 500;
  this._markClickArea = 200;
  this._speed         = 1;
  this._delay         = 200;

  // inicia objeto
  this.init(game, attrs);
}

Enemy.prototype = Object.create(PkElement.prototype);

// sobrescreve o metodo que cria o elemento
Enemy.prototype.create = function(sprite)
{
  // chama a super classe
  PkElement.prototype.create.call(this, sprite);

  // add o click
  this._element.setAll('inputEnabled', true)

  // add o evento de click
  this._element.callAll('events.onInputDown.add', 'events.onInputDown', function(){
    this._event.dispatch('onEnemyClick', {enemy:this});
  }, this);

  this._game.world.sendToBack(this._element);
}

Enemy.prototype.setPosition = function(angle)
{
  // angulo de onde virá (-1 = random)
  this._angle = angle || -1;

  // -1 = random
  if(this._angle == -1)
    this._angle = this._game.rnd.integerInRange(0, 360);
  //

  // calcula um raio para calcular a distancia onde vai aparecer
  circle = new Phaser.Circle(this._game.world.centerX, this._game.world.centerY, this._popDistance);
  var pos   = circle.circumferencePoint(this._angle, true);

  this._element.position = pos;

  this._element.setAll('anchor.x', 0.5)
  this._element.setAll('anchor.y', 0.5)

  return this._element.position;

}

// faz o inimigo correr em um tempo X
Enemy.prototype.run = function(hitTime)
{
  this._enemyRunTween  = this.addTween(this._element);

  var markTime = hitTime;
  var playerPosition = this._player._element.position;

  // calcula posição do click
  this._clickPosition = this._player._actionArea.circumferencePoint(this._angle, true);

  var toMarkTime = hitTime / this._speed;

  var distanceDiff     = this._popDistance - this._player._hitRange; // distancia entre o ponto de nascimento até a marca | 500-140 = 360
  markTime = (toMarkTime * this._popDistance) / distanceDiff;


  /*
  3000 = hittime 
  500  = this._popDistance
  140  = player.range
  360  = diff

  360 = 3000
  500 = x

  x = (3000 * 500) / 360
  x = 
  */

  // HITMARK
  // desenha a marcação do hit
  this._timeHitMark = this._game.add.graphics();
  this._timeHitMark.lineStyle(0);
  this._timeHitMark.beginFill(0x00ffdd, 0.5);
  this._timeHitMark.drawCircle(0, 0, this._markClickArea);
  this._timeHitMark.endFill();

  /*
  circle = new Phaser.Circle(this._game.world.centerX, this._game.world.centerY, this._markClickArea);
  this._timeHitMark = this._game.add.graphics(this._game.world.centerX, this._game.world.centerY);
  this._timeHitMark.lineStyle(2, 0x00ffdd, 1);
  this._timeHitMark.drawCircle(0, 0, circle.diameter);
  */

  this._timeHitMark.position = this._clickPosition;//this._element.position;

  // alpha de entrada
  this._markAlphaTwenn      = this.addTween(this._timeHitMark);
  this._timeHitMark.alpha = 0;
  
  this._markAlphaTwenn.to({
    alpha:0.3
  }, hitTime, null, true);

  
  this._markCloseTwenn      = this.addTween(this._timeHitMark);
  this._markCloseTwenn.to({
    width:this._element.width,
    height:this._element.height
  }, hitTime + this._delay, null, true);

  this._markCloseTwenn.onComplete.add(function(mark){
    mark.kill();
  }, this);


  // INIMIGO
  // alpha de entrada
  this._enemyAlphaTween      = this.addTween(this._element);
  this._element.alpha = 0;
  this._enemyAlphaTween.to({
    alpha:1
  }, 400, null, true, (hitTime - toMarkTime) + this._delay);

  this._enemyRunTween.to({
    x:playerPosition.x,
    y:playerPosition.y
  }, markTime, null, true, (hitTime - toMarkTime) + this._delay);

  this._enemyRunTween.onComplete.add(function(enemy){

    // se ainda estiver vivo
    if(enemy.alive)
    {
      // remove o hit e inimigo
      this.destroy();
      this._event.dispatch('onEndRun', {enemy:enemy});
    }
    
  }, this);
}


Enemy.prototype.hit = function()
{
  var distanceToClick  = this._game.physics.arcade.distanceBetween(this._element.position, this._clickPosition);

  var hitText = "lixo";

  if(distanceToClick < 11)
    hitText = "meh"
  //

  if(distanceToClick < 7)
    hitText = "OK"
  //

  if(distanceToClick < 5)
    hitText = "good"
  //

  if(distanceToClick < 3)
    hitText = "Perfect!"
  //



  // anima text feedback
  var style = { font: "12px Arial", fill: "#FFFFFF", align: "center" };
  this._text = this._game.add.text(this._element.x, this._element.y, hitText, style);
  this._text.anchor.set(0.5);
  this._text.cacheAsBitmap = true;

  var fadeOut = this._game.add.tween(this._text);

  fadeOut.to({
    y:this._text.y-200,
    alpha:0
  }, 600, null, true);

  fadeOut.onComplete.add(function(text){
    text.destroy();
  }, this);

  // som de morte
  this._hitFx.play()

  this.destroy();
}

// remove inimigo
Enemy.prototype.destroy = function()
{
  // remove sprite do inimigo
  this._element.destroy();

  // remove marção de hit
  this._timeHitMark.destroy();

  // libera o resto
  this.clear();

  this._event.dispatch('onEnemyKill', {enemy:this});
}


Enemy.prototype.pulse = function(even, time)
{
  if(even)
  {
    this._element.scale.x = 0.8;
    this._element.scale.y = 1.1;
  }
  else
  {
    this._element.scale.x = 1.1;
    this._element.scale.y = 0.8;
  }
}