import { categories } from "./categories.js"

export const InitializeDatabase = () => {
  categories.createTable()
}
