import { openDb } from "../db/index.js";

export const inventory = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS inventory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
    
          product_id INTEGER UNIQUE,
          qtd INTEGER NOT NULL,
    
          create_at DATE DEFAULT (datetime('now','localtime')),
    
          Foreign Key (product_id) REFERENCES products(id)
        );
           `);
    });
  },

  async count() {
    try {
      return openDb().then((db) => {
        return db
          .get("SELECT COUNT(*) FROM inventory;")
          .then((data) => data["COUNT(*)"]);
      });
    } catch {
      return "Erro na busca";
    }
  },

  insert(body) {
    const { productId, qtd } = body;
    try {
      openDb().then((db) => {
        return db.run(
          `
          INSERT INTO inventory 
          (product_id, qtd) 
          VALUES (?,?);`,
          [productId, qtd]
        );
      });
      return "Salvo com sucesso!";
    } catch {
      return "Erro ao registrar.";
    }
  },
  async readAll() {
    try {
      return openDb().then((db) => {
        return db.all("SELECT * FROM inventory;").then((data) => data);
      });
    } catch {
      return "Erro na busca";
    }
  },
  async readAllByNamesLike(name) {
    try {
      return openDb().then((db) => {
        return db
          .all(
            `
          SELECT i.id, p.name, i.qtd, i.create_at, i.product_id 
          FROM inventory AS i 
          INNER JOIN products AS p ON i.product_id = p.id
          WHERE p.name LIKE ?;
        `,
            [name + "%"]
          )
          .then((data) => data);
      });
    } catch {
      return "Erro na busca";
    }
  },
  async readAllByNames() {
    try {
      return openDb().then((db) => {
        return db
          .all(
            `
          SELECT i.id, p.name, i.qtd, i.create_at, i.product_id 
          FROM inventory AS i 
          INNER JOIN products AS p ON i.product_id = p.id;
        `
          )
          .then((data) => data);
      });
    } catch {
      return "Erro na busca";
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db
          .get("SELECT * FROM inventory WHERE id=?;", [id])
          .then((data) => data);
      });
    } catch {
      return "Erro na busca";
    }
  },
  async readOneByIDNames(id) {
    try {
      return openDb().then((db) => {
        return db
          .get(
            `
          SELECT i.id, p.name, i.qtd, i.create_at, i.product_id 
          FROM inventory AS i 
          INNER JOIN products AS p ON i.product_id = p.id
          WHERE i.id=?;
        `,
            [id]
          )
          .then((data) => data);
      });
    } catch {
      return "Erro na busca";
    }
  },
  async update(id, body) {
    const { productId, qtd } = body;

    try {
      openDb().then((db) => {
        db.run(
          `
          UPDATE inventory 
          SET product_id=?, qtd=?  
          WHERE id=?`,
          [productId, qtd, id]
        );
      });
      return "Atualizado com sucesso!";
    } catch {
      return "Erro ao Atualizar.";
    }
  },
  async increment(id) {
    try {
      openDb().then((db) => {
        db.run(
          `
        UPDATE inventory
        SET qtd = qtd + 1
        WHERE id=?;`,
          [id]
        );
      });
      return "Incrementado com sucesso!";
    } catch {
      return "Erro ao Atualizar.";
    }
  },
  async decrement(id) {
    try {
      openDb().then((db) => {
        db.run(
          `
        UPDATE inventory
        SET qtd = qtd - 1
        WHERE id=?;`,
          [id]
        );
      });
      return "Decrementado com sucesso!";
    } catch {
      return "Erro ao Atualizar.";
    }
  },
  async deleteOneByID(id) {
    try {
      openDb().then((db) => {
        return db
          .get("DELETE FROM inventory WHERE id=?;", [id])
          .then((data) => data);
      });
      return "Deletado com sucesso!";
    } catch {
      return "Erro ao deletar.";
    }
  },
};
