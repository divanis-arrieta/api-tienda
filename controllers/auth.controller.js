const { matchedData } = require("express-validator");
const authService = require("../services/auth.service");
 
// matchedData descarta campos que nadie pidió, como un "rol": "admin" colado en el cuerpo
function registrar(req, res) {
  res.status(201).json(authService.registrar(matchedData(req, { locations: ["body"] })));
}
 
function login(req, res) {
  res.json(authService.login(matchedData(req, { locations: ["body"] })));
}
 
function perfil(req, res) {
  res.json(authService.perfil(req.usuario.id));
}
 
module.exports = { registrar, login, perfil };
