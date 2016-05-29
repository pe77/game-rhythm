var Stage = function(game) {};

Stage.prototype = {

  name:'Stage Name',

  preload: function () { },

  createBackground: function(){
    console.log('Stage, createBackground');
  },

  create: function () {
    this.stage.disableVisibilityChange = false;

    // cria transicao
    transition.create();

    // depois que termina a animação de entrada no stagio, se houver callback, retorna
    if(this.onEndTransition)   
      transition._event.add('onEndInTransition', this.onEndTransition, {}, this);
  }
};