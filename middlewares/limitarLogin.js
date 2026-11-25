const { rateLimit } = require("express-rate-limit");
 
// Máximo de intentos fallidos por IP en 15 minutos.
// Frena a quien intenta adivinar contraseñas.
const limitarLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: Number(process.env.LIMITE_LOGIN) || 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { mensaje: "Demasiados intentos. Espera 15 minutos e inténtalo de nuevo." }
});
 
module.exports = limitarLogin;