var Enemy = function(game, attrs)
{
  // inicia gerenciador de eventos
  this._event = new PkEvent('enemy-event', this);

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
  this._element.inputEnabled = true;

  // add o evento de click
  this._element.events.onInputUp.add(function(){
    this._event.dispatch('onEnemyClick', {enemy:this});
  }, this);

  this._game.world.sendToBack(this._element);
}

Enemy.prototype.setPosition = function(position, angle)
{
  // angulo de onde virá (-1 = random)
  angle = angle || -1;

  // se houver posição, coloca
  if(position != undefined) // new PIXI.Point(0, 0);
  {
    this._element.position = position;
    return;
  }

  // calcula um raio para calcular a distancia onde vai aparecer
  circle = new Phaser.Circle(this._game.world.centerX, this._game.world.centerY, 500);
  var rand  = game.rnd.integerInRange(0, 360);
  var pos   = circle.circumferencePoint(rand, true);

  // se houver angulo predefinido, usa
  if(angle > -1)
    pos = circle.circumferencePoint(angle, true);
  //

  this._element.position = pos;
  this._element.anchor.set(0.5);

  return this._element.position;

}

// faz o inimigo correr até determinado ponto e um tempo X
Enemy.prototype.runTo = function(position, time, markTime)
{
  this._enemyRunTween  = this.addTween(this._element);
  time = time || game.rnd.integerInRange(500, 1500);

  markTime = markTime || time;


  // desenha a marcação do hit
  circle = new Phaser.Circle(this._game.world.centerX, this._game.world.centerY, 140);
  this._timeHitMark = this._game.add.graphics(this._game.world.centerX, this._game.world.centerY);
  this._timeHitMark.lineStyle(2, 0x00ffdd, 1);
  this._timeHitMark.drawCircle(0, 0, circle.diameter);

  this._timeHitMark.position = this._element.position;
  
  this._markCloseTwenn      = this.addTween(this._timeHitMark);
  this._markCloseTwenn.to({
    width:this._element.width -5,
    height:this._element.height -5
  }, markTime, null, true);

  // alpha de entrada
  this._enemyAlphaTween      = this.addTween(this._element);
  this._element.alpha = 0;
  this._enemyAlphaTween.to({
    alpha:1
  }, 400, null, true);

  this._enemyRunTween.to({
    x:position.x,
    y:position.y
  }, time, null, true);

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


Enemy.prototype.hit = function(perfectHit)
{
  var hitText = "Good";
  if(perfectHit === true)
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