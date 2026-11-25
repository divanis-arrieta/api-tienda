const express = require("express");
const { listar, registrar } = require("../controllers/ventas.controller");
const verificarToken = require("../middlewares/verificarToken");
const autorizar = require("../middlewares/autorizar");
const revisarValidacion = require("../middlewares/revisarValidacion");
const { reglasVenta } = require("../validaciones/ventas.validator");
 
const router = express.Router();
 
// Todas las rutas de ventas necesitan sesión iniciada
router.use(verificarToken);
 
router.get("/", autorizar("admin"), listar);
router.post("/", reglasVenta, revisarValidacion, registrar);
 
module.exports = router;

