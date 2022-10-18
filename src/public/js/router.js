import { Home } from "./views/Home.js"
import { About } from "./views/About.js"

export const routes = [
  { path: "/", name: "Início", component: Home},
  { path: "/about", name: "Informação", component: About},
];
