const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuariosRepo = require("../repositories/usuarios.repository");
const crearError = require("../utils/crearError");
 
function registrar({ nombre, correo, clave }) {
  if (usuariosRepo.buscarPorCorreoConClave(correo)) {
    throw crearError("Ya existe una cuenta con ese correo", 409);
  }
 
  // Nunca guardamos la contraseña: guardamos su hash
  const claveHash = bcrypt.hashSync(clave, 10);
 
  // El rol no se toma del cuerpo: todo usuario nuevo es "cliente"
  return usuariosRepo.crear({ nombre, correo, claveHash });
}
 
function login({ correo, clave }) {
  const usuario = usuariosRepo.buscarPorCorreoConClave(correo);
 
  // Mismo mensaje si falla el correo o la clave: no damos pistas
  if (!usuario || !bcrypt.compareSync(clave, usuario.clave_hash)) {
    throw crearError("Correo o contraseña incorrectos", 401);
  }
 
  const token = jwt.sign(
    { id: usuario.id, rol: usuario.rol },
    process.env.JWT_SECRETO,
    { expiresIn: process.env.JWT_EXPIRA || "2h" }
  );
 
  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
}
 
function perfil(id) {
  return usuariosRepo.buscarPorId(id);
}
 
module.exports = { registrar, login, perfil };
