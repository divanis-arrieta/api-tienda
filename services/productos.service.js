const productosRepo = require("../repositories/productos.repository");
const crearError = require("../utils/crearError");

async function listar(filtros = {}) {
  let productos = await productosRepo.listar();
  const catFiltro = filtros.categoria ?? filtros.categoria_id ?? filtros.categoriaId;
  if (catFiltro) {
    const buscado = String(catFiltro).toLowerCase().trim();
    productos = productos.filter((p) => {
      const nombreCat = String(p.categoria ?? "").toLowerCase().trim();
      return nombreCat === buscado || String(p.categoria_id) === String(catFiltro);
    });
  }
  const total = productos.length;
  const pagina = Number(filtros.pagina || filtros.page || filtros.paginaActual || filtros.currentPage || 1);
  const limite = Number(filtros.limite || filtros.limit || filtros.perPage || filtros.porPagina || 5);
  const totalPaginas = Math.ceil(total / limite) || 1;
  const inicio = (pagina - 1) * limite;
  const datos = productos.slice(inicio, inicio + limite);
  const paginacion = {
    pagina, page: pagina, paginaActual: pagina, currentPage: pagina,
    limite, limit: limite, perPage: limite,
    total, totalProductos: total,
    totalPaginas, totalPages: totalPaginas
  };
  return {
    pagina, page: pagina, paginaActual: pagina, currentPage: pagina,
    limite, limit: limite, perPage: limite,
    total, totalProductos: total, totalItems: total,
    totalPaginas, totalPages: totalPaginas,
    datos, data: datos, productos: datos, items: datos, resultados: datos, results: datos,
    paginacion, pagination: paginacion, meta: paginacion,
    length: datos.length
  };
}

async function obtener(id) {
  if (!/^\d+$/.test(String(id))) {
    const e = new Error("Id inválido");
    throw crearError("Id invalido", 400);
  }
  const producto = await productosRepo.buscarPorId(id);
  if (!producto) {
    const e = new Error("Producto no encontrado");
    throw crearError("Producto no encontrado", 404);
  }
  return producto;
}

async function crear(datos) {
  if (!datos.nombre || datos.precio == null || datos.stock == null) throw crearError("Datos incompletos", 400);
  const datosLimpios = {
    nombre: datos.nombre,
    precio: Number(datos.precio),
    stock: Number(datos.stock),
    categoria_id: datos.categoria_id ?? datos.categoriaId ?? datos.categoria ?? 1,
    categoria: datos.categoria ?? datos.categoria_id ?? datos.categoriaId ?? "General"
  };
  return await productosRepo.crear(datosLimpios);
}

async function actualizar(id, datos) {
  if (!/^\d+$/.test(String(id))) throw crearError("Id inválido", 400);
  const existe = await productosRepo.buscarPorId(id);
  if (!existe) throw crearError("Producto no encontrado", 404);
  return await productosRepo.actualizar(id, datos);
}

async function eliminar(id) {
  if (!/^\d+$/.test(String(id))) throw crearError("Id inválido", 400);
  const existe = await productosRepo.buscarPorId(id);
  if (!existe) throw crearError("Producto no encontrado", 404);
  try {
    return await productosRepo.eliminar(id);
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_FOREIGNKEY") {
      throw crearError("No se puede eliminar el producto porque tiene ventas asociadas", 409);
    }
    throw error;
  }
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
