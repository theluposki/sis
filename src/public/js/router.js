import { Home } from "./views/Home.js"
import { About } from "./views/About.js"
import { Products } from "./views/Products.js";
import { Category } from "./views/Category.js";
import { Brand } from "./views/Brand.js";
import { Weight } from "./views/Weight.js";

export const routes = [
  { path: "/", name: "Início", component: Home},
  { path: "/about", name: "Informação", component: About},
  { path: "/products", name: "Produtos", component: Products},
  { path: "/categories", name: "Categorias", component: Category},
  { path: "/brands", name: "Marcas", component: Brand},
  { path: "/weights", name: "Unidades", component: Weight}
];
