var StatusBar = function () {};


StatusBar.prototype = {

  // atributos
  _game:null,

  _id:'',
  _padding:3,

  _name:'--',
  _value:0,
  _valueMax:10,

  _element:null,

  // sprites de auxilio
  _bg:null,

  // events
  _event:null,

  // metodos 
  init: function(game, attrs) {
    this._game = game;
    attrs = attrs || {};


    for (var i in attrs)
        this[i] = attrs[i];
    // 

    this._event = new Event(this._id);

    // seta o valor pro maximo 
    // this._value = this._valueMax;

  },


  create: function () {
    
    if(this._id == '')
    {
      console.error('ID for StatusBar REQUIRED');
      return;
    }

    // se o elemento(grupo) já existe, não recria
    if(this._element != null)
      this._element.removeAll(true); // destroi tudo
    else
      this._element = this._game.add.group(undefined, 'group-'+this._id); // cria o grupo
    

    // cria o icone
    var icon = this._game.add.sprite(0, 0, this._id + '-bar-icon');

    // cria o texto
    var text = this._game.add.text(0, 0, this._name, { font: "bold 10px Arial", fill: "#000"});
    text.x = icon.width + 5;
    text.y = icon.height - text.height;

    // cria o bg
    this._bg = this._game.add.sprite(0, 0, 'bar-bg');
    this._bg.x = icon.width + 5;

    this._element.add(icon); // add no grupo
    this._element.add(this._bg); // add no grupo
    this._element.add(text); // add no grupo

    for (var i = 0; i < this._value; i++)
    {
      // cria "gomo"
      var sprite = this._game.add.sprite(0, 0, this._id + '-bar');

      sprite.width = sprite.height = this._bg.height;
      sprite.x = (sprite.width * i) + (i*this._padding) + this._bg.x; // posiciona

      sprite.name = 'gomo-' + this._id + '-' + i;
      sprite.type = 'gomo';

      // add
      this._element.add(sprite);
    }
      
    
  },

  setValue:function(v){


    var eventValue = v;
    

    // mantem os valores dentro dos limites
    v = v > this._valueMax ? this._valueMax : v;
    v = v < 0 ? 0 : v;

    var originalValue = this._value;

    // se add ou sub

    // se for uma adição
    if(eventValue > originalValue)
    {
      this.add(eventValue-originalValue);
      return;
    }

    // se for uma subtração
    if(eventValue < originalValue)
    {
      this.sub(originalValue-eventValue);
      return;
    }

    // se não alterou o valor, foda-se
    this._event.dispatch('onSetValueFinish');
  },

  add:function(value){

    // se já estiver no max, não faz nada
    if(this._value == this._valueMax)
    {
      this._event.dispatch('onSetValueFinish');
      return;
    }
    //

    // se a adição vai dar maior que o max, ajusta pro maximo
    this._value = (this._value + value) > this._valueMax ? this._valueMax : (this._value + value);

    // conta quantos gomos tem, mas add só apartir de X
    var gomos = [];
    this._element.forEachAlive(function(element){

      if(element.type == 'gomo')
        gomos.push(element);
      //
    }, this);


    for (var i = gomos.length; i < this._value; i++) {

      var delay = (i - gomos.length) * 300;

      // cria "gomo"
      var gomo = this._game.add.sprite(0, 0, this._id + '-bar');

      gomo.width  = gomo.height = this._bg.height;
      gomo.x      = (gomo.width * i) + (i*this._padding) + this._bg.x;
      gomo.y      -= 15;
      gomo.alpha  = 0;

      gomo.name = 'gomo-' + this._id + '-' + i;
      gomo.type = 'gomo';
      gomo.index = i;

      // add no grupo
      this._element.add(gomo);


      var fallIn = this._game.add.tween(gomo);

      // quando terminar a animação
      fallIn.onComplete.add(function(g){
        if( g.index+1 == this._value)
          this._event.dispatch('onSetValueFinish');
        //
      }, this);

      // anima queda
      fallIn.to({
        y:0,
        alpha:1
      }, 500, null, true, delay);

    }
  },

  sub:function(value){

    // console.log('sub:' + value);

    // se já estiver zerado não faz nada
    if(this._value <= 0)
    {
      this._event.dispatch('onSetValueFinish');
      return;
    }
    //

    // se a subtração vai dar negativo, ajusta pra zerar
    this._value = (this._value - value) < 0 ? 0 : (this._value - value);


    

    var gomos = [];

    this._element.forEachAlive(function(element){

      if(element.type == 'gomo')
        gomos.push(element);
      //
    }, this);

    // console.log('this._value', this._value);

    value = value > gomos.length ? gomos.length : value;


    for (var i = 0; i < value; i++) {

      var gomo  = gomos.pop();
      var delay = i * 200;

      gomo.alive = false;

      var fadeDrop = this._game.add.tween(gomo);

      gomo.anchor.setTo(0.5, 0.5);
      gomo.x += gomo.width / 2;
      gomo.y += gomo.height / 2;
      gomo.index  = i;

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
        x:gomo.x+20,
        y:gomo.y+30,
        width:gomo.width * 3,
        height:gomo.height* 3,
        rotation:gomo.rotation+90
      }, 500, null, true, delay);
    }

    
    
  }
};