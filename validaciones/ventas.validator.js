const { body } = require("express-validator");
 
const reglasVenta = [
  body("productoId")
    .exists().withMessage("productoId es obligatorio")
    .bail()
    .isInt({ min: 1 }).withMessage("productoId debe ser un número entero")
    .toInt(),
 
  body("cantidad")
    .exists().withMessage("La cantidad es obligatoria")
    .bail()
    .isInt({ min: 1, max: 100 }).withMessage("La cantidad debe ser un entero entre 1 y 100")
    .toInt()
];
 
module.exports = { reglasVenta };
