const { matchedData } = require("express-validator");
const categoriasService = require("../services/categorias.service");
 
function listar(req, res) {
  res.json(categoriasService.listar());
}
 
function crear(req, res) {
  res.status(201).json(categoriasService.crear(matchedData(req, { locations: ["body"] })));
}
 
module.exports = { listar, crear };
