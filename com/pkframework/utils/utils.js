var utils = {
  centerGameObjects: function (objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    })
  }
};

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true && JSON.stringify(obj) === JSON.stringify({});
}