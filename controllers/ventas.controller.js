const { matchedData } = require("express-validator");
const ventasService = require("../services/ventas.service");

function listar(req,res){
 res.json(ventasService.listar(req.usuario));
}

function registrar(req,res){
  // req.usuario lo puso verificarToken
  const datos = matchedData (req, {locations: ["body"]});
  res.status(201).json(ventasService.registrar(datos,req.usuario.id));
}

module.exports = { listar, registrar };
