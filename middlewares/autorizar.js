// Uso: autorizar("admin") o autorizar("admin", "cliente")
function autorizar(...rolesPermitidos) {
  return function (req, res, next) {
    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: "No tienes permiso para hacer esto" });
    }
    next();
  };
}
 
module.exports = autorizar;
