import { openDb } from "../db/index.js";
import { randomUUID } from "crypto";

export const block = {
  createTable() {
    openDb().then((db) => {
      db.exec(`
             CREATE TABLE IF NOT EXISTS block (
               id TEXT PRIMARY KEY,
               timestamp TEXT NOT NULL,
               last_hash TEXT NOT NULL,
               hash TEXT NOT NULL,
               data TEXT NOT NULL
             );
           `);
    });
  },

  async save(lastBlock, data) {
    const id = randomUUID();
    const timestamp = Date.now();
    const hash = "00000000000000000";
    const lastHash = lastBlock;

    const sql = `
      INSERT INTO block (id, timestamp, last_hash, hash, data)
      VALUES(?,?,?,?,?);
    `
    openDb().then((db) => {
      db.run(sql, [id, timestamp, hash, lastHash, data]);
    });
  },
};
