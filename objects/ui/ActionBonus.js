// events
var ActionBonus = function (sprite, mod, qtd) {
  
  this._sprite = sprite;
  this._mod = mod;
  this._qtd = qtd || 0;

  this._game = game;
  
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
    this._element = this._game.add.group(); 

    

    var style = { font: "25px Arial", fill: "#FFFFFF", align: "center" };

    this._mod = this._game.add.text(0, 0, this._mod + (this._qtd != 0 ? this._qtd : ''), style);
    this._mod.cacheAsBitmap = true;

    var icon = this._game.add.sprite(0, 0, this._sprite);

    // diminui um pouco o icone
    icon.scale.x = 0.7;
    icon.scale.y = 0.7;

    this._element.add(this._mod);
    this._element.add(icon);

    icon.x += this._mod.width + 5;
  }

};
