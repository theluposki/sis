export const About = {
  name: "Informação",
  template: 
  `
  <div class="about">About</div>
  `,
  data() {
    return {
      namePage: "Informações"
    }
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage)
  },
  methods: {
    
  }
}
