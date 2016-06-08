var HealthBar = function(game, attrs){

  this._health = 5; // vidas inicial

  // inicia gerenciador de eventos
  this._event = new Event('player-event', this);

  // grupo de elementos
  this._hearthGroup = game.add.group();

  this.init(game, attrs)
}

HealthBar.prototype = Object.create(PkElement.prototype);

// sobrescreve o metodo que cria o elemento
HealthBar.prototype.create = function()
{

  var even = true;
  for (var i = 0; i < this._health; i++)
  {
    var hearth = this._game.add.sprite(0, 0, 'player-ui-hearth');
    hearth.x = (i * hearth.width) + (5 * i);
    hearth.anchor.set(0.5);
    hearth.x += hearth.width / 2;  
    hearth.y += hearth.height / 2;
    this._hearthGroup.add(hearth);
    hearth.even = even;
    even = !even;
  };

  // coloca no canto direito superior
  this._hearthGroup.x = this._game.width - this._hearthGroup.width - 5;
  this._hearthGroup.y += 5;

  console.log('create');
}

HealthBar.prototype.destroy = function()
{
  this._hearthGroup.destroy(true);

  // limpa o resto
  this.clear();
}

HealthBar.prototype.pulse = function(even, time)
{
  this._hearthGroup.forEachAlive(function(hearth){

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