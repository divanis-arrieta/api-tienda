const db = require("../config/db");
 
// Nunca devolvemos clave_hash, salvo cuando el login lo necesita
function buscarPorId(id) {
  return db.prepare("SELECT id, nombre, correo, rol FROM usuarios WHERE id = ?").get(id);
}
 
function buscarPorCorreoConClave(correo) {
  return db.prepare(
    "SELECT id, nombre, correo, rol, clave_hash FROM usuarios WHERE correo = ?"
  ).get(correo);
}
 
function crear({ nombre, correo, claveHash }) {
  const resultado = db.prepare(
    "INSERT INTO usuarios (nombre, correo, clave_hash) VALUES (?, ?, ?)"
  ).run(nombre, correo, claveHash);
 
  return buscarPorId(resultado.lastInsertRowid);
}
 
module.exports = { buscarPorId, buscarPorCorreoConClave, crear };
