const db = require("../config/db");

function listar() {
  return db.prepare(`
    SELECT p.id, p.nombre, p.precio, p.stock, p.categoria_id, c.nombre AS categoria
    FROM productos p
    LEFT JOIN categorias c ON c.id = p.categoria_id
    ORDER BY p.id DESC
  `).all();
}
function buscarPorId(id) {
  return db.prepare(`
    SELECT p.id, p.nombre, p.precio, p.stock, p.categoria_id, c.nombre AS categoria
    FROM productos p
    LEFT JOIN categorias c ON c.id = p.categoria_id
    WHERE p.id = ?
  `).get(id);
}
function buscarPorNombre(nombre) {
  return db.prepare("SELECT * FROM productos WHERE nombre = ?").get(nombre);
}
function resolverCategoriaId(datos) {
  if (datos.categoria_id) return datos.categoria_id;
  if (datos.categoriaId) return datos.categoriaId;
  if (typeof datos.categoria === "number") return datos.categoria;
  if (typeof datos.categoria === "string" && datos.categoria) {
    let cat = db.prepare("SELECT * FROM categorias WHERE nombre = ?").get(datos.categoria);
    if (!cat) {
      const info = db.prepare("INSERT INTO categorias (nombre) VALUES (?)").run(datos.categoria);
      return info.lastInsertRowid;
    }
    return cat.id;
  }
  return 1;
}
async function crear(datos) {
  const categoria_id = resolverCategoriaId(datos);
  const info = db.prepare("INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)").run(datos.nombre, datos.precio, datos.stock, categoria_id);
  return buscarPorId(info.lastInsertRowid);
}
async function actualizar(id, datos) {
  const actual = buscarPorId(id);
  const nuevo = { ...actual, ...datos };
  let categoria_id = actual.categoria_id;
  if (datos.categoria_id || datos.categoriaId || datos.categoria) categoria_id = resolverCategoriaId(datos);
  db.prepare("UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?").run(nuevo.nombre, nuevo.precio, nuevo.stock, categoria_id, id);
  return buscarPorId(id);
}
async function descontarStock(id, cantidad) {
  db.prepare("UPDATE productos SET stock = stock - ? WHERE id = ?").run(cantidad, id);
}
async function eliminar(id) {
  db.prepare("DELETE FROM productos WHERE id = ?").run(id);
  return true;
}
module.exports = { listar, buscarPorId, buscarPorNombre, crear, actualizar, descontarStock, eliminar };