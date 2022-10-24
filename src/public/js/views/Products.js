//import { axios } from "../axios/index.js"

export const Products = {
  name: "Produtos",
  template: 
  `
  <div class="products">
    <div class="prod_headers">
      <div class="p_h-info"></div>
      <div class="p_h-action"></div>

      <div class="p_h-search">
        <input type="search" :placeholder="typesSearch"/>
        <div class="types-searchs">
          <label for="types1">
            Nome
            <input type="radio" id="types1" v-model="typesSearch" value="Pesquisar por nome"/>
          </label>
          <label for="types2">
            Data
            <input type="radio" id="types2" v-model="typesSearch" value="Pesquisar por data"/>
          </label>
          <label for="types3">
            Preço
            <input type="radio" id="types3" v-model="typesSearch" value="Pesquisar por preço"/>
        </label>
        </div>
      </div>

    </div>
    <div class="content-table">
      <table class="table table-prod">

        <thead>
          <tr>
            <th><pre>#id</pre></th>
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
            <td>{{prod.id}}</td>
            <td>{{prod.name}}</td>
            <td>{{prod.desc}}</td>
            <td>{{currency(prod.purchase_price)}}</td>
            <td>{{currency(prod.price)}}</td>
            <td>{{prod.category_id}}</td>
            <td>{{prod.brand_id}}</td>
            <td>{{prod.weight_id}}</td>
            <td>{{dateFormat(prod.create_at)}}</td>
            <td class="edit-buttons">
              <button>
                <i class="ai-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
  `,
  data() {
    return {
      namePage: "Produtos",
      typesSearch: "Pesquisar por nome",
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
    },
    currency(number, lang = "pt-br", currencyAcronyms = "BRL") {
      const n = Number(number)
      return new Intl.NumberFormat(lang, { style: 'currency', currency: currencyAcronyms }).format(n)
    },
    dateFormat(date, options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) {
      return new Intl.DateTimeFormat(options.lang, options).format(new Date(date))
    }
  }
}
