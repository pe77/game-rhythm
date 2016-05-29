var ResourceIcon = function () {};


ResourceIcon.prototype = {

  // atributos
  _game:null,

  _id:'',
  _padding:3,

  _name:'--',
  _value:0,
  _valueMax:10,

  _element:null,

  // events
  _event:null,

  _valueTextElement:null,
  _icon:null,

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
    
    if(this._id == '')
    {
      console.error('ID for StatusBar REQUIRED');
      return;
    }

    this._element = this._game.add.group(undefined, 'resource-group-'+this._id); // cria o grupo

    // valor
    this._valueTextElement = this._game.add.text(0, 0, this._value, { 
      font: "bold 25px Arial", 
      fill: "#000",
      align: "right",
      boundsAlignH: 'right'
    });

    this.updateText(this._value);

    // cria o icone
    this._icon = this._game.add.sprite(0, 0, 'icon-' + this._id);
    this._valueTextElement.x = this._icon.x + this._icon.width + this._padding;

    this._icon.anchor.setTo(0.5, 0.5)
    this._icon.x += this._icon.width / 2;
    this._icon.y += this._icon.height / 2;

    this._element.add(this._icon); // add icone
    this._element.add(this._valueTextElement); // add texto do valor

    this._element.originalPosX = this._element.x;
    this._element.originalPosY = this._element.y;
    
  },

  updateText:function(text){
    this._valueTextElement.text = text;
    this._valueTextElement.text = this._valueTextElement.text.length == 1 ? '0' + this._valueTextElement.text : this._valueTextElement.text;
  },

  setValue:function(v){


    

    var animationIn = this._game.add.tween(this._element);

    // quando terminar a animação
    animationIn.onComplete.add(function(g){

      // atualiza valor
      this.updateText(this._value = v);

      // se não alterou o valor, foda-se
      this._event.dispatch('onSetValueFinish');

      var animationOut = this._game.add.tween(this._element);

      // anima volta
      animationOut.to({
        y:this._element.originalPosY,
        alpha:1
      }, 200, null, true);

    }, this);

    // anima queda
    animationIn.to({
      y:this._element.y + 10,
      alpha:0
    }, 50, null, true);

    
    
  }
};