export const Home = {
  name: "Início",
  template: 
  `
  <div class="home">
    <div class="container-boxs">

    
    <router-link to="/" tabindex="1" class="c__box">
      <h4>Saidas</h4>
      <i class="ai-arrow-up-thick"></i>
    </router-link>

    <router-link to="/" tabindex="2" class="c__box">
      <h4>Entradas</h4>
      <i class="ai-arrow-down-thick"></i>
    </router-link>
    
    <router-link to="/products" tabindex="3" class="c__box">
      <h4>Produtos</h4>
      <i class="ai-grid"></i>
    </router-link>

    <router-link to="/categories" tabindex="4" class="c__box">
      <h4>Categorias</h4>
      <i class="ai-flag"></i>
    </router-link>


    <router-link to="/brands" tabindex="5" class="c__box">
      <h4>Marcas</h4>
      <i class="ai-leaf"></i>
    </router-link>

    <router-link to="/weights" tabindex="6" class="c__box">
      <h4>Unidades</h4>
      <i class="ai-shipping-box-v1"></i>
    </router-link>

    <router-link to="/client" tabindex="7" class="c__box">
      <h4>Clientes</h4>
      <i class="ai-people-group"></i>
    </router-link>

    <router-link to="/inventory" tabindex="8" class="c__box">
      <h4>Estoque</h4>
      <i class="ai-book-open"></i>
    </router-link>

    </div>
  </div>
  `,
  data() {
    return {
      namePage: "Início"
    }
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage)
  },
  methods: {
    
  }
}
