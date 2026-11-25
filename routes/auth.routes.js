const express = require("express");
const { registrar, login, perfil } = require("../controllers/auth.controller");
const verificarToken = require("../middlewares/verificarToken");
const limitarLogin = require("../middlewares/limitarLogin");
const revisarValidacion = require("../middlewares/revisarValidacion");
const { reglasRegistro, reglasLogin } = require("../validaciones/auth.validator");
 
const router = express.Router();
 
router.post("/registro", reglasRegistro, revisarValidacion, registrar);
router.post("/login", limitarLogin, reglasLogin, revisarValidacion, login);
router.get("/perfil", verificarToken, perfil);
 
module.exports = router;
