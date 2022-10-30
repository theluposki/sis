export const Category = {
  name: "Category",
  template: `
  <div class="category">

    <dialog id="modalAddCategory">

      <div class="content">
        <h2>Nova Categoria</h2>
        
        <label for="category">
          <span>Categoria</span>
            <input v-model="category" id="category" type="text" placeholder="Categoria"/>
          </label>

          <button @click.prevent="registerCategory()" class="btn-fuller end-form">
            Registar
          </button>
          
      </div>

        <button class="btn-close" @click="CloseNewCategory()">
          <i class="ai-cross"></i>
        </button>
    </dialog>


    <dialog id="modalEditCategory">

        <div class="content">
          <h2>Editar Categoria</h2>
        
          <label for="category">
          <span>Categoria</span>
            <input v-model="category" id="category" type="text" placeholder="Categoria"/>
          </label>

          <button @click.prevent="updateCategory()" class="btn-fuller end-form">
            Registar
          </button>
          
        </div>

        <button class="btn-close" @click="CloseEditCategory()">
          <i class="ai-cross"></i>
        </button>
      </dialog>


    <div class="cat_headers">
      <div class="p_h-info">

        <h3>Total de Categorias: {{ count }}</h3>

        <div class="btns-info">

          <button @click="ShowNewCategory()">
            <i class="ai-plus"></i>
          </button>

        </div>

      </div>

      <div class="p_h-search">
        <input @keyup="searchLike()" v-model="search" type="search" placeholder="Buscar por categoria"/>
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
          <tr v-for="cat in categories" :key="cat.id">
            <td>{{cat.id}}</td>
            <td>{{cat.category}}</td>
            <td>{{dateFormat(cat.create_at)}}</td>
            <td class="edit-buttons">
              <button @click="ShowEditCategory(cat.id)">
                <i class="ai-edit"></i>
              </button>

              <button @click="deleteCategory(cat.id)">
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
      namePage: "Categorias",
      count: 0,
      search: null,
      currentId: null,
      category: null,
      categories: [],
    };
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage);

    this.updateView();
  },
  methods: {
    async getCategories() {
      const { data } = await axios.get("/category");
      this.categories = data;
    },
    async getCount() {
      const { data } = await axios.get("/category/count");
      this.count = data;
    },
    ShowNewCategory() {
      const modal = document.getElementById("modalAddCategory");

      modal.showModal();
    },
    async ShowEditCategory(id) {
      const modal = document.getElementById("modalEditCategory");

      modal.showModal();

      this.currentId = id;

      const { data } = await axios.get(`/category/${id}`);

      this.category = data.category;
    },
    async deleteCategory(id){
      if (confirm(`tem certeza que quer excluir a categoria de id ${id}`)) {
        await axios.delete(`/category/${id}`);
        this.updateView();
        alert("Deletado com sucesso!!");
      }
    },
    CloseEditCategory() {
      const modal = document.getElementById("modalEditCategory");
      modal.close();
    },
    CloseNewCategory() {
      const modal = document.getElementById("modalAddCategory");
      modal.close();
    },
    async registerCategory() {
      await axios.post("/category", {
        category: this.category,
      });

      this.updateView();
      this.CloseNewCategory();
    },
    async searchLike(){
      if(this.search != "") {
        const { data } = await axios.get(`/category/cat/${this.search}`);
        this.categories = data;
      } else {
        this.updateView()
      }
    },
    async updateCategory() {
      if (this.currentId === null) {
        return alert("Id não encontrado.");
      }
      await axios.put(`/category/${this.currentId}`, {
        category: this.category
      });

      this.currentId = null;
      this.updateView();
      this.CloseEditCategory();
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
