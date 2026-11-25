const { body } = require("express-validator");
 
const reglasRegistro = [
 body("nombre")
   .exists().withMessage("El nombre es obligatorio")
   .bail()
   .isString().withMessage("El nombre debe ser texto")
   .bail()
   .trim()
   .isLength({ min: 3, max: 60 })
   .withMessage("El nombre debe tener entre 3 y 60 caracteres")
   .escape(),
 
 body("correo")
   .exists().withMessage("El correo es obligatorio")
   .bail()
   .isEmail().withMessage("El correo no es válido")
   .normalizeEmail(),
 
 body("clave")
   .exists().withMessage("La contraseña es obligatoria")
   .bail()
   .isString()
   .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres")
   .matches(/\d/).withMessage("La contraseña debe tener al menos un número")
];
 
const reglasLogin = [
 body("correo")
   .exists().withMessage("El correo es obligatorio")
   .bail()
   .isEmail().withMessage("El correo no es válido")
   .normalizeEmail(),
 
 body("clave")
   .exists().withMessage("La contraseña es obligatoria")
   .bail()
   .isString()
];
 
module.exports = { reglasRegistro, reglasLogin };