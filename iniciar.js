const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
 
function crearTablas(db) {
  const esquema = fs.readFileSync(path.join(__dirname, "esquema.sql"), "utf8");
  db.exec(esquema);

  // Migra bases creadas antes de que las ventas guardaran su usuario.
  // La columna queda nullable para conservar ventas históricas sin dueño conocido.
  const columnasVentas = db.prepare("PRAGMA table_info(ventas)").all();
  if (!columnasVentas.some((columna) => columna.name === "usuario_id")) {
    db.exec("ALTER TABLE ventas ADD COLUMN usuario_id INTEGER REFERENCES usuarios(id)");
  }
}
 
function cargarDatosIniciales(db) {
  const { categorias } = db.prepare("SELECT COUNT(*) AS categorias FROM categorias").get();
 
  if (categorias === 0) {
    const insertarCategoria = db.prepare("INSERT INTO categorias (nombre) VALUES (?)");
    const insertarProducto = db.prepare(
      "INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)"
    );
 
    const cargar = db.transaction(() => {
      const tecnologia = insertarCategoria.run("tecnologia").lastInsertRowid;
      const oficina = insertarCategoria.run("oficina").lastInsertRowid;
      const hogar = insertarCategoria.run("hogar").lastInsertRowid;
 
      insertarProducto.run("Teclado mecánico", 180000, 12, tecnologia);
      insertarProducto.run("Monitor 24 pulgadas", 750000, 5, tecnologia);
      insertarProducto.run("Mouse inalámbrico", 45000, 30, tecnologia);
      insertarProducto.run("Audífonos con micrófono", 95000, 15, tecnologia);
      insertarProducto.run("Silla ergonómica", 620000, 4, oficina);
      insertarProducto.run("Escritorio en L", 480000, 3, oficina);
      insertarProducto.run("Lámpara de escritorio", 65000, 20, oficina);
      insertarProducto.run("Cafetera", 210000, 8, hogar);
      insertarProducto.run("Licuadora", 160000, 10, hogar);
      insertarProducto.run("Ventilador de pie", 135000, 0, hogar);
    });
 
    cargar();
  }
 
  const { usuarios } = db.prepare("SELECT COUNT(*) AS usuarios FROM usuarios").get();
 
  if (usuarios === 0) {
    db.prepare("INSERT INTO usuarios (nombre, correo, clave_hash, rol) VALUES (?, ?, ?, ?)")
      .run("Administrador", "admin@tienda.com", bcrypt.hashSync("Admin123*", 10), "admin");
  }
}
 
module.exports = { crearTablas, cargarDatosIniciales };
