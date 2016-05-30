var Player = function(game, attrs){this.init(game, attrs)}

Player.prototype = Object.create(GameElement.prototype);

// sobrescreve o metodo que cria o elemento
Player.prototype.create = function(sprite)
{

  // desenha a area de ação
  circle = new Phaser.Circle(this._game.world.centerX, this._game.world.centerY, 140);

  var graphics = this._game.add.graphics(0, 0);
  graphics.lineStyle(1, 0x00ff00, 1);
  graphics.drawCircle(circle.x, circle.y, circle.diameter);

  this._actionArea = circle;


  // chama a super classe e desenha o boneco
  GameElement.prototype.create.call(this, sprite);

  this._element.anchor.set(0.5);
}

Player.prototype.pulse = function(even, time)
{

  if(even)
  {
    this._element.scale.x = 0.9;
    this._element.scale.y = 1.1;
  }
  else
  {
    this._element.scale.x = 1.1;
    this._element.scale.y = 0.9;
  }

  // desenha outro circulo a area de ação
  circle = new Phaser.Circle(0, 0, 140);

  var graphics = this._game.add.graphics(0, 0);
  graphics.lineStyle(1, 0x00ff00, 1);
  graphics.drawCircle(circle.x, circle.y, circle.diameter);


  graphics.x = this._element.x
  graphics.y = this._element.y


  var markPulser      = this._game.add.tween(graphics);
  markPulser.to({
    width:graphics.width + 100,
    height:graphics.height + 100,
    alpha:0
  }, 100, null, true);
}