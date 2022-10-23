//import { axios } from "../axios/index.js"

export const Products = {
  name: "Produtos",
  template: 
  `
  <div class="products">
    <div class="prod_headers">
      HEADERS PRODUCTS
    </div>

    <table class="table_products">

      <thead>
        <tr>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço de compra</th>
          <th>Preço</th>
          <th>Categoria</th>
          <th>Marca</th>
          <th>Unidade</th>
          <th>Data de Criação</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="prod in products" :key="prod.id">
          <td>{{prod.name}}</td>
          <td>{{prod.desc}}</td>
          <td>{{prod.purchase_price}}</td>
          <td>{{prod.price}}</td>
          <td>{{prod.category_id}}</td>
          <td>{{prod.brand_id}}</td>
          <td>{{prod.weight_id}}</td>
          <td>{{prod.create_at}}</td>
          <td class="edit-buttons"></td>
        </tr>
      </tbody>

    </table>
  </div>
  `,
  data() {
    return {
      namePage: "Produtos",
      product: {
        name: null,
        desc: null,
        purchasePrice: null,
        price: null,
        categoryId: null,
        brandId: null,
        weightId: null
      },
      products: []
    }
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage)

    this.getAllProducts()
  },
  methods: {
    async getAllProducts() {
      const { data } = await axios.get("/products")
      console.log(data)
      this.products = data
    }
  }
}
