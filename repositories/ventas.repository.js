const db = require("../config/db");
 
const SELECCION = `
  SELECT v.id, v.cantidad, v.total, v.fecha,
         p.id AS productoId, p.nombre AS producto,
         u.id AS usuarioId, u.nombre AS cliente
  FROM ventas v
  JOIN productos p ON p.id = v.producto_id
  LEFT JOIN usuarios u ON u.id = v.usuario_id`;
 
function listar() {
  return db.prepare(SELECCION + " ORDER BY v.id DESC").all();
}

function listarPorUsuario(usuarioId) {
  return db.prepare(SELECCION + " WHERE v.usuario_id = ? ORDER BY v.id DESC").all(usuarioId);
}
 
function buscarPorId(id) {
  return db.prepare(SELECCION + " WHERE v.id = ?").get(id);
}
 
function contarPorProducto(productoId) {
  return db.prepare(
    "SELECT COUNT(*) AS total FROM ventas WHERE producto_id = ?"
  ).get(productoId).total;
}
 
function crear({ productoId, usuarioId, cantidad, total }) {
  const resultado = db.prepare(
    "INSERT INTO ventas (producto_id, usuario_id, cantidad, total) VALUES (?, ?, ?, ?)"
  ).run(productoId, usuarioId, cantidad, total);
 
  return buscarPorId(resultado.lastInsertRowid);
}
 
module.exports = { listar, listarPorUsuario, buscarPorId, contarPorProducto, crear };
