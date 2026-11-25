const express = require("express");
const { listar, crear } = require("../controllers/categorias.controller");
const verificarToken = require("../middlewares/verificarToken");
const autorizar = require("../middlewares/autorizar");
const revisarValidacion = require("../middlewares/revisarValidacion");
const { reglasCategoria } = require("../validaciones/categorias.validator");
 
const router = express.Router();
 
router.get("/", listar);
router.post("/",
  verificarToken,
  autorizar("admin"),
  reglasCategoria,
  revisarValidacion,
  crear
);
 
module.exports = router;

