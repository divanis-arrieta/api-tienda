// Crea un error con el código HTTP que debe responder la API
function crearError(mensaje, estado) {
  const error = new Error(mensaje);
  error.estado = estado;
  return error;
}

module.exports = crearError;