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
        return db.all(`
            SELECT p.id, p.name, p.desc, p.purchase_price, p.price, c.category, b.brand, w.Weight, p.create_at
            FROM products AS p
            
            INNER JOIN category AS c
            ON c.id = p.category_id
            
            INNER JOIN brand AS b
            ON b.id = p.brand_id
            
            INNER JOIN weight AS w
            ON w.id = p.weight_id;
        `).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async count() {
    try {
      return openDb().then((db) => {
        return db.get("SELECT COUNT(*) FROM products;")
                  .then(data => data["COUNT(*)"]);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readAllByName(name) {
    try {
      return openDb().then((db) => {
        return db.all(`
          SELECT p.id, p.name, p.desc, p.purchase_price, p.price, c.category, b.brand, w.Weight, p.create_at
          FROM products AS p
          
          INNER JOIN category AS c
          ON c.id = p.category_id
          
          INNER JOIN brand AS b
          ON b.id = p.brand_id
          
          INNER JOIN weight AS w
          ON w.id = p.weight_id
          WHERE p.name LIKE ?;
        `,[name+"%"]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readAllByData(data) {
    try {
      return openDb().then((db) => {
        return db.all(`
          SELECT p.id, p.name, p.desc, p.purchase_price, p.price, c.category, b.brand, w.Weight, p.create_at
          FROM products AS p
          
          INNER JOIN category AS c
          ON c.id = p.category_id
          
          INNER JOIN brand AS b
          ON b.id = p.brand_id
          
          INNER JOIN weight AS w
          ON w.id = p.weight_id
          WHERE p.create_at LIKE ?;
        `,["%"+data+"%"]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readAllByPrice(price) {
    try {
      return openDb().then((db) => {
        return db.all(`
          SELECT p.id, p.name, p.desc, p.purchase_price, p.price, c.category, b.brand, w.Weight, p.create_at
          FROM products AS p
          
          INNER JOIN category AS c
          ON c.id = p.category_id
          
          INNER JOIN brand AS b
          ON b.id = p.brand_id
          
          INNER JOIN weight AS w
          ON w.id = p.weight_id
          WHERE p.price LIKE ?;
        `,["%"+price+"%"]).then(data => data);
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
