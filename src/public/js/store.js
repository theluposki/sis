export const store = Vuex.createStore({
  state () {
    return {
      count: 0,
      titlePage: ""
    }
  },
  mutations: {
    setTitlePage (state, payload) {
      state.titlePage = payload
    }
  }
})
