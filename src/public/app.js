import { store } from "./js/store.js"
import { routes } from "./js/router.js"

import { headers } from "./js/components/headers.js";
import { footers } from "./js/components/footers.js";

axios.defaults.baseURL = 'http://localhost:3000';

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  components: {
    headers,
    footers
  },
  data(){
    return {
      title: "MyApp Vue =D"
    }
  }
});

app.use(store);

app.use(router);

app.mount("#app");
