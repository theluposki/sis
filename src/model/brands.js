import { openDb } from "../db/index.js";

export const brands = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS brand (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          brand TEXT NOT NULL UNIQUE,
          create_at DATE DEFAULT (datetime('now','localtime'))
        );
           `);
    });
  },

  async count() {
    try {
      return openDb().then((db) => {
        return db.get("SELECT COUNT(*) FROM brand;")
                  .then(data => data["COUNT(*)"]);
      });
    } catch {
      return "Erro na busca"
    }
  },

  insert(brand) {
    try {
      openDb().then((db) => {
        return db.run("INSERT INTO brand (brand) VALUES (?);", [brand]);
      });
      return "Salvo com sucesso!"
    } catch {
      return "Erro ao registrar."
    }
  },

  async readAllByBrand(brand) {
    try {
      return openDb().then((db) => {
        return db.all(`
            SELECT * FROM brand AS b WHERE b.brand LIKE ?;
        `,[brand+"%"]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },

  async readAll() {
    try {
      return openDb().then((db) => {
        return db.all("SELECT * FROM brand;").then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db.get("SELECT * FROM brand WHERE id=?;", [id]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async update(id, brand) {
    try {
      openDb().then((db) => {
        db.run("UPDATE brand SET brand=? WHERE id=?", [brand,id]);
      });
      return "Atualizado com sucesso!"
    } catch {
      return "Erro ao Atualizar."
    }
  },
  async deleteOneByID(id) {
    try {
      openDb().then((db) => {
        return db.get("DELETE FROM brand WHERE id=?;", [id]).then(data => data);
      });
      return "Deletado com sucesso!"
    } catch {
      return "Erro ao deletar."
    }
  },
};
