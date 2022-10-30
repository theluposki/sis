export const Weight = {
  name: "weight",
  template: `
  <div class="weight">

    <dialog id="modalAddWeight">

      <div class="content">
        <h2>Nova Unidade</h2>
        
        <label for="weight">
          <span>Unidade</span>
            <input v-model="weight" id="weight" type="text" placeholder="Unidade"/>
          </label>

          <button @click.prevent="registerWeight()" class="btn-fuller end-form">
            Registar
          </button>
          
      </div>

        <button class="btn-close" @click="CloseNewWeight()">
          <i class="ai-cross"></i>
        </button>
    </dialog>


    <dialog id="modalEditWeight">

        <div class="content">
          <h2>Editar Unidade</h2>
        
          <label for="weight">
          <span>Unidade</span>
            <input v-model="weight" id="weight" type="text" placeholder="Unidade"/>
          </label>

          <button @click.prevent="updateWeight()" class="btn-fuller end-form">
            Registar
          </button>
          
        </div>

        <button class="btn-close" @click="CloseEditWeight()">
          <i class="ai-cross"></i>
        </button>
      </dialog>


    <div class="cat_headers">
      <div class="p_h-info">

        <h3>Total de Unidades: {{ count }}</h3>

        <div class="btns-info">

          <button @click="ShowNewWeight()">
            <i class="ai-plus"></i>
          </button>

        </div>

      </div>

      <div class="p_h-search">
        <input @keyup="searchLike()" v-model="search" type="search" placeholder="Buscar por unidade"/>
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
          <tr v-for="weight in weights" :key="weight.id">
            <td>{{weight.id}}</td>
            <td>{{weight.Weight}}</td>
            <td>{{dateFormat(weight.create_at)}}</td>
            <td class="edit-buttons">
              <button @click="ShowEditWeight(weight.id)">
                <i class="ai-edit"></i>
              </button>

              <button @click="deleteWeight(weight.id)">
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
      namePage: "Unidades",
      count: 0,
      search: null,
      currentId: null,
      weight: null,
      weights: [],
    };
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage);

    this.updateView();
  },
  methods: {
    async getCategories() {
      const { data } = await axios.get("/weight");
      this.weights = data;
    },
    async getCount() {
      const { data } = await axios.get("/weight/count");
      this.count = data;
    },
    ShowNewWeight() {
      const modal = document.getElementById("modalAddWeight");

      modal.showModal();
    },
    async ShowEditWeight(id) {
      const modal = document.getElementById("modalEditWeight");

      modal.showModal();

      this.currentId = id;

      const { data } = await axios.get(`/weight/${id}`);

      this.weight = data.Weight;
    },
    async deleteWeight(id){
      if (confirm(`tem certeza que quer excluir a unidade de id ${id}`)) {
        await axios.delete(`/weight/${id}`);
        this.updateView();
        alert("Deletado com sucesso!!");
      }
    },
    CloseEditWeight() {
      const modal = document.getElementById("modalEditWeight");
      modal.close();
    },
    CloseNewWeight() {
      const modal = document.getElementById("modalAddWeight");
      modal.close();
    },
    async registerWeight() {
      await axios.post("/weight", {
        weight: this.weight,
      });

      this.updateView();
      this.CloseNewWeight();
    },
    async searchLike(){
      if(this.search != "") {
        const { data } = await axios.get(`/weight/weight/${this.search}`);
        this.weights = data;
      } else {
        this.updateView()
      }
    },
    async updateWeight() {
      if (this.currentId === null) {
        return alert("Id não encontrado.");
      }
      await axios.put(`/weight/${this.currentId}`, {
        weight: this.weight
      });

      this.currentId = null;
      this.updateView();
      this.CloseEditWeight();
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
