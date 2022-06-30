import { createStore, createLogger } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

//import {userLogin, recoveyPassword,  changePassword, createAccount, validateAccount,userAccount} from './modules/auth.js'
import auth from './modules/auth'

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
        auth
    },

    plugins: [createLogger(), createPersistedState()]
})