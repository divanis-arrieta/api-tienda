function validarProducto(req, res, next) {
  const { nombre, precio, categoriaId } = req.body;
 
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  }
 
  if (precio === undefined || isNaN(Number(precio)) || Number(precio) <= 0) {
    return res.status(400).json({
      mensaje: "El precio debe ser un número mayor que cero"
    });
  }
  if (!categoriaId) {
    return res.status(400).json({ mensaje: "La categoría es obligatoria" });
  }
 
  next();
}
 
module.exports = validarProducto;
