var HealthBar = function(game, attrs){

  this._health = 5; // vidas inicial

  // inicia gerenciador de eventos
  this._event = new Event('heath-event', this);

  this.init(game, attrs)
}

HealthBar.prototype = Object.create(PkElement.prototype);

// sobrescreve o metodo que cria o elemento
HealthBar.prototype.create = function()
{

  // chama a super classe e desenha o boneco
  PkElement.prototype.create.call(this);

  
  var even = true;
  for (var i = 0; i < this._health; i++)
  {
    var hearth = this._game.add.sprite(0, 0, 'hearth-sprite-beat');
    hearth.x = (i * hearth.width) + (5 * i);
    hearth.anchor.set(0.5);
    hearth.x += hearth.width / 2;  
    hearth.y += hearth.height / 2;
    this._element.add(hearth);
    hearth.even = even;
    even = !even;
  };

  // coloca no canto direito superior
  this._element.x = this._game.width - this._element.width - 5;
  this._element.y += 5;
  
  console.log('create');
}

HealthBar.prototype.destroy = function()
{
  this._element.destroy(true);

  // limpa o resto
  this.clear();
}

HealthBar.prototype.pulse = function(even, time)
{
  this._element.forEachAlive(function(hearth){

      if(hearth.even)
      {
        if(even)
        {
          hearth.scale.x = 0.9;
          hearth.scale.y = 1.1;
        }
        else
        {
          hearth.scale.x = 1.1;
          hearth.scale.y = 0.9;
        }
      }
      else
      {
        if(!even)
        {
          hearth.scale.x = 0.9;
          hearth.scale.y = 1.1;
        }
        else
        {
          hearth.scale.x = 1.1;
          hearth.scale.y = 0.9;
        }
      }

    }, this);
}