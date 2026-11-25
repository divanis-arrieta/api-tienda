const categoriasRepo = require("../repositories/categorias.repository");
const crearError = require("../utils/crearError");
 
function listar() {
  return categoriasRepo.listar();
}
 
function crear({ nombre }) {
  if (categoriasRepo.buscarPorNombre(nombre)) {
    throw crearError("Ya existe una categoría con ese nombre", 409);
  }
  return categoriasRepo.crear(nombre);
}
 
module.exports = { listar, crear };
