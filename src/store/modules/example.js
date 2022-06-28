export default {
  state() {
    return {
      menu: null,
    }
  },

  mutations: {
  },

  actions: {
    async getMenu({ commit }) {
      console.log(commit)
    }
  },
}