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
    // carrega sprite
    var hearth = this._game.add.group().create(0, 0, 'hearth-sprite-beat');

    // posiciona corações
    hearth.x = (i * hearth.width) + (5 * i);
    hearth.anchor.set(0.5);
    hearth.x += hearth.width / 2;  
    hearth.y += hearth.height / 2;

    // add no elemento principal
    this._element.add(hearth);

    // variaveis do coração rs
    hearth.even = even;
    hearth.animType = 'beat';

    // cria animação
    hearth._beatAni = hearth.animations.add('beat');
    hearth._beatAni.loop = true;

    // se for even, começa a animação antes
    if(hearth.even)
      hearth._beatAni.next();
    //

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

      hearth._beatAni.next(); // proxima animação
      
    }, this);
}