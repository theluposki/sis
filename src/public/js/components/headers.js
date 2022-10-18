export const headers = {
  template: 
  `
  <header class="headers-main">
    <div class="action-router">
      <span>{{ $store.state.titlePage }}</span>
    </div>

    <router-link to="/" class="h__m-logo">
      <span>SiS</span>
      <i class="ai-command"></i>
    </router-link>
  </header>
  `,
  data() {
    return {
      
    } 
  },
  mounted() {
    
  },
  methods: {

  }
}
