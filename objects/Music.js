var Music = function(game, attrs){

	// inicia gerenciador de eventos
 	this._event = new Event('music-event', this);

  // todos os momentos (em ms) em que tem batida | varia de acordo com o bpm
  this._bpmPulses = [];

	this.init(game, attrs)
}

Music.prototype = Object.create(GameElement.prototype);

// sobrescreve o metodo que cria o elemento, mas não tem elementos visuais
// ou seja, não cria
Music.prototype.create = function(sprite) { };


// carrega as informações e detalhes tecnicos da musica
Music.prototype.loadXmlData = function(xml)
{
  this._enemySpeed      = parseInt(xml.getElementsByTagName("music")[0].attributes.speed.value);
  this._bpm             = parseInt(xml.getElementsByTagName("music")[0].attributes.bpm.value);
  this._proximityDelay  = parseInt(xml.getElementsByTagName("music")[0].attributes.proximityDelay.value);
};

// a musica em si
Music.prototype.loadSong = function(key)
{
  this._song = this._game.add.audio(key);
  this._game.sound.setDecodedCallback([song], function(){
    console.log('song data', this._game.cache.getSound(key), this._song);
    this._event.dispatch('onDecodeComplete');
  }, this);
}


Music.prototype.calcBpmPulses = function()
{

}


Music.prototype.pulse = function(even, time)
{

}