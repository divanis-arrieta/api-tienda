require("dotenv").config({ quiet: true });
 
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
 
const registrarSolicitud = require("./middlewares/registrarSolicitud");
const manejarErrores = require("./middlewares/manejarErrores");
const authRoutes = require("./routes/auth.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const productosRoutes = require("./routes/productos.routes");
const ventasRoutes = require("./routes/ventas.routes");
 
const app = express();
 
// 1. Seguridad: encabezados HTTP y orígenes permitidos
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGEN || "*" }));
 
// 2. Lectura del cuerpo (máximo 10 kb) y registro de peticiones
app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV !== "test") {
 app.use(registrarSolicitud);
}
 
// 3. Rutas
app.get("/ping", (req, res) => {
 res.json({ mensaje: "pong" });
});
app.use("/auth", authRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/productos", productosRoutes);
app.use("/ventas", ventasRoutes);
 
// 4. Ruta no encontrada y manejo de errores, siempre al final
app.use((req, res) => {
 res.status(404).json({ mensaje: "Ruta no encontrada: " + req.originalUrl });
});
app.use(manejarErrores);
 
module.exports = app;