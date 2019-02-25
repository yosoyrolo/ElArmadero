let motor = {};

motor.data = {
  nombre: "Juego Nuevo"
};
motor.save = function(url, nombre) {
  var fullUrl = url + "/" + nombre;
  storage.set(fullUrl, this.data, err => {
    if (err) {
      console.error(err);
    }
  });
};

motor.open = function(url) {
  storage.get(url, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
};

console.log(storage);
