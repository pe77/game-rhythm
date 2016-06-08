var PkState = function(game) { 
  this._game = game 
};

PkState.prototype = {

  name:'Stage Name',

  preload: function () { },

  create: function () {

    this.stage.disableVisibilityChange = false;

    // cria transicao
    this._transition = new PkTransition();
    this._transition.init(game);
    this._transition.create();

    // depois que termina a animação de entrada no stagio, se houver callback, retorna
    if(this.onEndTransition)   
      this._transition._event.add('onEndInTransition', this.onEndTransition, this);
  }
};