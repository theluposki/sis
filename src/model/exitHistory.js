import { openDb } from "../db/index.js";

export const exitHistory = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
        CREATE TABLE IF NOT EXISTS exit_history (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
    
          inventory_id INTEGER NOT NULL,
          client_id INTEGER NOT NULL,
          qtd INTEGER NOT NULL,
        
          create_at DATE DEFAULT (datetime('now','localtime')),
    
          Foreign Key (inventory_id) REFERENCES inventory(id),
          Foreign Key (client_id) REFERENCES client(id)
        );
           `);
    });
  },

  insert(body) {
    const { inventoryId, clientId, qtd } = body
    try {
      openDb().then((db) => {
        return db.run(`
          INSERT INTO exit_history 
          (inventory_id, client_id, qtd) 
          VALUES (?,?,?);`, [
          inventoryId,
          clientId,
          qtd
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
        return db.all("SELECT * FROM exit_history;").then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readOneByID(id) {
    try {
      return openDb().then((db) => {
        return db.get("SELECT * FROM exit_history WHERE id=?;", [id]).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async readAllExits() {
    try {
      return openDb().then((db) => {
        return db.all(`
        SELECT p.name, c.name AS cliente, p.price, e.qtd, 
        (e.qtd * p.price) total
        FROM exit_history AS e 

        INNER JOIN inventory AS i
        ON e.inventory_id = i.id 

        INNER JOIN products AS p
        ON i.product_id = p.id

        INNER JOIN client AS c
        ON e.client_id = c.id;
        `).then(data => data);
      });
    } catch {
      return "Erro na busca"
    }
  },
  async update(id, body) {
    const { inventoryId, clientId, qtd } = body

    try {
      openDb().then((db) => {
        db.run(`
          UPDATE exit_history 
          SET inventory_id=?, client_id=?, qtd=?  
          WHERE id=?`, 
          [
            inventoryId,
            clientId,
            qtd,
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
        return db.get("DELETE FROM exit_history WHERE id=?;", [id]).then(data => data);
      });
      return "Deletado com sucesso!"
    } catch {
      return "Erro ao deletar."
    }
  },
};
