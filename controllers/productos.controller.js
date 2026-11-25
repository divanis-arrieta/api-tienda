const { matchedData } = require("express-validator");
const productosService = require("../services/productos.service");

async function listar(req, res, next) {
  try {
    const datos = matchedData(req, { locations: ["query"] });
    const filtros = Object.keys(datos).length ? datos : req.query;
    const resultado = await productosService.listar(filtros);
    res.json(resultado);
  } catch (e) { next(e); }
}

async function obtener(req, res, next) {
  try {
    const id = req.params.id;
    if (!/^\d+$/.test(String(id))) {
      return res.status(400).json({ error: "Id inválido" });
    }
    const datos = matchedData(req, { locations: ["params"] });
    const producto = await productosService.obtener(datos.id ?? id);
    res.json(producto);
  } catch (e) { next(e); }
}

async function crear(req, res, next) {
  try {
    const datos = matchedData(req, { locations: ["body"] });
    // Si matchedData viene vacío porque el validador no tiene los campos, usa el body directo
    const body = Object.keys(datos).length ? datos : req.body;
    const producto = await productosService.crear(body);
    res.status(201).json(producto);
  } catch (e) { next(e); }
}

async function actualizar(req, res, next) {
  try {
    const id = req.params.id;
    const datos = matchedData(req, { locations: ["body"] });
    const body = Object.keys(datos).length ? datos : req.body;
    const producto = await productosService.actualizar(id, body);
    res.json(producto);
  } catch (e) { next(e); }
}

async function eliminar(req, res, next) {
  try {
    const id = req.params.id;
    await productosService.eliminar(id);
    res.status(204).end();
  } catch (e) { next(e); }
}
module.exports = { listar, obtener, crear, actualizar, eliminar };
