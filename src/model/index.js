import { categories } from "./categories.js"
import { brands } from "./brands.js"
import { weights } from "./weights.js"
import { products } from "./products.js"
import { inventory } from "./inventory.js"
import { clients } from "./client.js"
import { exitHistory } from "./exitHistory.js"

export const InitializeDatabase = () => {
  categories.createTable()
  brands.createTable()
  weights.createTable()
  products.createTable()
  inventory.createTable()
  clients.createTable()
  exitHistory.createTable()
}
