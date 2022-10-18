import { openDb } from "../db/index.js";

export const products = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
      
          name TEXT NOT NULL,
          desc TEXT,
          purchase_price REAL NOT NULL,
          price REAL NOT NULL,
      
      
          category_id INTEGER,
          brand_id INTEGER,
          weight_id INTEGER,
      
          create_at DATE DEFAULT (datetime('now','localtime')),
      
          Foreign Key (category_id) REFERENCES category(id),
          Foreign Key (brand_id) REFERENCES brand(id),
          Foreign Key (weight_id) REFERENCES weight(id)
        );
           `);
    });
  },

  insert(body) {
    const { name, desc, purchasePrice, price, categoryId, brandId, weightId } = body
    try {
      openDb().then((db) => {
        return db.run(`
          INSERT INTO products 
          (name, desc, purchase_price, price, category_id, brand_id, weight_id) 
          VALUES (?,?,?,?,?,?,?);`, [
          name,
          desc,
          purchasePrice,
          price,
          categoryId,
          brandId,
          weightId
        ]);
      });
      return "Salvo com sucesso!"
    } catch {
      return "Erro ao registrar."
    }
  },
  async readAll() {
    try {
      return openDb().then((db) => {
        return db.all("SELECT * FROM products;").then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db.get("SELECT * FROM products WHERE id=?;", [id]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async update(id, body) {
    const { name, desc, purchasePrice, price, categoryId, brandId, weightId } = body
    try {
      openDb().then((db) => {
        db.run(`
          UPDATE products 
          SET name=?, desc=?, purchase_price=?, price=?, category_id=?, brand_id=?, weight_id=? 
          WHERE id=?`, 
          [
            name,
            desc,
            purchasePrice,
            price,
            categoryId,
            brandId,
            weightId,
            id
          ]);
      });
      return "Atualizado com sucesso!"
    } catch {
      return "Erro ao Atualizar."
    }
  },
  async deleteOneByID(id) {
    try {
      openDb().then((db) => {
        return db.get("DELETE FROM products WHERE id=?;", [id]).then(data => data);
      });
      return "Deletado com sucesso!"
    } catch {
      return "Erro ao deletar."
    }
  },
};
