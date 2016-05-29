// events
var Button = function (id, sprite) {
  
  this._id = id;
  this._sprite = sprite;
  this._game = game;
  
  this._event = null;

  this._element = null;

  this.onClick = function(target)
  {
  	console.log('Clicou no botão ' + this._id)
  }
  

  // add listener
  this.create = function(game)
  {

  	this._event = new Event(this._id, this);
    
    this._game = game;
    this._element = this._game.add.sprite(0, 0, this._sprite);


    this._element.inputEnabled = true;
    this._element.events.onInputUp.add(function(){
    	this._event.dispatch('onInputUp', {id:this._id});
    }, this);

  }

};
