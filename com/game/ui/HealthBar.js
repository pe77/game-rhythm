var HealthBar = function(game, attrs){

  this._value = 0; // vidas inicial
  this._valueMax = 10; // vidas maximas

  this._padding = 5; // espaço entre os corações

  // inicia gerenciador de eventos
  this._event = new PkEvent('heath-event', this);

  this.init(game, attrs)
}

HealthBar.prototype = Object.create(PkElement.prototype);


HealthBar.prototype.add = function(value)
{
  // se já estiver no max, não faz nada
  if(this._value == this._valueMax)
  {
    this._event.dispatch('onSetValueFinish');
    return;
  }
  //

  // se a adição vai dar maior que o max, ajusta pro maximo
  this._value = (this._value + value) > this._valueMax ? this._valueMax : (this._value + value);

  // conta quantos corações tem, mas add só apartir de X
  var hearths = [];
  this._element.forEachAlive(function(element){

    if(element.type == 'hearth')
      hearths.push(element);
    //
  }, this);

  var even = hearths.length ? hearths[hearths.length-1].even : true;
  for (var i = hearths.length; i < this._value; i++) {

    var delay = (i - hearths.length) * 300;

    var lastHearth = hearths.length ? hearths[hearths.length-1] : null;

    // cria os corações
    var hearth = this._game.add.sprite(0, 0, 'hearth-sprite-beat');

    // posiciona corações
    if(!lastHearth)
    {
      hearth.x -= this._padding;
      hearth.x -= hearth.width;
    }else{
      hearth.x = lastHearth.x - hearth.width - this._padding;  // coloca atras (do laod esquerdo do anterior)
    }

    console.log('x', hearth.x);
    
    hearth.anchor.set(0.5);
    hearth.x += hearth.width / 2;  
    hearth.y += hearth.height / 2;
    hearth.alpha  = 0;

    // variaveis anexadas
    hearth.even = even = !even;;
    hearth.type = 'hearth';
    hearth.index = i;

    // cria animação
    hearth.animType = 'beat';
    hearth._beatAni = hearth.animations.add('beat');
    hearth._beatAni.loop = true;

    // se for even, começa a animação antes
    if(hearth.even)
      hearth._beatAni.next();
    //

    // add no grupo
    this._element.add(hearth);
    hearths.push(hearth);

    var fallIn = this._game.add.tween(hearth);

    // quando terminar a animação
    fallIn.onComplete.add(function(h){
      if( h.index+1 == this._value)
        this._event.dispatch('onSetValueFinish');
      //
    }, this);

    hearth.y -= 10;
    // anima queda
    fallIn.to({
      y:hearth.y+10,
      alpha:1
    }, 500, null, true, delay);
  }

  console.log('this._element.width', this._element.width)

  // coloca no canto direito superior
  var postTween = this._game.add.tween(this._element);
  this._element.x = this._game.width; //this._game.width - this._element.width - 5;
  this._element.y = 5;
}


HealthBar.prototype.sub = function(value)
{
  // se já estiver zerado não faz nada
  if(this._value <= 0)
  {
    this._event.dispatch('onSetValueFinish');
    return;
  }
  //

  // se a subtração vai dar negativo, ajusta pra zerar
  this._value = (this._value - value) < 0 ? 0 : (this._value - value);

  var hearth = [];

  this._element.forEachAlive(function(element){

    if(element.type == 'hearth')
      hearth.push(element);
    //
  }, this);

  // console.log('this._value', this._value);

  value = value > hearth.length ? hearth.length : value;


  for (var i = 0; i < value; i++) {

    var hearth  = hearth.pop();
    var delay = i * 200;

    hearth.alive = false;

    var fadeDrop = this._game.add.tween(hearth);

    hearth.index  = i;

    // quando terminar a animação, remove elemento
    fadeDrop.onComplete.add(function(g){

      this._element.remove(g);

      if(g.index+1 == value)
        this._event.dispatch('onSetValueFinish');
      //

      g.kill();

      
    }, this);

    // anima queda
    fadeDrop.to({
      alpha:0,
      x:hearth.x-20,
      y:hearth.y+30,
      width:hearth.width * 2,
      height:hearth.height* 2,
      rotation:hearth.rotation+5
    }, 300, null, true, delay);
  } 
}

HealthBar.prototype.set = function(v)
{
  // mantem os valores dentro dos limites
  v = v > this._valueMax ? this._valueMax : v;
  v = v < 0 ? 0 : v;

  var originalValue = this._value;

  console.log('set', v, originalValue)

  // se add ou sub

  // se for uma adição
  if(v > originalValue)
  {
    this.add(v-originalValue);
    return;
  }

  // se for uma subtração
  if(v < originalValue)
  {
    this.sub(originalValue-v);
    return;
  }

  // se não alterou o valor, foda-se
  this._event.dispatch('onSetValueFinish');

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