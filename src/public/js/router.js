import { Home } from "./views/Home.js"
import { About } from "./views/About.js"
import { Products } from "./views/Products.js";

export const routes = [
  { path: "/", name: "Início", component: Home},
  { path: "/about", name: "Informação", component: About},
  { path: "/products", name: "Produtos", component: Products},
];
