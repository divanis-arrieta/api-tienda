CREATE TABLE IF NOT EXISTS categorias (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE
);
 
CREATE TABLE IF NOT EXISTS productos (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre       TEXT    NOT NULL UNIQUE,
  precio       REAL    NOT NULL CHECK (precio > 0),
  stock        INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  categoria_id INTEGER NOT NULL REFERENCES categorias (id)
);
 
CREATE TABLE IF NOT EXISTS usuarios (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre     TEXT NOT NULL,
  correo     TEXT NOT NULL UNIQUE,
  clave_hash TEXT NOT NULL,
  rol        TEXT NOT NULL DEFAULT 'cliente' CHECK (rol IN ('cliente', 'admin'))
);
 
CREATE TABLE IF NOT EXISTS ventas (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  producto_id INTEGER NOT NULL REFERENCES productos (id),
  usuario_id  INTEGER NOT NULL REFERENCES usuarios (id),
  cantidad    INTEGER NOT NULL CHECK (cantidad > 0),
  total       REAL    NOT NULL,
  fecha       TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
);
