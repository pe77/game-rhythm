var Player = function(game, attrs){

  // inicia gerenciador de eventos
  this._event = new PkEvent('player-event', this);

  // barrinha de vida
  this._heathBar = new HealthBar(game, {_health:5});

  // vidas inicial
  this._health = this._heathBar._health;// vidas inicial

  this._hitRange = 100;

  this.init(game, attrs)
}

Player.prototype = Object.create(PkElement.prototype);

// sobrescreve o metodo que cria o elemento
Player.prototype.create = function()
{

  // desenha a area de ação
  circle = new Phaser.Circle(this._game.world.centerX, this._game.world.centerY, this._hitRange);

  this._circleGraphic = this._game.add.graphics(0, 0);
  this._circleGraphic.lineStyle(1, 0x00ff00, 1);
  this._circleGraphic.drawCircle(circle.x, circle.y, circle.diameter);

  this._actionArea = circle;

  // chama a super classe e desenha o boneco
  PkElement.prototype.create.call(this);

  // configura/cria a animação
  this._idleSprite = this._game.add.group().create(0, 0, 'player-sprite-idle');
  this._idleSprite.animType = 'idle';
  this._idleAni = this._idleSprite.animations.add('idle');
  this._idleAni.loop = true;


  // add no elemento
  this._element.add(this._idleSprite);

  // cria a barra de vida
  this._heathBar.create();

  // centraliza pivot
  this._element.setAll('anchor.x', 0.5)
  this._element.setAll('anchor.y', 0.5)
}

Player.prototype.pulse = function(even, time)
{
  // troca o frame da animação com o ritmo
  this._idleAni.next();

  this._heathBar.pulse(even, time);

  return;

  /*
  // desenha outro circulo a area de ação
  circle = new Phaser.Circle(0, 0, this._hitRange);

  var graphics = this._game.add.graphics(0, 0);
  graphics.lineStyle(1, 0x00ff00, 1);
  graphics.drawCircle(circle.x, circle.y, circle.diameter);


  graphics.x = this._element.x
  graphics.y = this._element.y


  var markPulser      = this.addTween(graphics);
  markPulser.to({
    width:graphics.width + 100,
    height:graphics.height + 100,
    alpha:0
  }, 100, null, true);
  */ 
}


Player.prototype.destroy = function()
{
  // destro o circulo que pulsa
  this._circleGraphic.destroy();

  // os corações
  this._heathBar.destroy();

  // libera o resto
  this.clear();
}