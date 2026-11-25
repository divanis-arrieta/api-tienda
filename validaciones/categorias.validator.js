const { body } = require("express-validator");
 
const reglasCategoria = [
  body("nombre")
    .exists().withMessage("El nombre es obligatorio")
    .bail()
    .isString().withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre debe tener entre 3 y 30 caracteres")
    .escape()
];
 
module.exports = { reglasCategoria };
