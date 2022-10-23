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
