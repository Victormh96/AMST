import axios from "axios";
import router from "@/router";

import { loginGoogle, singOutGoogle, createUserGoogle } from "@/utils/google";

import {LogInSesion, recoveyPassword, changePassword, createAccount, validateAccount, registerDataAccount} from "../../services/paths";

export default {
  state() {
    return {
      user: null,
      account: null, 
      loading: false,
      error: null,
      errorLogin: null,
      errorCreateAccount: null,
      errorRegisterData: null,
      temporaryData: null,
      changePassword: null,
      createAccount: null,
      validateAccount: null,
    };
  },

  mutations: {

    //se inicializa el loading y se limpian los errores  
    initLoading(state) {
      state.loading = true;
      state.error = false;

      state.errorLogin = false;
      state.errorRegisterData = false;
      state.errorRegister = false
    },

    //finaliza el loading
    finishLoading(state) {
      state.loading = false;
    },

    //se activa el error y guarda el error del modal login
    errorLogin(state, data) {
      state.error = true;
      state.errorLogin = data;
    },

    // se activa el error y guarda el error del modal crear cuenta
    errorCreateAccount(state, data) {
      state.error = true;
      state.errorCreateAccount = data;
    },

    // se activa el error y guarda el error en el la vista registrar datos adicionales
    errorRegisterData(state, data) {
      state.error = true;
      state.errorRegisterData = data;
    },

    //respuesta a la peticion de validad cuenta por correo
    validateAccount(state, data) {
      state.validateAccount = data;
    },

    //se guardan los datos temporales del usuario
    temporaryData(state, data) {
      state.temporaryData = data;
    },

    //se agrega el uid de la cuenta temporal y los datos activo = 1 y tipo = 0
    temporaryDataUid(state, data) {
      state.temporaryData.uid = data;
      state.temporaryData.active = 1
      state.temporaryData.type = 0
    },

    //guarda los datos del usuario activo
    setUser(state, data) {
      state.user = data;
    },

    //Borra los datos del usuario cuando se cierra sesion
    clearUser(state) {
      state.user = null;
    },

    //Crea la cuenta temporal
    createAccount(state, data) {
      state.account = data;
    },

    //limpia los errores
    clearError(state) {
      state.error = false;
      state.errorLogin = false;
      state.errorRegister = false;
      state.loading = false;
    },

    clearValidateAccount(state) {
      state.validateAccount = null;
    },

  },

  actions: {

    /*------------------- consumo de apis finalizadas --------------------*/

    // Inicio de Session completo
    async LogInSesion({ commit }, body) {
      commit("initLoading", null);

      this.signOut

      try {
        const resLoginDB = await axios.post(LogInSesion(), body);

        if (resLoginDB.status === 200) {

          const data = {
            email: resLoginDB.data?.data[0].correo,
            password: body.password,
          };

          const resLoginFirebase = await loginGoogle(data);

          if (resLoginFirebase.error) {
            commit("errorLogin", resLoginFirebase);
          } else {
            resLoginDB.data.data[0].token = resLoginFirebase._tokenResponse
            commit("setUser", resLoginDB.data?.data[0]);
            router.push("/dashboard");

          }
        }
      } catch (errorglobal) {
        commit("errorLogin", errorglobal.response.data);
        commit("finishLoading");
      }
      commit("finishLoading");
    },

    //Crear Cuenta Temporal
    async createAccount({ commit }, body) {
      commit("initLoading");
      console.log(body)
      await axios
        .post(createAccount(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("createAccount", response.data?.data);
          } else {
            commit("errorCreateAccount", response.response.data);
          }
        })
        .catch((err) => {
          console.log("error")
          commit("errorCreateAccount", err.response.data);
        });
      commit("finishLoading");
    },

    //Cerrar session en google
    async signOut({ commit }) {
      try {
        commit("clearUser");
        const response = await singOutGoogle();
        if (response) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //Validar cuenta metodo correo
    async validateAccount({ commit }, body) {
      commit("clearValidateAccount");
      await axios
        .post(validateAccount(), body)
        .then((response) => {
          if (response.status === 200) {
            console.log("response", response.data);
            commit("validateAccount", response.data?.data[0]);
          } else {
            console.error("Error ", response);
            commit("errorValidate", "Iniciar Sesion");
          }
        })
        .catch((err) => {
          console.error("Error ", err);
          commit("validateAccount", err.response.data);
        });
    },

    //Limpiar Datos temporales y errores
    clearData({ commit }, data) {
      commit("temporaryData", data);
      commit("clearError");
    },

    //Guarda los datos temporales
    temporaryData({ commit }, data) {
      commit("temporaryData", data);
      commit("finishLoading", data);
    },

    //Agrega el valor de uid cuando es por metodo de telefono
    temporaryDataUid({ commit }, data) {
      commit("temporaryDataUid", data);
    },

    // RegistrarDatosAdicionales
    async RegisterData({ commit }, body) {
      commit("initLoading");

      try {
        let response = null;
        const data = {
          email: body.email,
          password: body.password,
        };

        await createUserGoogle(data).then((resCreateFirebase) => {
          console.log(resCreateFirebase)
          response = resCreateFirebase
          response._tokenResponse
          body.uid = response.user.uid
        }).catch((error) => {
          commit("errorRegisterData", error)
          response = {
            error: true,
            message: error
          };
        });

        await axios.post(registerDataAccount(), body).then(() => {
          const user = {
            nombres: body.name,
            apellidos: body.lastName,
            correo: body.email,
            rol: "Usuario",
            sexo: body.sex,
            token: response._tokenResponse
          }
          commit("setUser", user);
          router.push("/dashboard"); 

        }).catch((error) => {
          commit("errorRegisterData", error.response)
        });
      } catch (errorGlobal) {
        commit("errorRegisterData", errorGlobal);
      }
      commit("finishLoading");
    },

    /*---------------------- Apis por consumir ------------------------*/

    //Recuperar Contraseña
    async recoveyPassword({ commit }, body) {
      await axios
        .post(recoveyPassword(), body)
        .then((response) => {
          if (response.status === 200) {
            console.log("response", response);
            commit("password", response.data?.data[0]);
          } else {
            console.error("Error ", response);
            commit("doErrorAPI", "Iniciar Sesion");
          }
        })
        .catch((err) => {
          console.error("Error ", err);
          commit("doErrorAPI", "Iniciar Sesion");
        });
    },

    //Cambiar contraseña
    async changePassword({ commit }, body) {
      await axios
        .post(changePassword(), body)
        .then((response) => {
          if (response.status === 200) {
            console.log("response", response.data);
            commit("changePassword", response.data?.data);
          } else {
            console.error("Error ", response);
            commit("doErrorAPI", "Iniciar Sesion");
          }
        })
        .catch((err) => {
          console.error("Error ", err);
          commit("doErrorAPI", "Iniciar Sesion");
        });
    },







  },
};
