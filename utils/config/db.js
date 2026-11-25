const path = require("path");
const Database = require("better-sqlite3");
const { crearTablas, cargarDatosIniciales } = require("../database/iniciar");

// En las pruebas usamos una base de datos en memoria (DB_ARCHIVO=":memory:")
const archivo = process.env.DB_ARCHIVO
  || path.join(__dirname, "..", "database", "tienda.db");

const db = new Database(archivo);
db.pragma("foreign_keys = ON");

crearTablas(db);
cargarDatosIniciales(db);

module.exports = db;