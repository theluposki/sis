export const Products = {
  name: "Produtos",
  template: `
  <div class="products">
    <dialog id="modalAddProd">

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

        <button @click.prevent="registerProduct()" class="btn-fuller end-form">
          Registrar
        </button>
        
        </div>

        <button class="btn-close" @click="CloseNewProd()">
          <i class="ai-cross"></i>
        </button>
    </dialog>


    <dialog id="modalEditProd">

    <div class="content">
      <h2>Editar Produto</h2>
      
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

      <button @click.prevent="updateProduct()" class="btn-fuller end-form">
        Atualizar
      </button>
      
      </div>

      <button class="btn-close" @click="CloseEditProd()">
        <i class="ai-cross"></i>
      </button>
  </dialog>


  <dialog id="modalAddCategory">

    <div class="content">
      <h2>Nova Categoria</h2>
      
      <label for="category">
        <span>Categoria</span>
          <input v-model="category" id="category" type="text" placeholder="Categoria"/>
        </label>

        <button @click.prevent="registerCategory()" class="btn-fuller end-form">
          registrar
        </button>
        
    </div>

      <button class="btn-close" @click="CloseNewCategory()">
        <i class="ai-cross"></i>
      </button>
  </dialog>


  <dialog id="modalAddBrand">

    <div class="content">
      <h2>Nova Marca</h2>
      
      <label for="brand">
        <span>Marca</span>
          <input v-model="brand" id="brand" type="text" placeholder="Marca"/>
        </label>

        <button @click.prevent="registerBrand()" class="btn-fuller end-form">
          registrar
        </button>
        
    </div>

      <button class="btn-close" @click="CloseNewBrand()">
        <i class="ai-cross"></i>
      </button>
  </dialog>


  <dialog id="modalAddWeight">

  <div class="content">
    <h2>Nova Unidade</h2>
    
    <label for="weight">
      <span>Unidade</span>
        <input v-model="weight" id="weight" type="text" placeholder="Unidade"/>
      </label>

      <button @click.prevent="registerWeight()" class="btn-fuller end-form">
        registrar
      </button>
      
  </div>

    <button class="btn-close" @click="CloseNewWeight()">
      <i class="ai-cross"></i>
    </button>
</dialog>

    <div class="prod_headers">
      <div class="p_h-info">
        <h3>Total de Produtos: {{ count }}</h3>
        <div class="btns-info">
          <button @click="ShowNewWeight()">
            <i class="ai-shipping-box-v1"></i>
          </button>
          <button @click="ShowNewBrand()">
            <i class="ai-leaf"></i>
          </button>
          <button @click="ShowNewCategory()">
            <i class="ai-flag"></i>
          </button>
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
            <th>Lucro</th>
            <th>Categoria</th>
            <th>Marca</th>
            <th>Unidade</th>
            <th>Criado em</th>
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
            <td>{{currency(prod.profit)}}</td>
            <td>{{prod.category}}</td>
            <td>{{prod.brand}}</td>
            <td>{{prod.Weight}}</td>
            <td>{{dateFormat(prod.create_at)}}</td>
            <td class="edit-buttons">
              <button @click="ShowEditProd(prod.id)">
                <i class="ai-edit"></i>
              </button>

              <button @click="deleteProd(prod.id)">
                <i class="ai-trash-can"></i>
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
      currentId: null,
      typesSearch: "Pesquisar por nome",
      category: null,
      brand: null,
      weight: null,
      product: {
        name: null,
        desc: null,
        purchasePrice: null,
        price: null,
        categoryId: 0,
        brandId: 0,
        weightId: 0,
      },
      products: [],
      categories: [],
      brands: [],
      weights: [],
    };
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage);

    this.updateView();
  },
  methods: {
    async registerCategory() {
      await axios.post("/category", {
        category: this.category,
      });

      this.updateView();
      this.CloseNewCategory();
    },
    async registerBrand() {
      await axios.post("/brand", {
        brand: this.brand,
      });

      this.updateView();
      this.CloseNewCategory();
    },
    async registerWeight() {
      await axios.post("/weight", {
        weight: this.weight,
      });

      this.updateView();
      this.CloseNewCategory();
    },
    async registerProduct() {
      await axios.post("/products", {
        name: this.product.name,
        desc: this.product.desc,
        purchasePrice: this.product.purchasePrice,
        price: this.product.price,
        categoryId: this.product.categoryId,
        brandId: this.product.brandId,
        weightId: this.product.weightId,
      });

      this.updateView();
      this.CloseNewProd();
    },
    async updateProduct() {
      if (this.currentId === null) {
        return alert("Id não encontrado.");
      }
      await axios.put(`/products/${this.currentId}`, {
        name: this.product.name,
        desc: this.product.desc,
        purchasePrice: this.product.purchasePrice,
        price: this.product.price,
        categoryId: this.product.categoryId,
        brandId: this.product.brandId,
        weightId: this.product.weightId,
      });

      this.currentId = null;
      this.updateView();
      this.CloseEditProd();
    },
    updateView() {
      this.getAllProducts();
      this.getCount();
      this.getCategories();
      this.getBrands();
      this.getWeights();
    },
    async deleteProd(id) {
      if (confirm(`tem certeza que quer excluir o produdo de id ${id}`)) {
        await axios.delete(`/products/${id}`);
        this.updateView();
        alert("Deletado com sucesso!!");
      }
    },
    async getCategories() {
      const { data } = await axios.get("/category");
      this.categories = data;
    },
    async getBrands() {
      const { data } = await axios.get("/brand");
      this.brands = data;
    },
    async getWeights() {
      const { data } = await axios.get("/weight");

      this.weights = data;
    },
    async getCount() {
      const { data } = await axios.get("/products/count");
      this.count = data;
    },
    async getAllProducts() {
      const { data } = await axios.get("/products");
      this.products = data;
    },
    ShowNewProd() {
      const modal = document.getElementById("modalAddProd");

      modal.showModal();
    },
    ShowNewCategory() {
      const modal = document.getElementById("modalAddCategory");

      modal.showModal();
    },
    ShowNewBrand() {
      const modal = document.getElementById("modalAddBrand");

      modal.showModal();
    },

    ShowNewWeight() {
      const modal = document.getElementById("modalAddWeight");

      modal.showModal();
    },
    async ShowEditProd(id) {
      const modal = document.getElementById("modalEditProd");

      modal.showModal();

      this.currentId = id;

      const { data } = await axios.get(`/products/${id}`);

      this.product.name = data.name;
      this.product.desc = data.desc;
      this.product.purchasePrice = data.purchase_price;
      this.product.price = data.price;
      this.product.categoryId = data.category_id;
      this.product.brandId = data.brand_id;
      this.product.weightId = data.weight_id;
    },
    CloseNewProd() {
      const modal = document.getElementById("modalAddProd");
      modal.close();
    },
    CloseEditProd() {
      const modal = document.getElementById("modalEditProd");
      modal.close();
    },
    CloseNewCategory() {
      const modal = document.getElementById("modalAddCategory");
      modal.close();
    },
    CloseNewBrand() {
      const modal = document.getElementById("modalAddBrand");
      modal.close();
    },
    CloseNewWeight() {
      const modal = document.getElementById("modalAddWeight");
      modal.close();
    },
    async searchLike() {
      if (this.search != "") {
        if (this.typesSearch === "Pesquisar por nome") {
          const { data } = await axios.get(`/products/name/${this.search}`);
          this.products = data;
        } else if (this.typesSearch === "Pesquisar por data") {
          const { data } = await axios.get(`/products/data/${this.search}`);
          this.products = data;
        } else if (this.typesSearch === "Pesquisar por preço") {
          const { data } = await axios.get(`/products/price/${this.search}`);
          this.products = data;
        }
      } else {
        this.getAllProducts();
      }
    },
    currency(number, lang = "pt-br", currencyAcronyms = "BRL") {
      const n = Number(number);
      return new Intl.NumberFormat(lang, {
        style: "currency",
        currency: currencyAcronyms,
      }).format(n);
    },
    dateFormat(
      date,
      options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ) {
      return new Intl.DateTimeFormat(options.lang, options).format(
        new Date(date)
      );
    },
  },
};
