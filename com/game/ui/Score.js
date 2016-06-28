var Score = function(game, attrs){

  this._value = 0; // valor inicial
  this._padding = 5; // espaço entre os corações
  this._basePoins = 3; // pontos por click (podendo ser multiplicado por precisão)

  this._style = { font: "22px David-Sans", fill: "#ffffff"};

  // inicia gerenciador de eventos
  this._event = new PkEvent('score-event', this);
  
  this._text  = null;

  this.init(game, attrs)
}

Score.prototype = Object.create(PkElement.prototype);

// sobrescreve o metodo que cria o elemento
Score.prototype.create = function()
{
  // chama a super classe 
  PkElement.prototype.create.call(this);

  // cria o texto
  this._text = game.add.text(0, -5, "Score:" + this._value, this._style);

  // add no elemento
  this._element.add(this._text);

  // coloca no canto superior esquerdo
  this._element.x = 0 + this._padding;
  this._element.y = 0 + this._padding;

  this.updateText();

}


Score.prototype.set = function(v)
{
  // mantem os valores dentro dos limites
  this._value = v < 0 ? 0 : v;

  this.updateText();
}

Score.prototype.add = function(v)
{
  // mantem os valores dentro dos limites
  v = v < 0 ? 0 : v;
  this._value += v;

  this.updateText();
}


Score.prototype.updateText = function()
{
  var text = this._value < 10 ? "0" + this._value : this._value;
  this._text.setText("Score: " + text + "pts");

  // console.log('text:', this._text.text)
}

Score.prototype.destroy = function()
{
  this._element.destroy(true);

  // limpa o resto
  this.clear();
}

Score.prototype.pulse = function(even, time)
{
  
}