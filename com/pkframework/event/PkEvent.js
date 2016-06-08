// events
var PkEvent = function (name, target) {
  this._name = name || 'event';
  this._target = target || {};

  this._listeners = [];

  // add listener
  this.add = function(type, callBack, context){
    var exist = false;
    var context = context || {};

    // verifica se já não foi add
    for (var i = 0; i < this._listeners.length; i++) {

      if(this._listeners[i].callBack.toString() === callBack.toString())
      {
        exist = true
        break;
      }
    };

    if(!exist)
      this._listeners.push({type:type, callBack:callBack, context:context});
    //
  }


  // chama todos os ouvintes
  this.dispatch = function(type, args){
    
    args = args || {};
    for (var i = 0; i < this._listeners.length; i++)
    {
      if(type == this._listeners[i].type)
      {
        var data = {};

        // agrega a data do disparo
        for(var j in args)
          data[j] = args[j]
        //

        // add o objeto do evento
        data.target = this._target;

        // verifica se tem contexto
        if(!isEmpty(this._listeners[i].context))
        {
          this._listeners[i].callBack.call(this._listeners[i].context, data);
          continue;
        }

        // verifica se passou o contexto do disparador
        if(!isEmpty(this._target))
        {
          this._listeners[i].callBack.call(this._target, data)
          continue;
        }
        
        // dispara sem contexto mesmo
        this._listeners[i].callBack(data);
        
      }
    }

  }

};
