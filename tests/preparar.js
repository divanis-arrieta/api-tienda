// Se carga antes que la app: base de datos en memoria y valores de prueba
process.env.NODE_ENV = "test";
process.env.DB_ARCHIVO = ":memory:";
process.env.JWT_SECRETO = "secreto-solo-para-pruebas";
process.env.LIMITE_LOGIN = "100";
 
const request = require("supertest");
const app = require("../app");
 
async function iniciarSesion(correo, clave) {
 const respuesta = await request(app).post("/auth/login").send({ correo, clave });
 return respuesta.body.token;
}
 
module.exports = { request, app, iniciarSesion };