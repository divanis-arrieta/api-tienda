const { test } = require("node:test");
const assert = require("node:assert");
const { request, app, iniciarSesion } = require("./preparar");
 
test("El registro crea un cliente aunque envíen rol admin", async () => {
  const res = await request(app)
    .post("/auth/registro")
    .send({
      nombre: "Ana Pérez",
      correo: "ana@correo.com",
      clave: "clave1234",
      rol: "admin"
    });
 
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.rol, "cliente");
  assert.strictEqual(res.body.clave_hash, undefined);
});
 
test("Login con contraseña incorrecta responde 401", async () => {
  const res = await request(app)
    .post("/auth/login")
    .send({ correo: "ana@correo.com", clave: "otra1234" });
  assert.strictEqual(res.status, 401);
});
 
test("Un cliente no puede crear productos: 403", async () => {
  const token = await iniciarSesion("ana@correo.com", "clave1234");
  const res = await request(app)
    .post("/productos")
    .set("Authorization", "Bearer " + token)
    .send({ nombre: "Parlante", precio: 90000, categoriaId: 1 });
 
  assert.strictEqual(res.status, 403);
});
 
test("Una venta descuenta el stock", async () => {
  const token = await iniciarSesion("ana@correo.com", "clave1234");
  const antes = (await request(app).get("/productos/1")).body.stock;
 
  const res = await request(app)
    .post("/ventas")
    .set("Authorization", "Bearer " + token)
    .send({ productoId: 1, cantidad: 2 });
 
  const despues = (await request(app).get("/productos/1")).body.stock;
  assert.strictEqual(res.status, 201);
  assert.strictEqual(despues, antes - 2);
});
 
test("Una venta sin stock suficiente responde 409 y no cambia el stock", async () => {
  const token = await iniciarSesion("ana@correo.com", "clave1234");
  const antes = (await request(app).get("/productos/2")).body.stock;
 
  const res = await request(app)
    .post("/ventas")
    .set("Authorization", "Bearer " + token)
    .send({ productoId: 2, cantidad: 99 });
 
  const despues = (await request(app).get("/productos/2")).body.stock;
  assert.strictEqual(res.status, 409);
  assert.strictEqual(despues, antes);
});
