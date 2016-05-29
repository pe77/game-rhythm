var Modal = function(game) {

  this._game = game;

  this._padding=5;

  // events
  this._event = new Event(this);

  // elements
  this._bg    = null;
  this._text  = null;
  this._sub  = null;
  this._element  = null;
  
  this._buttons  = [];
  this._buttonsGroup  = {};

  // mostra quanto vai ganhar ou perder com a ação
  this._bonus  = [];
  this._bonusGroup  = {};

  this.create= function(question, buttons, sub, bonus)
  {
    this._buttons = buttons || [];
    this._bonus   = bonus || [];
    sub = sub || '';

    this._element = this._game.add.group(); // cria o grupo 

    // se não houver botões, add um de fechar
    if(!this._buttons.length)
      this._buttons.push(new Button('btn-close-modalIN', 'btn-close'));
    // 


    // cria bg
    poly = new Phaser.Polygon();
    poly.setTo([
      new Phaser.Point(0, 0), // 1
      new Phaser.Point(this._game.world.width, 0),  // 2
      new Phaser.Point(this._game.world.width, this._game.world.height), // 4
      new Phaser.Point(0, this._game.world.height) // 3
    ]);

    this._bgGraph = this._game.add.graphics(0, 0);

    this._bgGraph.beginFill(0x000000);
    this._bgGraph.drawPolygon(poly.points);
    this._bgGraph.endFill();
    this._bgGraph.width; 

    this._bg = this._game.add.sprite(0, 0);   
    this._bg.addChild(this._bgGraph);
    this._bg.alpha = 0;
    this._bg.width = this._bgGraph.width;
    this._bg.height = this._bgGraph.height;


    // cria o texto
    var style = { font: "25px Arial", fill: "#FFFFFF", align: "center" };
    this._text = this._game.add.text(this._game.world.centerX, this._game.world.centerY, question, style);
    this._text.anchor.set(0.5);
    this._text.cacheAsBitmap = true;
    this._text.alpha = 0;

    this._bonusGroup = this._game.add.group();
    // se houver botões bonus cria acima do sub texto, se houver
    if(this._bonus.length)
    {
      

      // coloca os botões
      for (var i = 0; i < this._bonus.length; i++) 
      {
        var bonus = this._bonus[i];

        // cria
        bonus.create(this._game);

        // posiciona depois do anterior
        if(i > 0)
          bonus._element.x = this._bonus[i-1]._element.x + this._bonus[i-1]._element.width + (this._padding * 2);
        //
        
        // add no grupo
        this._bonusGroup.add((this._bonus[i] = bonus)._element);
      }



      // pocisiona botões
      this._bonusGroup.x = this._game.world.centerX;
      this._bonusGroup.y = this._text.y - this._bonusGroup.height - (this._text.height / 2)// - this._padding * 2;
      // centraliza
      this._bonusGroup.x = this._bonusGroup.x - (this._bonusGroup.width / 2);

    }

    var cf = 0;
    this._bonusGroup.forEachAlive(function(bonus){
      // anima queda
      bonus.alpha = 0;

      var fadeIn = this._game.add.tween(bonus);

      bonus.y -= 150;
      // mostra bg
      fadeIn.to({
        alpha:1,
        y:bonus.y+150
      }, 300, null, true, 100 * cf);

      cf++;

    }, this);
    
    // se houver subtexto
    var style = { font: "15px Arial", fill: "#DDDDDD", align: "center" };
    this._sub = this._game.add.text(this._game.world.centerX, this._text.y + this._text.height - 10, sub, style);
    this._sub.anchor.set(0.5);
    this._sub.cacheAsBitmap = true;
    this._sub.alpha = 0;


    this._buttonsGroup = this._game.add.group();
    

    // coloca os botões
    for (var i = 0; i < this._buttons.length; i++) 
    {
      var button = this._buttons[i];

      // cria
      button.create(this._game);

      button._element.input.priorityID = 2;


      button._event.add('onInputUp', function(e){
        if(e.id == 'btn-close-modalIN')
        {
          e.modal.close();
          return;
        }
        e.modal.onSelect(e);
      }, {modal:this});

      // posiciona depois do anterior
      if(i > 0)
        button._element.x = this._buttons[i-1]._element.x + this._buttons[i-1]._element.width + (this._padding * 3);
      //
      
      // add no grupo
      this._buttonsGroup.add((this._buttons[i] = button)._element);
    }

    
    // posiciona botões na parte de baixo do texto
    this._buttonsGroup.x = this._game.world.centerX - (this._buttonsGroup.width / 2);
    this._buttonsGroup.y = this._text.y + this._text.height + this._padding;

    var cc = 0;
    this._buttonsGroup.forEachAlive(function(button){
      // anima queda
      button.alpha = 0;

      var fadeIn = this._game.add.tween(button);

      button.y -= 150;
      // mostra bg
      fadeIn.to({
        alpha:1,
        y:button.y+150
      }, 800, Phaser.Easing.Bounce.Out, true, 300 * cc);

      cc++;

    }, this);
    
    

    // bloqueia o click
    this._bg.inputEnabled = true;
    this._bg.input.priorityID = 1;

    // salva a referencia
    this._bg.class = this;
    this._text.class = this;

    
    var fadeIn = this._game.add.tween(this._bg);

    // mostra bg
    fadeIn.to({
      alpha:0.9
    }, 500, null, true);


    fadeIn.onComplete.add(function(obj){

      fadeIn = game.add.tween(obj.class._text);

      // mostra texto
      obj.class._text.y -= 150;
      fadeIn.to({
        y:obj.class._text.y+150,
        alpha:1
      }, 300, null, true);


      fadeIn = this._game.add.tween(this._sub);

      // mostra bg
      fadeIn.to({
        alpha:1
      }, 500, null, true);


    }, this);


    // add tudo no grupo só
    this._element.add(this._bg);
    this._element.add(this._text);
    this._element.add(this._sub);
    this._element.add(this._bonusGroup);
    this._element.add(this._buttonsGroup);

    
  }

  this.close = function()
  {

    var fadeOut = this._game.add.tween(this._element);

    // mostra bg
    fadeOut.to({
      alpha:0,
      y:this._element.height * (-1)
    }, 200, null, true);

    fadeOut.onComplete.add(function(obj){
      this._element.removeAll(true);
    }, this);

  }


  this.onSelect = function(e)
  {
    // repassa o evento
    this._event.dispatch('onSelect', e);
  }
};

