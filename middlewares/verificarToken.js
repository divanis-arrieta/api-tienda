const jwt = require("jsonwebtoken");
 
function verificarToken(req, res, next) {
  const encabezado = req.headers.authorization || "";
  const [tipo, token] = encabezado.split(" ");
 
  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({
      mensaje: "Token requerido. Envía: Authorization: Bearer <token>"
    });
  }
 
  try {
    const datos = jwt.verify(token, process.env.JWT_SECRETO);
    req.usuario = { id: datos.id, rol: datos.rol };
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o vencido" });
  }
}
 
module.exports = verificarToken;
