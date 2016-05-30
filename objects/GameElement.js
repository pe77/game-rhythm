var GameElement = function(){};


GameElement.id = 0;
GameElement.prototype = {

  // atributos
  _name:'GameElement - Name',

  _element:null,

  init: function (game, attrs) {
    this._game = game;
    this._id = ++GameElement.id;

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


};