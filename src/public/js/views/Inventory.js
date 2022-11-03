export const Inventory = {
  name: "inventory",
  template: `
  <div class="inventory">

    <dialog id="modalAddInventory">

      <div class="content">
        <h2>Novo Item</h2>
        
          <label for="inventory">
            <span>Produto: {{ productId }}</span>
            <select v-model="productId">
              <option value="null">Selecione o produto</option>
              <option v-for="prod in products" :key="prod.id" :value="prod.id">{{ prod.name }}</option>
            </select>
          </label>

          <label for="inventory">
            <span>Quantidade: {{ qtdNumber }}</span>
            <input v-model.number="qtdNumber" type="number" placeholder="Quantidade"/>
          </label>

          <button @click.prevent="registerInventory()" class="btn-fuller end-form">
            Registar
          </button>
          
      </div>

        <button class="btn-close" @click="CloseNewInventory()">
          <i class="ai-cross"></i>
        </button>
    </dialog>


    <dialog id="modalEditInventory">

        <div class="content">
          <h2>Editar Item</h2>
        
          <label v-if="currentInventory" for="inventoryId">
            <span>ID</span>
            <input v-model="currentInventory.product_id" id="inventoryId" type="text" placeholder="ID" disabled/>
          </label>

          <label v-if="currentInventory" for="inventoryName">
            <span>Produto</span>
            <input v-model="currentInventory.name" id="inventoryName" type="text" placeholder="ID" disabled/>
          </label>

          <div v-if="currentInventory" class="IncDec">
            <button @click="dec()">
              <i class="ai-circle-minus-fill"></i>
            </button>

            <span>{{ currentInventory.qtd }}</span>

            <button @click.prevent="inc()">
              <i class="ai-circle-plus-fill"></i>
            </button>          
          </div>
        
        </div>

        <button class="btn-close" @click="CloseEditInventory()">
          <i class="ai-cross"></i>
        </button>
      </dialog>


    <div class="cat_headers">
      <div class="p_h-info">

        <h3>Total de Items: {{ count }}</h3>

        <div class="btns-info">

          <button @click="ShowNewInventory()">
            <i class="ai-plus"></i>
          </button>

        </div>

      </div>

      <div class="p_h-search">
        <input @keyup="searchLike()" v-model="search" type="search" placeholder="Buscar por item"/>
      </div>

    </div>


    <div class="content-table">
      <table class="table table-prod">

        <thead>
          <tr>
            <th><pre>#id</pre></th>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Criado em</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="inventory in inventories" :key="inventory.id">
            <td>{{inventory.id}}</td>
            <td>{{inventory.name}}</td>
            <td>{{inventory.qtd}}</td>
            <td>{{dateFormat(inventory.create_at)}}</td>
            <td class="edit-buttons">
              <button @click="ShowEditInventory(inventory.id)">
                <i class="ai-edit"></i>
              </button>

              <button @click="deleteInventory(inventory.id)">
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
      namePage: "Estoque",
      count: 0,
      search: null,
      currentId: null,
      currentInventory: null,
      inventories: [],

      products: [],
      productId: null,
      qtdNumber: null,
    };
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage);

    this.updateView();
  },
  methods: {
    async getAllProducts() {
      const { data } = await axios.get("/products");
      this.products = data;
    },
    async inc() {
      await axios.put(`inventory/${this.currentId}/inc`);

      const { data } = await axios.get(`/inventory/name-id/${this.currentId}`);
      this.currentInventory = data;
      this.updateView();
    },
    async dec() {
      await axios.put(`/inventory/${this.currentId}/dec`);

      const { data } = await axios.get(`/inventory/name-id/${this.currentId}`);
      this.currentInventory = data;
      this.updateView();
    },
    async getAll() {
      const { data } = await axios.get("/inventory/inv");
      this.inventories = data;
    },
    async getCount() {
      const { data } = await axios.get("/inventory/count");
      this.count = data;
    },
    ShowNewInventory() {
      const modal = document.getElementById("modalAddInventory");

      modal.showModal();
    },
    async ShowEditInventory(id) {
      const modal = document.getElementById("modalEditInventory");

      modal.showModal();

      this.currentId = id;

      const { data } = await axios.get(`/inventory/name-id/${id}`);
      this.currentInventory = data;
    },
    async deleteInventory(id) {
      if (confirm(`tem certeza que quer excluir o item de id ${id}`)) {
        await axios.delete(`/inventory/${id}`);
        this.updateView();
        alert("Deletado com sucesso!!");
      }
    },
    CloseEditInventory() {
      const modal = document.getElementById("modalEditInventory");
      modal.close();
    },
    CloseNewInventory() {
      const modal = document.getElementById("modalAddInventory");
      modal.close();
    },
    async registerInventory() {
      await axios.post("/inventory", {
        productId: this.productId,
        qtd: this.qtdNumber,
      });

      this.updateView();
      this.CloseNewInventory();
    },
    async searchLike() {
      if (this.search != "") {
        const { data } = await axios.get(`/inventory/name/${this.search}`);
        this.inventories = data;
      } else {
        this.updateView();
      }
    },
    updateView() {
      this.getAll();
      this.getCount();
      this.getAllProducts();
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
