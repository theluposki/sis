export const Client = {
  name: "client",
  template: `
  <div class="client">

    <dialog id="modalAddClient">

      <div class="content">
        <h2>Nova Cliente</h2>
        
        <label for="client">
          <span>Cliente</span>
          <input v-model="client" id="client" type="text" placeholder="Cliente"/>
        </label>

        <label for="situation">
          <span>Situação</span>
          <select v-model="situation">
            <option value="null" disabled>Selecione a situação</option>
            <option value="Positivo" class="positive">Positivo</option>
            <option value="Parcial" class="partial">Parcial</option>
            <option value="Negativo" class="negative">Negativo</option>
          </select>
        </label>

          <button @click.prevent="registerClient()" class="btn-fuller end-form">
            Registar
          </button>
          
      </div>

        <button class="btn-close" @click="CloseNewClient()">
          <i class="ai-cross"></i>
        </button>
    </dialog>


    <dialog id="modalEditClient">

        <div class="content">
          <h2>Editar Cliente</h2>
        
          <label for="client">
          <span>Cliente</span>
            <input v-model="client" id="client" type="text" placeholder="Cliente"/>
          </label>


          <label for="situation">
            <span>Situação</span>
            <select v-model="situation">
              <option value="null" disabled>Selecione a situação</option>
              <option value="Positivo" class="positive">Positivo</option>
              <option value="Parcial" class="partial">Parcial</option>
              <option value="Negativo" class="negative">Negativo</option>
            </select>
          </label>

          <button @click.prevent="updateClient()" class="btn-fuller end-form">
            Atualizar
          </button>
          
        </div>

        <button class="btn-close" @click="CloseEditClient()">
          <i class="ai-cross"></i>
        </button>
      </dialog>


    <div class="cat_headers">
      <div class="p_h-info">

        <h3>Total de Clientes: {{ count }}</h3>

        <div class="btns-info">

          <button @click="ShowNewClient()">
            <i class="ai-plus"></i>
          </button>

        </div>

      </div>

      <div class="p_h-search">
        <input @keyup="searchLike()" v-model="search" type="search" placeholder="Buscar por cliente"/>
      </div>

    </div>


    <div class="content-table">
      <table class="table table-prod">

        <thead>
          <tr>
            <th><pre>#id</pre></th>
            <th>Nome</th>
            <th>Situação</th>
            <th>Criado em</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{client.id}}</td>
            <td>{{client.name}}</td>
            <td :class="verifyColorSituation(client.situation)">{{client.situation}}</td>
            <td>{{dateFormat(client.create_at)}}</td>
            <td class="edit-buttons">
              <button @click="ShowEditClient(client.id)">
                <i class="ai-edit"></i>
              </button>

              <button @click="deleteClient(client.id)">
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
      namePage: "Clientes",
      count: 0,
      search: null,
      currentId: null,
      client: null,
      situation: null,
      clients: [],
    };
  },
  mounted() {
    this.$store.commit("setTitlePage", this.namePage);

    this.updateView();
  },
  methods: {
    verifyColorSituation(situation){
      if(situation === "Positivo") return "positive"
      if(situation === "Parcial") return "partial"
      if(situation === "Negativo") return "negative"
    },
    async getCategories() {
      const { data } = await axios.get("/clients");
      this.clients = data;
    },
    async getCount() {
      const { data } = await axios.get("/clients/count");
      this.count = data;
    },
    ShowNewClient() {
      const modal = document.getElementById("modalAddClient");

      modal.showModal();
    },
    async ShowEditClient(id) {
      const modal = document.getElementById("modalEditClient");

      modal.showModal();

      this.currentId = id;

      const { data } = await axios.get(`/clients/${id}`);

      this.client = data.name;
      this.situation = data.situation
    },
    async deleteClient(id){
      if (confirm(`tem certeza que quer excluir o cliente de id ${id}`)) {
        await axios.delete(`/clients/${id}`);
        this.updateView();
        alert("Deletado com sucesso!!");
      }
    },
    CloseEditClient() {
      const modal = document.getElementById("modalEditClient");
      modal.close();
    },
    CloseNewClient() {
      const modal = document.getElementById("modalAddClient");
      modal.close();
    },
    async registerClient() {
      await axios.post("/clients", {
        name: this.client,
        situation: this.situation
      });

      this.updateView();
      this.CloseNewClient();
    },
    async searchLike(){
      if(this.search != "") {
        const { data } = await axios.get(`/clients/client/${this.search}`);
        this.clients = data;
      } else {
        this.updateView()
      }
    },
    async updateClient() {
      if (this.currentId === null) {
        return alert("Id não encontrado.");
      }
      await axios.put(`/clients/${this.currentId}`, {
        name: this.client,
        situation: this.situation
      });

      this.currentId = null;
      this.updateView();
      this.CloseEditClient();
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
