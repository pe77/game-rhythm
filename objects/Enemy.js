var Enemy = function(game, attrs)
{
  // inicia gerenciador de eventos
  this._event = new Event('enemy-event', this);

  // inicia objeto
  this.init(game, attrs);
}

Enemy.prototype = Object.create(GameElement.prototype);

// sobrescreve o metodo que cria o elemento
Enemy.prototype.create = function(sprite)
{
  // chama a super classe
  GameElement.prototype.create.call(this, sprite);

  // add o click
  this._element.inputEnabled = true;

  // add o evento de click
  this._element.events.onInputUp.add(function(){
    this._event.dispatch('onEnemyClick', {enemy:this});
  }, this);
}

Enemy.prototype.setPosition = function(position)
{
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

  this._element.position = pos;
  this._element.anchor.set(0.5);

  return this._element.position;

}

// faz o inimigo correr até determinado ponto e um tempo X
Enemy.prototype.runTo = function(position, time)
{
  this.enemyRunTween  = game.add.tween(this._element);
  time = time || game.rnd.integerInRange(500, 1500);

  
  var enemyAlpha      = game.add.tween(this._element);
  this._element.alpha = 0;
  enemyAlpha.to({
    alpha:1
  }, 400, null, true);

  this.enemyRunTween.to({
    x:position.x,
    y:position.y
  }, time, null, true);

  this.enemyRunTween.onComplete.add(function(enemy){
    this._event.dispatch('onEndRun', {enemy:enemy});
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

  var fadeOut = game.add.tween(this._text);

  fadeOut.to({
    y:this._text.y-100,
    alpha:0
  }, 600, null, true);

  fadeOut.onComplete.add(function(text){
    text.kill();
  }, this);

  // som de morte
  this._hitFx.play()

  this.kill();
}

// remove inimigo
Enemy.prototype.kill = function()
{
  // remove sprite
  this._element.kill();
}