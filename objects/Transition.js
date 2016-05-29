// obj
var Transition = function () {};

Transition.prototype = {

  // atributos
  _id:null,
  _game:null,
  _time:1000,

  _bgIn:null,
  _bgOut:null,

  // events
  _event:null,

  // metodos 
  init: function(game, attrs) {
    
    this._game = game;
    attrs = attrs || {};

    this._event = new Event('transition-event', this);

    for (var i in attrs)
        this[i] = attrs[i];
    // 

    
  },

  getStateByName: function(name)
  {
    for (var i in this._game.state.states)
    {
      if(i == name)
        return this._game.state.states[i];
      //
    };

    return null;
  },

  create: function (autoShow) {

    autoShow = autoShow !== false; // true default

    // cria transição de entrada


    // cria bg
    poly = new Phaser.Polygon();
    poly.setTo([
      new Phaser.Point(0, 0), // 1
      new Phaser.Point(game.world.width, 0),  // 2
      new Phaser.Point(game.world.width + (game.world.width / 2), game.world.height), // 4
      new Phaser.Point(0, game.world.height) // 3
    ]);

    this._bgIn = this._game.add.graphics(0, 0);

    this._bgIn.beginFill(0x000000);
    this._bgIn.drawPolygon(poly.points);
    this._bgIn.endFill();
    this._bgIn.width; // se eu não fizer isso e criar outro elemento, ele acha que tem tamanho 1

    // mostra o nome do estado | se houver
    var state = this._game.state.getCurrentState();

    // mostra a tela automaticamente
    if(autoShow)
      this.incomingOut();
    //
    



    
  }, 

  // anima saida, da entrada. HUE
  incomingOut:function(){

    
    var slideLeft = this._game.add.tween(this._bgIn);

    slideLeft.to({
      x:this._bgIn.width * (-1)
    }, 500);

    
    slideLeft.onComplete.add(function(obj){

      // dispara evento de saida
      this._event.dispatch('onEndInTransition', {state:this._game.state.current});
      
    }, this);
    

    slideLeft.start();
  },

  change:function(stateName, showName) {


    showName = showName === true; // true default

    // cria bg
    poly = new Phaser.Polygon();
    poly.setTo([
      new Phaser.Point((game.world.width / 2) * (-1), 0), // 1
      new Phaser.Point(game.world.width, 0),  // 2
      new Phaser.Point(game.world.width, game.world.height), // 4
      new Phaser.Point(0, game.world.height) // 3
    ]);

    this._bgOut = this._game.add.graphics(0, 0);

    this._bgOut.beginFill(0x000000);
    this._bgOut.drawPolygon(poly.points);
    this._bgOut.endFill();

    this._bgOut.x = this._bgOut.width;

    var slideLeft = this._game.add.tween(this._bgOut);

    slideLeft.to({
      x:0// - (this._bgOut.width / 2)
    }, 500);

    
    slideLeft.onComplete.add(function(obj){
      
      var state = this.getStateByName(stateName);

      // se é pra fazer a animação do nome
      if(showName && state.name)
      {
        

        var style = { font: "25px Arial", fill: "#FFFFFF", align: "center" };
        var text = this._game.add.text(this._game.world.centerX, this._game.world.centerY, '- '+state.name+ ' -', style);
        text.anchor.set(0.5);
        text.alpha = 0;
        
        // mostra
        var fadeIn = this._game.add.tween(text).to( { alpha: 1 }, 500, null, true);
        fadeIn.onComplete.add(function(obj){

          // fica um tempinho mosrtando
          this._game.time.events.add(Phaser.Timer.SECOND * 2, function(){
            
            // some o texto
            var fadeOut = this._game.add.tween(text).to( { alpha: 0 }, 500, null, true);
            fadeOut.onComplete.add(function(obj){
              this._game.state.start(stateName);
            }, this);

          }, this).autoDestroy = true;
        }, this);

      }else{
        this._game.state.start(stateName);
      }
      
    }, this);
    

    slideLeft.start();

    
  }
};


