export const Brand = {
  name: "brand",
  template: `
  <div class="brand">

    <dialog id="modalAddBrand">

      <div class="content">
        <h2>Nova Marca</h2>
        
        <label for="brand">
          <span>Marca</span>
            <input v-model="brand" id="brand" type="text" placeholder="Marca"/>
          </label>

          <button @click.prevent="registerBrand()" class="btn-fuller end-form">
            Registar
          </button>
          
      </div>

        <button class="btn-close" @click="CloseNewBrand()">
          <i class="ai-cross"></i>
        </button>
    </dialog>


    <dialog id="modalEditBrand">

        <div class="content">
          <h2>Editar Marca</h2>
        
          <label for="brand">
          <span>Marca</span>
            <input v-model="brand" id="brand" type="text" placeholder="Marca"/>
          </label>

          <button @click.prevent="updateBrand()" class="btn-fuller end-form">
            Registar
          </button>
          
        </div>

        <button class="btn-close" @click="CloseEditBrand()">
          <i class="ai-cross"></i>
        </button>
      </dialog>


    <div class="cat_headers">
      <div class="p_h-info">

        <h3>Total de Marcas: {{ count }}</h3>

        <div class="btns-info">

          <button @click="ShowNewBrand()">
            <i class="ai-plus"></i>
          </button>

        </div>

      </div>

      <div class="p_h-search">
        <input @keyup="searchLike()" v-model="search" type="search" placeholder="Buscar por marca"/>
      </div>

    </div>


    <div class="content-table">
      <table class="table table-prod">

        <thead>
          <tr>
            <th><pre>#id</pre></th>
            <th>Nome</th>
            <th>Criado em</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="brand in brands" :key="brand.id">
            <td>{{brand.id}}</td>
            <td>{{brand.brand}}</td>
            <td>{{dateFormat(brand.create_at)}}</td>
            <td class="edit-buttons">
              <button @click="ShowEditBrand(brand.id)">
                <i class="ai-edit"></i>
              </button>

              <button @click="deleteBrand(brand.id)">
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
      namePage: "Marcas",
      count: 0,
      search: null,
      currentId: null,
      brand: null,
      brands: [],
    };
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage);

    this.updateView();
  },
  methods: {
    async getCategories() {
      const { data } = await axios.get("/brand");
      this.brands = data;
    },
    async getCount() {
      const { data } = await axios.get("/brand/count");
      this.count = data;
    },
    ShowNewBrand() {
      const modal = document.getElementById("modalAddBrand");

      modal.showModal();
    },
    async ShowEditBrand(id) {
      const modal = document.getElementById("modalEditBrand");

      modal.showModal();

      this.currentId = id;

      const { data } = await axios.get(`/brand/${id}`);

      this.brand = data.brand;
    },
    async deleteBrand(id){
      if (confirm(`tem certeza que quer excluir a marca de id ${id}`)) {
        await axios.delete(`/brand/${id}`);
        this.updateView();
        alert("Deletado com sucesso!!");
      }
    },
    CloseEditBrand() {
      const modal = document.getElementById("modalEditBrand");
      modal.close();
    },
    CloseNewBrand() {
      const modal = document.getElementById("modalAddBrand");
      modal.close();
    },
    async registerBrand() {
      await axios.post("/brand", {
        brand: this.brand,
      });

      this.updateView();
      this.CloseNewBrand();
    },
    async searchLike(){
      if(this.search != "") {
        const { data } = await axios.get(`/brand/brand/${this.search}`);
        this.brands = data;
      } else {
        this.updateView()
      }
    },
    async updateBrand() {
      if (this.currentId === null) {
        return alert("Id não encontrado.");
      }
      await axios.put(`/brand/${this.currentId}`, {
        brand: this.brand
      });

      this.currentId = null;
      this.updateView();
      this.CloseEditBrand();
    },
    updateView() {
      this.getCategories();
      this.getCount()
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
