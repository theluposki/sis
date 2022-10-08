import { openDb } from "../db/index.js";
import { randomUUID } from "crypto";

export const products = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
             CREATE TABLE IF NOT EXISTS products (
               id TEXT PRIMARY KEY,
               name TEXT NOT NULL,
               description TEXT,
               price REAL NOT NULL,
               purchase_price REAL NOT NULL,
               amount INTEGER NOT NULL,
               timestamp TEXT NOT NULL
             );
           `);
    });
  },

  async insert(data) {
    const id = randomUUID();
    const timestamp = Date.now();

    const { name, description, price, purchasePrice, amount } = data;

    const sql = `
      INSERT INTO products (id, name, description, price, purchase_price, amount, timestamp)
      VALUES(?,?,?,?,?,?,?);
    `;
    openDb().then((db) => {
      db.run(sql, [
        id,
        name,
        description,
        price,
        purchasePrice,
        amount,
        timestamp
      ]);
    });
  },
  async readAll(data) {
    const sql = `SELECT * FROM products;`;
    return openDb().then((db) => {
      return db.all(sql).then(data => data);
    });
  },
  async update(id, data) {
    const { name, description, price, purchasePrice, amount } = data;

    const sql = `
      UPDATE products SET name=?, description=?, price=?, purchase_price=?, amount=? WHERE id=?
    `;
    openDb().then((db) => {
      db.run(sql, [
        name,
        description,
        price,
        purchasePrice,
        amount,
        id
      ]);
    });
  },
};
