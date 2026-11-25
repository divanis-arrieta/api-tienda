const { test } = require("node:test");
const assert = require("node:assert");
const { request, app, iniciarSesion } = require("./preparar");
 
test("GET /productos responde la primera página con 5 productos", async () => {
  const res = await request(app).get("/productos");
 
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.pagina, 1);
  assert.strictEqual(res.body.datos.length, 5);
  assert.strictEqual(res.body.total, 10);
});
 
test("GET /productos filtra por categoría", async () => {
  const res = await request(app).get("/productos?categoria=hogar");
 
  assert.strictEqual(res.status, 200);
  assert.ok(res.body.datos.every(p => p.categoria === "hogar"));
});
 
test("GET /productos/abc responde 400", async () => {
  const res = await request(app).get("/productos/abc");
  assert.strictEqual(res.status, 400);
});
 
test("GET /productos/999 responde 404", async () => {
  const res = await request(app).get("/productos/999");
  assert.strictEqual(res.status, 404);
});
 
test("POST /productos sin token responde 401", async () => {
  const res = await request(app)
    .post("/productos")
    .send({ nombre: "Parlante", precio: 90000, categoriaId: 1 });
  assert.strictEqual(res.status, 401);
});
 
test("POST /productos con datos inválidos responde 400 con los errores", async () => {
  const token = await iniciarSesion("admin@tienda.com", "Admin123*");
  const res = await request(app)
    .post("/productos")
    .set("Authorization", "Bearer " + token)
    .send({ nombre: 123, precio: "abc" });
 
  assert.strictEqual(res.status, 400);
  assert.ok(res.body.errores.length >= 2);
});
 
test("El administrador crea un producto y responde 201", async () => {
  const token = await iniciarSesion("admin@tienda.com", "Admin123*");
  const res = await request(app)
    .post("/productos")
    .set("Authorization", "Bearer " + token)
    .send({ nombre: "Parlante bluetooth", precio: 90000, stock: 7, categoriaId: 1 });
 
  assert.strictEqual(res.status, 201);
  assert.strictEqual(res.body.nombre, "Parlante bluetooth");
  assert.strictEqual(res.body.stock, 7);
});
