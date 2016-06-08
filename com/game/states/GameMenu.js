var GameMenu = function(game) {};

GameMenu.prototype = Object.create(PkState.prototype);

GameMenu.prototype.name = "Menu";

GameMenu.prototype.init = function(){
  this.buttons = [
    new PkButton(1, 'btn-m1'),
    new PkButton(2, 'btn-m2'),
    new PkButton(3, 'btn-m3')
  ];

  this.buttonsGroup = game.add.group();
}

GameMenu.prototype.onEndTransition = function(e)
{
  // console.log('GameMenu.prototype.onEndTransition');


  for (var i = 0; i < this.buttons.length; i++) {
    this.buttons[i].create(game);

    this.buttonsGroup.add(this.buttons[i]._element);

    this.buttons[i]._event.add('onInputUp', function(e){
      // console.log('aqui nessa bosta')
      this.selectMusic(e.id)
    }, this);

    this.buttons[i]._element.y = (this.buttons[i]._element.height * i) + (i * 10);
  };

  this.buttonsGroup.x = (game.width / 2) - (this.buttonsGroup.width / 2);
  this.buttonsGroup.y = (game.height / 2) - (this.buttonsGroup.height / 2);

}


GameMenu.prototype.selectMusic = function(id){
  console.log('musica selecionada:' + id);

  musicGame.selectedMusic = id;
  this._transition.change('Main');
}