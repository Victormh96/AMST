import axios from "axios";
import router from "@/router";

import { loginGoogle, singOutGoogle, createUserGoogle } from "@/utils/google";

import {
  LogInSesion,
  recoveyPassword,
  changePassword,
  createAccount,
  validateAccount,
  userAccount,
} from "../../services/paths";

export default {
  state() {
    return {
      user: null,
      account: null,
      loadingLogin: false,
      loadingRegister: false,
      error: null,
      errorLogin: null,
      errorRegister: null,
      temporaryData: null,

      changePassword: null,
      createAccount: null,
      validateAccount: null,
    };
  },

  mutations: {
    errorLogin(state, data) {
      state.error = true;
      state.errorLogin = data;
    },

    validateAccount(state, data) {
      state.validateAccount = data;
    },

    temporaryData(state, data) {
      state.temporaryData = data;
    },

    temporaryDataUid(state, data) {
      state.temporaryData.uid = data;
      state.temporaryData.active = 1
      state.temporaryData.type = 0
    },

    errorRegister(state, data) {
      state.error = true;
      state.errorRegister = data;

    },

    clearError(state) {
      state.error = false;
      state.errorLogin = false;
      state.errorRegister = false;
    },


    clearValidateAccount(state) {
      state.validateAccount = null;
    },

    setUser(state, data) {
      state.user = data;
    },

    createAccount(state, data) {
      state.account = data;
    },

    clear(state) {
      state.user = null;
      state.login = null;
      state.password = null;
      state.error = null;
      state.errorApi = null;
    },

    initLoading(state) {
      state.loadingLogin = true;
      state.loadingRegister = true;
      state.error = false;
      state.errorLogin = false;
      state.errorRegister = false;
    },

    finishLoading(state) {
      state.loadingLogin = false;
      state.loadingRegister = false;
    },

    /*
    changePassword(state, data) {
      state.changePassword = data;
    },

    createAccount(state, data) {
      state.createAccount = data;
    },
    */
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
            commit("errorRegister", response.response.data);
          }
        })
        .catch((err) => {
          commit("errorRegister", err.response.data);
        });
      commit("finishLoading");
    },

    //Cerar session en google
    async signOut({ commit }) {
      try {
        commit("clear");
        const response = await singOutGoogle();
        if (response) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },

    //Validar cuenta por correo
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
            commit("errorLogin", "Iniciar Sesion");
          }
        })
        .catch((err) => {
          console.error("Error ", err);
          commit("validateAccount", err.response.data);
        });
    },

    temporaryData({ commit }, data) {
      commit("temporaryData", data);
      commit("finishLoading", data);
    },

    temporaryDataUid({ commit }, data) {
      commit("temporaryDataUid", data);
    },

/* trabajando*/


    // RegistrarDatosAdicionales
    async RegisterData({ commit }, body) {
      commit("initLoading");
      console.log(body)
      try {

        const data = {
          email: body.email,
          password: body.password,
        };

        const resCreateFirebase = await createUserGoogle(data);

        body.uid = resCreateFirebase.user.uid

        const resCreateDB = await axios.post(userAccount(), body);

        console.log(resCreateDB)

        const data2 = {
          documentType: body.documentType,
          document: body.document,
          password: body.password,
        }

        this.LogInSesion(data2)
    

        /*
        const resLoginDB = await axios.post(LogInSesion(), body);

        if (resLoginDB.status === 200) {

          const data = {
            email: resLoginDB.data?.data[0].correo,
            password: body.password,
          };

         

          if (resLoginFirebase.error) {
            commit("errorLogin", resLoginFirebase);
          } else {
            resLoginDB.data.data[0].token = resLoginFirebase._tokenResponse
            commit("setUser", resLoginDB.data?.data[0]);
            router.push("/dashboard");

          }
        }
        */
      } catch (errorglobal) {
        console.log(errorglobal)
        //commit("errorCreate", errorglobal);
      }
      commit("finishLoading");
      //commit("finishLoading");
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





    //Registrar datos adicionales
    async userAccount({ commit }, body) {
      await axios
        .post(userAccount(), body)
        .then((response) => {
          if (response.status === 200) {
            console.log("response", response.data);
            commit("userAccount", response.data?.data);
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
