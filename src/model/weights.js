import { openDb } from "../db/index.js";

export const weights = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
          CREATE TABLE IF NOT EXISTS weight (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Weight TEXT NOT NULL UNIQUE,
            create_at DATE DEFAULT (datetime('now','localtime'))
          );
           `);
    });
  },

  insert(weight) {
    try {
      openDb().then((db) => {
        return db.run("INSERT INTO weight (weight) VALUES (?);", [weight]);
      });
      return "Salvo com sucesso!"
    } catch {
      return "Erro ao registrar."
    }
  },
  async readAll() {
    try {
      return openDb().then((db) => {
        return db.all("SELECT * FROM weight;").then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db.get("SELECT * FROM weight WHERE id=?;", [id]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async update(id, weight) {
    try {
      openDb().then((db) => {
        db.run("UPDATE weight SET weight=? WHERE id=?", [weight,id]);
      });
      return "Atualizado com sucesso!"
    } catch {
      return "Erro ao Atualizar."
    }
  },
  async deleteOneByID(id) {
    try {
      openDb().then((db) => {
        return db.get("DELETE FROM weight WHERE id=?;", [id]).then(data => data);
      });
      return "Deletado com sucesso!"
    } catch {
      return "Erro ao deletar."
    }
  },
};
