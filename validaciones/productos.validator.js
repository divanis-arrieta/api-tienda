const { body, param, query } = require("express-validator");
 
const reglasId = [
  param("id")
    .isInt({ min: 1 }).withMessage("El id debe ser un número entero mayor que cero")
    .toInt()
];
 
const reglasProducto = [
  body("nombre")
    .exists().withMessage("El nombre es obligatorio")
    .bail()
    .isString().withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage("El nombre debe tener entre 3 y 60 caracteres")
    .escape(),
 
  body("precio")
    .exists().withMessage("El precio es obligatorio")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número mayor que cero")
    .toFloat(),
 
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un entero mayor o igual a cero")
    .toInt(),
 
  body("categoriaId")
    .exists().withMessage("La categoría es obligatoria")
    .bail()
    .isInt({ min: 1 })
    .withMessage("categoriaId debe ser un número entero")
    .toInt()
];
 
const reglasFiltros = [
  query("pagina").optional()
    .isInt({ min: 1 }).withMessage("pagina debe ser un entero mayor que cero")
    .toInt(),
  query("limite").optional()
    .isInt({ min: 1, max: 50 }).withMessage("limite debe estar entre 1 y 50")
    .toInt(),
  query("min").optional()
    .isFloat({ min: 0 }).withMessage("min debe ser un número")
    .toFloat(),
  query("max").optional()
    .isFloat({ min: 0 }).withMessage("max debe ser un número")
    .toFloat(),
  query("categoria").optional()
    .trim()
    .toLowerCase(),
  query("buscar").optional()
    .trim()
    .isLength({ max: 40 }).withMessage("buscar admite máximo 40 caracteres")
];
 
module.exports = { reglasId, reglasProducto, reglasFiltros };
