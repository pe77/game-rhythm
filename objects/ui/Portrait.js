var Portrait = function () {};


Portrait.prototype = {

  // atributos
  _game:null,

  _id:'portrait',
  _status:'',
  _name:'',

  _padding:5,

  _portrait:null,
  _element:null,

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
  },


  create: function () {
    
    if(this._status == '')
    {
      console.error('_status for portrait REQUIRED');
      return;
    }

    this._element = this._game.add.group(undefined, 'portrait-group-'+this._id); // cria o grupo

    // valor
    var name = this._game.add.text(0, 0, this._name, { 
      font: "bold 50px Arial", 
      fill: "#000"
    });

    name.cacheAsBitmap = true;

    // cria o icone
    this._portrait = this._game.add.sprite(0, 0, 'status-' + this._status);
    
    // coloca o nome embaixo
    name.y = this._portrait.height + this._padding;

    // ajusta retrato
    this._portrait.x = name.width - this._portrait.width;

    this._element.add(this._portrait); // retrato
    this._element.add(name); // nome do personagem
    
  },

  setStatus:function(v)
  {
    var shakeIn = this._game.add.tween(this._portrait);

    // quando terminar a animação
    shakeIn.onComplete.add(function(g){

      // muda o porta-retrato | imagem
      this._portrait.loadTexture('status-' + (this._status = v));

      // solta o evento
      this._event.dispatch('onSetValueFinish');

      var shakeBack = this._game.add.tween(this._portrait);

      // anima volta
      shakeBack.to({
        y:0,
        alpha:1
      }, 200, null, true);

    }, this);

    // anima queda
    shakeIn.to({
      y:this._portrait.y + 10,
      alpha:0
    }, 50, null, true);

  }

  
};