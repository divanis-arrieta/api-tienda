const fs = require("fs");
const path = require("path");
 
const archivo = path.join(__dirname, "tienda.db");
 
if (fs.existsSync(archivo)) {
 fs.unlinkSync(archivo);
 console.log("Base de datos borrada.");
 console.log("Se crea de nuevo, con los datos iniciales, al iniciar el servidor.");
} else {
 console.log("No había base de datos para borrar.");
}