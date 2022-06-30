import axios from "axios";
import {LogInSesion, recoveyPassword,  changePassword, createAccount, validateAccount,userAccount} from "../../services/paths";

export default {
    state() {
        return {
            login: null,
            password: null,
            changePassword: null,
            createAccount: null,
            validateAccount: null,
            userAccount: null,
        }
    },

    mutations: {
        login(state, data) {
            state.login = data;
        },
        password(state, data) {
            state.password = data;
        },
        changePassword(state, data) {
            state.changePassword = data;
        },
        createAccount(state, data) {
            state.createAccount = data;
        },
        validateAccount(state, data) {
            state.validateAccount = data;
        },
        userAccount(state, data) {
            state.userAccount = data;
        },
        doErrorAPI(state, name) {
            state.errorAPI = name;
        },
    },

    actions: {
        //Iniciar Sesion
        async LogInSesion({ commit }, body) {
            await axios.post(LogInSesion(), body).then(response => {
                if (response.status === 200) {
                    //if(response.data?.status === 200) {
                    console.log('response', response.data);
                    commit("login", response.data?.data);
                    //<router-link to="{ name: 'dashboard' }"> </router-link>
                    //}
                } else {
                    console.error('Error ', response)
                    commit("doErrorAPI", "Iniciar Sesion");
                }
            }).catch(err => {
                console.error('Error ', err);
                commit("doErrorAPI", "Iniciar Sesion");
            })
        },

        //Recuperar Contraseña
        async recoveyPassword({ commit }, body) {
            await axios.post(recoveyPassword(), body).then(response => {
                if (response.status === 200) {
                    //if(response.data?.status === 200) {
                    console.log('response', response.data);
                    commit("password", response.data?.data);
                    //<router-link to="{ name: 'dashboard' }"> </router-link>
                    //}
                } else {
                    console.error('Error ', response)
                    commit("doErrorAPI", "Iniciar Sesion");
                }
            }).catch(err => {
                console.error('Error ', err);
                commit("doErrorAPI", "Iniciar Sesion");
            })
        },

        //Cambiar contraseña
        async changePassword({ commit }, body) {
            await axios.post(changePassword(), body).then(response => {
                if (response.status === 200) {
                    //if(response.data?.status === 200) {
                    console.log('response', response.data);
                    commit("changePassword", response.data?.data);
                    //<router-link to="{ name: 'dashboard' }"> </router-link>
                    //}
                } else {
                    console.error('Error ', response)
                    commit("doErrorAPI", "Iniciar Sesion");
                }
            }).catch(err => {
                console.error('Error ', err);
                commit("doErrorAPI", "Iniciar Sesion");
            })
        },

        //Crear Cuenta
        async createAccount({ commit }, body) {
            await axios.post(createAccount(), body).then(response => {
                if (response.status === 200) {
                    //if(response.data?.status === 200) {
                    console.log('response', response.data);
                    commit("createAccount", response.data?.data);
                    //<router-link to="{ name: 'dashboard' }"> </router-link>
                    //}
                } else {
                    console.error('Error ', response)
                    commit("doErrorAPI", "Iniciar Sesion");
                }
            }).catch(err => {
                console.error('Error ', err);
                commit("doErrorAPI", "Iniciar Sesion");
            })
        },

        //Validar cuenta
        async validateAccount({ commit }, body) {
            await axios.post(validateAccount(), body).then(response => {
                if (response.status === 200) {
                    //if(response.data?.status === 200) {
                    console.log('response', response.data);
                    commit("validateAccount", response.data?.data);
                    //<router-link to="{ name: 'dashboard' }"> </router-link>
                    //}
                } else {
                    console.error('Error ', response)
                    commit("doErrorAPI", "Iniciar Sesion");
                }
            }).catch(err => {
                console.error('Error ', err);
                commit("doErrorAPI", "Iniciar Sesion");
            })
        },

        //Registrar datos adicionales
        async userAccount({ commit }, body) {
            await axios.post(userAccount(), body).then(response => {
                if (response.status === 200) {
                    //if(response.data?.status === 200) {
                    console.log('response', response.data);
                    commit("userAccount", response.data?.data);
                    //<router-link to="{ name: 'dashboard' }"> </router-link>
                    //}
                } else {
                    console.error('Error ', response)
                    commit("doErrorAPI", "Iniciar Sesion");
                }
            }).catch(err => {
                console.error('Error ', err);
                commit("doErrorAPI", "Iniciar Sesion");
            })
        },        
    },
}