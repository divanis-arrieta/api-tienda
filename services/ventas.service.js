const db = require("../config/db");
const productosRepo = require("../repositories/productos.repository");
const ventasRepo = require("../repositories/ventas.repository");
const crearError = require("../utils/crearError");
 
function listar(usuario) {
  return usuario.rol === "admin"
    ? ventasRepo.listar()
    : ventasRepo.listarPorUsuario(usuario.id);
}
 
// Transacción: descontar el stock y guardar la venta pasan juntos o no pasa ninguno
const registrar = db.transaction(({ productoId, cantidad }, usuarioId) => {
  const producto = productosRepo.buscarPorId(productoId);
  if (!producto) {
    throw crearError("Producto no encontrado", 404);
  }
  if (producto.stock < cantidad) {
    throw crearError("No hay suficiente stock. Disponible: " + producto.stock, 409);
  }
 
  productosRepo.descontarStock(productoId, cantidad);
 
  return ventasRepo.crear({
    productoId,
    usuarioId,
    cantidad,
    total: producto.precio * cantidad
  });
});
 
module.exports = { listar, registrar };
