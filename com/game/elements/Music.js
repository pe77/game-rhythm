var Music = function(game, attrs){

	// inicia gerenciador de eventos
 	this._event = new PkEvent('music-event', this);

  // todos os momentos (em ms) em que tem batida | varia de acordo com o bpm
  this._bpmPulses = [];
  this._decoded = false;

	this.init(game, attrs)
}

Music.prototype = Object.create(PkElement.prototype);

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


  this._game.sound.setDecodedCallback([this._song], function(){
    // console.log('song data', this._game.cache.getSound(key), this._song);

    this._duration = this._game.cache.getSound(key).data.duration * 1000; // duração da musica em ms

    // calcula todas os pulsos no decorrer de toda a musica
    this._bpmPulses = this.calcPulses(0, this._duration, this._bpm);

    this._decoded = true;

    this._event.dispatch('onDecodeComplete');
  }, this);

}

// toca  a musica
Music.prototype.play = function()
{
  if(this._decoded)
  {
    // inicia a musica
    this._song.play();

    // inicia um evento que pulsa a cada batida
    var pulseTime = (Phaser.Timer.SECOND * 60) / this._bpm;
    var even = true;

    // loop
    this._game.time.events.loop(pulseTime, function(){
      this._event.dispatch('onPulse', {even:even = !even, pulseTime:pulseTime});
    }, this)

    
  }
  //
}

Music.prototype.destroy = function()
{
  // para a musica
  this.stop();

  // destrou a musica
  this._song.destroy();

  // libera o resto
  this.clear();
}

Music.prototype.stop = function()
{
  // para musica
  this._song.play();
}

// calcula todas os pulsos no decorrer do tempo passado
Music.prototype.calcPulses = function(from, to, bpm) // to/from in sec's
{

    var totalPulseTime = from;
    var pulseMoment = 0;
    var pulses = [];

    pulses.push(from);
    
    while(totalPulseTime < to)
    {
      pulseMoment = ((Phaser.Timer.SECOND * 60) / (bpm * 1000)) * 1000;
      pulses.push(pulseMoment + totalPulseTime);

      totalPulseTime += pulseMoment;
    }

    if(pulses[pulses.length-1] > to)
      pulses.pop();
    //

    return pulses;
}

Music.prototype.getPulsesBetween = function(from, to, times) // in sec's
{
  from *= 1000;
  to *= 1000;
  times = times || 1;

  return this.calcPulses(from, to, times * this._bpm);
}

Music.prototype.pulse = function(even, time)
{

}