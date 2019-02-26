let motor = {};
/*



---------------------------------------------------------------------------------------------------------------------- Data


*/

motor.datos = {
  metadata: {},
  project: { nombre: "Nuevo juego" },
  scene: {
    metadata: { mode: "2D" },
    objetos: {},
    materials: {}
  },
  scripts: {}
};

/*



---------------------------------------------------------------------------------------------------------------------- Save


*/

motor.save = function(content) {
  var contentString = JSON.stringify(content);
  // Abre la ventana de seleccion de ruta
  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // Guarda el archivo en formato .jgo con el contenido JSON  que queramos
    fs.writeFile(fileName + ".jgo", contentString, err => {
      if (err) {
        alert("An error ocurred creating the file " + err.message);
      }

      alert("The file has been succesfully saved");
    });
  });
};

/*



---------------------------------------------------------------------------------------------------------------------- Open



*/

motor.open = function() {
  dialog.showOpenDialog(fileNames => {
    // Abre una ventana que hace posible escoger el archivo con el que vamos a trabajar
    if (fileNames === undefined) {
      console.log("No file selected");
      return;
    }

    var FileData = fs.readFile(fileNames[0], "utf-8", (err, data) => {
      if (err) {
        alert("An error ocurred reading the file :" + err.message);
        return;
      }

      // Aqui es el lugar en donde se puede usar la informacion del JSON
      motor.datos.direccionProyecto = fileNames[0];
      editor.setValue(data);
      console.log(JSON.parse(data));
    });
  });
};

/*



---------------------------------------------------------------------------------------------------------------------- Export



*/

motor.export = function(content) {
  // Si se cancela la operacion

  dialog.showSaveDialog(fileName => {
    if (fileName === undefined) {
      console.log("You didn't save the file");
      return;
    }

    // Se crean los directorios para los archivos del juego

    fs.mkdir(fileName, false, function() {
      // Despues de crear la carpeta principal
      fs.copyFile(
        __dirname + "/PBase/index.html",
        fileName + "/index.html",
        err => {
          if (err) throw err;
          console.log("source.txt was copied to destination.txt");
        }
      );

      fs.mkdir(fileName + "/objetos", false, function() {
        // Despues de crear la carpeta Objetos
      });
      fs.mkdir(fileName + "/recursos", false, function() {
        // Despues de crear la carpeta recursos
      });
      fs.mkdir(fileName + "/escenas", false, function() {
        // Despues de crear la carpeta escenas
      });
      fs.mkdir(fileName + "/js", false, function() {
        // Despues de crear la carpeta js
        fs.copyFile(
          __dirname + "/js/three.min.js",
          fileName + "/js/three.min.js",
          err => {
            if (err) throw err;
            console.log("source.txt was copied to destination.txt");
          }
        );
      });
    });
  });
};

motor.showEditor = function(on) {
  if (on) {
    document.querySelector("#container").classList.remove("hide");
  } else {
    document.querySelector("#container").classList.add("hide");
  }
};

/*



---------------------------------------------------------------------------------------------------------------------- Play



*/

motor.play = function() {
  alert("Play");
};
