const express = require("express");
const {
  listar, obtener, crear, actualizar, eliminar
} = require("../controllers/productos.controller");
const verificarToken = require("../middlewares/verificarToken");
const autorizar = require("../middlewares/autorizar");
const revisarValidacion = require("../middlewares/revisarValidacion");
const {
  reglasId, reglasProducto, reglasFiltros
} = require("../validaciones/productos.validator");
 
const router = express.Router();
 
// Públicas: cualquiera puede ver el catálogo
router.get("/", reglasFiltros, revisarValidacion, listar);
router.get("/:id", reglasId, revisarValidacion, obtener);
 
// Solo el administrador modifica el catálogo
router.post("/",
  verificarToken,
  autorizar("admin"),
  reglasProducto,
  revisarValidacion,
  crear
);
router.put("/:id",
  verificarToken,
  autorizar("admin"),
  reglasId,
  reglasProducto,
  revisarValidacion,
  actualizar
);
router.delete("/:id",
  verificarToken,
  autorizar("admin"),
  reglasId,
  revisarValidacion,
  eliminar
);
 
module.exports = router;

