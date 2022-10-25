export const Products = {
  name: "Produtos",
  template: 
  `
  <div class="products">
    <dialog id="modalAddProd">
      <button class="btn-close" @click="CloseNewProd()">
        <i class="ai-cross"></i>
      </button>

      <div class="content">
        <h2>Adicionar Produto</h2>
        
        <label for="name">
          <span>Nome</span>
          <input v-model="product.name" id="name" type="text" placeholder="Nome"/>
        </label>

        <label for="desc">
          <span>Descreva esse produto</span>
          <input v-model="product.desc" id="desc" type="text" placeholder="Descrição"/>
        </label>

        <label for="purchasePrice">
        <span>Preço de compra</span>
          <input v-model="product.purchasePrice" id="purchasePrice" type="text" placeholder="Preço de compra"/>
        </label>

        <label for="price">
          <span>Preço de venda</span>
          <input v-model="product.price" id="price" type="text" placeholder="Preço"/>
        </label>

        <label for="category">
          <span>Selecione a categoria</span>
          <select id="category" v-model="product.categoryId">
            <option value="0" disabled>Selecione a Categoria</option>
            <option v-for="item in categories" :value="item.id" :key="item.id">{{ item.category }}</option>
          </select>
        </label>

        <label for="brand">
          <span>Selecione a marca</span>
          <select id="brand" v-model="product.brandId">
            <option value="0" disabled>Selecione a Marca</option>
            <option v-for="item in brands" :value="item.id" :key="item.id">{{ item.brand }}</option>
          </select>
        </label>

        <label for="weightId">
          <span>Selecione a unidade</span>
          <select id="category" v-model="product.weightId">
            <option value="0" disabled>Selecione a Unidade</option>
            <option v-for="item in weights" :value="item.id" :key="item.id">{{ item.Weight }}</option>
          </select>
        </label>

        <button @click="registerProduct()" class="btn-fuller end-form">
          Registrar
        </button>
        
      </div>
    </dialog>


    <div class="prod_headers">
      <div class="p_h-info">
        <h3>Total de Produtos: {{ count }}</h3>
        <div class="btns-info">
          <button @click="ShowNewProd()">
            <i class="ai-plus"></i>
          </button>
        </div>
      </div>

      <div class="p_h-search">
        <input @keyup="searchLike()" v-model="search" type="search" :placeholder="typesSearch"/>
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
            <td>{{prod.category}}</td>
            <td>{{prod.brand}}</td>
            <td>{{prod.Weight}}</td>
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
      count: 0,
      search: null,
      typesSearch: "Pesquisar por nome",
      product: {
        name: null,
        desc: null,
        purchasePrice: null,
        price: null,
        categoryId: 0,
        brandId: 0,
        weightId: 0
      },
      products: [],
      categories: [],
      brands: [],
      weights: []
    }
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage)

    this.getAllProducts()
    this.getCount()
    this.getCategories()
    this.getBrands()
    this.getWeights()
  },
  methods: {
    async registerProduct(){
      const res = await axios.post("/products", {
        name: this.product.name,
        desc: this.product.desc,
        purchasePrice: this.product.purchasePrice,
        price: this.product.price,
        categoryId: this.product.categoryId,
        brandId: this.product.brandId,
        weightId: this.product.weightId
      })

      console.log(res)
    },
    async getCategories(){
      const { data } = await axios.get("/category")
      this.categories = data
    },
    async getBrands(){
      const { data } = await axios.get("/brand")
      this.brands = data
      console.log(data)
    },
    async getWeights(){
      const { data } = await axios.get("/weight")
      console.log(data)
      this.weights = data
    },
    async getCount(){
      const { data } = await axios.get("/products/count")
      this.count = data
    },
    async getAllProducts() {
      const { data } = await axios.get("/products")
      this.products = data
    },
    ShowNewProd() {
      const modal = document.getElementById("modalAddProd")

      modal.showModal()

      console.log("Show add")
    },
    CloseNewProd() {
      const modal = document.getElementById("modalAddProd")
      modal.close()
    },
    async searchLike(){
      if(this.search != "") {
        if(this.typesSearch === "Pesquisar por nome") {
          const { data } = await axios.get(`/products/name/${this.search}`)
          this.products = data
        } else if(this.typesSearch === "Pesquisar por data") {
          const { data } = await axios.get(`/products/data/${this.search}`)
          this.products = data
        } else if(this.typesSearch === "Pesquisar por preço") {
          const { data } = await axios.get(`/products/price/${this.search}`)
          this.products = data
        }
      } else {
        this.getAllProducts()
      }
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
