const db = require("../config/db");

function listar() {
    return db.prepare(`
    SELECT c.id, c.nombre, COUNT(p.id) AS productos
    FROM categorias c
    LEFT JOIN productos p ON p.categoria_id = c.id
    GROUP BY c.id
    ORDER BY c.nombre
  `).all();

}

function buscarPorId(id) {
  return db.prepare("SELECT id, nombre FROM categorias WHERE id = ?").get(id);
}
function buscarPorNombre(nombre) {
  return db.prepare("SELECT id, nombre FROM categorias WHERE nombre = ?").get(nombre);
}

function crear(nombre) {
  const resultado = db.prepare("INSERT INTO categorias (nombre) VALUES (?)").run(nombre);
  return buscarPorId(resultado.lastInsertRowid);
}

module.exports = { listar, buscarPorId,buscarPorNombre,crear };