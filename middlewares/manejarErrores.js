function manejarErrores(err, req, res, next) {
  // El cliente envió un JSON mal escrito
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ mensaje: "El JSON enviado no es válido" });
  }
 
  const estado = err.estado || err.status || err.statusCode || 500;
 
  // El detalle del error solo se ve en la consola del servidor, nunca en la respuesta
  if (estado === 500) {
    console.error("[ERROR]", err);
  }
 
  res.status(estado).json({
    mensaje: estado === 500 ? "Ha ocurrido un error interno" : err.message
  });
}
 
module.exports = manejarErrores;
