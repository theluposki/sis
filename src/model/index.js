import { products } from "./product.js"

export const InitializeDatabase = () => {
  products.createTable()
}
