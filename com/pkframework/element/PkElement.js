var PkElement = function(){};


PkElement.id = 0;
PkElement.prototype = {

  
  init: function (game, attrs) {

    // atributos
    this._game = game;
    this._id = ++PkElement.id;
    this._tweens = [];
    this._element = null;
    this._name = 'PkElement';

    if(attrs !== undefined)
    {
      for (var i in attrs)
          this[i] = attrs[i];
      // 
    }
  },

  create: function (sprite)
  {
    return this._element = this._game.add.sprite(0, 0, sprite);
  },

  // pega um atributo
  getAttr:function(id, defaultValue){

    for (var i in this)
      if(this[i] == id)
        return this[i];
    //

    return defaultValue !== undefined ? defaultValue : null;
  },

  // seta um atributo
  setAttr:function(id, value){

    for (var i in this)
      if(this[i] == id)
        return this[i] = value;
    //

    return value;
  },

  addTween:function(element)
  {
    this._tweens.push(this._game.add.tween(element));
    return this._tweens[this._tweens.length-1];
  },


  clear: function ()
  {
    // para os tweens 
    for (var i = 0; i < this._tweens.length; i++) {
      this._tweens[i].stop();
    };

    if(this._element)
      this._element.destroy();
    //
  },


};