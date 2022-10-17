import { openDb } from "../db/index.js";

export const categories = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS category (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT NOT NULL UNIQUE,
          create_at DATE DEFAULT (datetime('now','localtime'))
        );
           `);
    });
  },

  insert(category) {
    try {
      openDb().then((db) => {
        return db.run("INSERT INTO category (category) VALUES (?);", [category]);
      });
      return "Salvo com sucesso!"
    } catch {
      return "Erro ao registrar."
    }
  },
  async readAll() {
    try {
      return openDb().then((db) => {
        return db.all("SELECT * FROM category;").then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db.get("SELECT * FROM category WHERE id=?;", [id]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async update(id, category) {
    try {
      openDb().then((db) => {
        db.run("UPDATE category SET category=? WHERE id=?", [category,id]);
      });
      return "Atualizado com sucesso!"
    } catch {
      return "Erro ao Atualizar."
    }
  },
  async deleteOneByID(id) {
    try {
      openDb().then((db) => {
        return db.get("DELETE FROM category WHERE id=?;", [id]).then(data => data);
      });
      return "Deletado com sucesso!"
    } catch {
      return "Erro ao deletar."
    }
  },
};
