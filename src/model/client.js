import { openDb } from "../db/index.js";

export const clients = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS client (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          situation TEXT, 
          create_at DATE DEFAULT (datetime('now','localtime'))
        );
           `);
    });
  },

  async count() {
    try {
      return openDb().then((db) => {
        return db.get("SELECT COUNT(*) FROM client;")
                  .then(data => data["COUNT(*)"]);
      });
    } catch {
      return "Erro na busca"
    }
  },

  insert(body) {
    const { name, situation } = body
    try {
      openDb().then((db) => {
        return db.run(`
          INSERT INTO client 
          (name, situation) 
          VALUES (?,?);`, [
          name,
          situation
        ]);
      });
      return "Salvo com sucesso!"
    } catch {
      return "Erro ao registrar."
    }
  },

  async readAllByName(name) {
    try {
      return openDb().then((db) => {
        return db.all(`
            SELECT * FROM client AS c WHERE c.name LIKE ?;
        `,[name+"%"]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },


  async readAll() {
    try {
      return openDb().then((db) => {
        return db.all("SELECT * FROM client;").then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db.get("SELECT * FROM client WHERE id=?;", [id]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async update(id, body) {
    const { name, situation } = body

    try {
      openDb().then((db) => {
        db.run(`
          UPDATE client 
          SET name=?, situation=?  
          WHERE id=?`, 
          [
            name,
            situation,
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
        return db.get("DELETE FROM client WHERE id=?;", [id]).then(data => data);
      });
      return "Deletado com sucesso!"
    } catch {
      return "Erro ao deletar."
    }
  },
};
