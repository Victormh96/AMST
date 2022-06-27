import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import getData from './modules/example.js'

export default createStore({
    state: {
    },

    getters: {
    },

    mutations: {
    },

    actions: {
    },

    modules: {
        getData
    },

    plugins: [createLogger(), createPersistedState()]
})