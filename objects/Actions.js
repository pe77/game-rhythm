var Actions = function () {
  
  this._event = null;
  this._element = null;


  this._padding=5;

  // events
  this._event = new Event(this);

  this._buttons  = [];

  // add listener
  this.create = function(buttons)
  {
  	this._buttons = buttons || [];

  	// se não houver botões, ignora
  	if(!this._buttons.length)
  		return;
  	//



  	this._element = game.add.group();


  	// coloca os botões
    for (var i = 0; i < this._buttons.length; i++) 
    {
      var button = this._buttons[i];

      // cria
      button.create(game);

      button._element.input.priorityID = 1;

      if(i > 0)
      {
        // posiciona abaixo do anterior
        button._element.y = this._buttons[i-1]._element.y + this._buttons[i-1]._element.height + (this._padding);
      }
      
      // mostra os botões animadamente
      
      var elasticIn = game.add.tween(button._element);
      elasticIn.from({
        alpha:0,
        x:button._element.x - 100
      }, 800, Phaser.Easing.Sinusoidal.InOut, true, 300 * i);
      

      // seta a ancora do x para a ponta
      button._element.anchor.x  = 1;

      // marca o evento
      button._event.add('onInputUp', function(e){
        e.modal.onSelect(e);
      }, {modal:this});
      
      // add no grupo
      this._element.add((this._buttons[i] = button)._element);
    }

    // posiciona, por padrão no canto inferior direito da tela
    this._element.x = game.world.width - this._element.width - this._padding;
    this._element.y = game.world.height - this._element.height - this._padding;

    // add + por causa da ancora
    this._element.x += this._element.width;
  }



  this.onSelect = function(e)
  {
    // repassa o evento
    this._event.dispatch('onSelect', e);
  }

};
