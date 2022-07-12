import axios from "axios";
import router from "@/router";
import { decryptPass } from "@/utils/data";


import {
  loginGoogle,
  singOutGoogle,
  createUserGoogle,
  updatePasswordGoogle,
  deleteUserGoogle,
} from "@/utils/google";

import {
  LogInSesion,
  recoveyPassword,
  createAccount,
  validateAccount,
  registerDataAccount,
  changePassword,
  validateAccountPhone
} from "../../services/paths";



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
      errorChangePassword: null,
      errorRecoveryPassword: null,
      recoveryPassword: null,
      temporaryData: null,
      changePassword: null,
      createAccount: null,
      validateAccount: null,
      validateAccountPhone: null,
    };
  },

  mutations: {
    //se inicializa el loading y se limpian los errores
    initLoading(state) {
      state.loading = true;
      state.error = false;

      state.errorLogin = false;
      state.errorRegisterData = false;
      state.errorRegister = false;
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

    //respuesta a la peticion de validad cuenta por correo
    validateAccountPhone(state, data) {
      state.validateAccountPhone = data;
    },

    //se guardan los datos temporales del usuario
    temporaryData(state, data) {
      state.temporaryData = data;
    },

    //se agrega el uid de la cuenta temporal y los datos activo = 1 y tipo = 0
    temporaryDataUid(state, data) {
      state.temporaryData.uid = data;
      state.temporaryData.active = 1;
      state.temporaryData.type = 0;
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

    //cambia estado a recuperar cuenta
    recoveryPassword(state, data) {
      state.recoveryPassword = data;
    },

    //error de cambio de contrasenia
    errorChangePassword(state, data) {
      state.errorChangePassword = data;
    },

    //error de cambio de contrasenia
    errorRecoveryPassword(state, data) {
      state.error = true;
      state.errorRecoveryPassword = data;
    },

    //error de cambio de contrasenia
    changePassword(state, data) {
      state.changePassword = data;
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

    getUser(state) {
      return state.user
    }

  },

  actions: {
    /*------------------- consumo de apis finalizadas --------------------*/

    // Inicio de Session completo
    async LogInSesion({ commit }, body) {
      commit("initLoading");

      this.signOut;

      try {
        const resLoginDB = await axios.post(LogInSesion(), body);

        if (resLoginDB.status === 200) {
          const data = {
            email: resLoginDB.data?.data[0].email,
            password: body.password,
          };

          const resLoginFirebase = await loginGoogle(data);

          if (resLoginFirebase.error) {
            commit("errorLogin", resLoginFirebase);
          } else {
            resLoginDB.data.data[0].token = resLoginFirebase._tokenResponse;
            commit("setUser", resLoginDB.data?.data[0]);
            router.push("/dashboard");
          }
        }
      } catch (errorglobal) {
        commit("errorLogin", errorglobal.response.data);
      }
      commit("finishLoading");
    },

    //Crear Cuenta Temporal
    async createAccount({ commit }, body) {
      commit("initLoading");
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
          commit("errorCreateAccount", err);
        });
      commit("finishLoading");
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

        await createUserGoogle(data)
          .then((resCreateFirebase) => {
            console.log(resCreateFirebase);
            response = resCreateFirebase;
            response._tokenResponse;
            body.uid = response.user.uid;
          })
          .catch((error) => {
            response = {
              error: true,
              message: error,
            };
            commit("errorRegisterData", response);
          });

        await axios
          .post(registerDataAccount(), body)
          .then(() => {
            const user = {
              names: body.name,
              lastNames: body.lastName,
              email: body.email,
              role: "Usuario",
              sex: body.sex,
              token: response._tokenResponse,
            };
            commit("setUser", user);
            router.push("/dashboard");
          })
          .catch((error) => {
            commit("errorRegisterData", error.response);
            deleteUserGoogle();
          });
      } catch (errorGlobal) {
        commit("errorRegisterData", errorGlobal);

        await deleteUserGoogle();
      }
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

    //Validar cuenta por codigo
    async validateAccount({ commit }, body) {
      commit("clearValidateAccount");
      await axios
        .post(validateAccount(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("validateAccount", response.data);
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

    //Validar cuenta metodo Telefono
    async validateAccountPhone({ commit }, body) {
      try {
        

      await axios
        .post(validateAccountPhone(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("validateAccountPhone", response.data);
          }
        })
        .catch((err) => {
          console.error("Error ", err);
          commit("validateAccountPhone", err.response.data);
        });
      } catch (error) {
        commit("validateAccountPhone", error.response.data);
      }
    },

    //Limpiar Datos temporales y errores
    clearData({ commit }, data) {
      commit("temporaryData", data);
      commit("clearError");
    },

    //Guarda los datos temporales
    temporaryData({ commit }, data) {
      commit("temporaryData", data);
    },

    //Agrega el valor de uid cuando es por metodo de telefono
    temporaryDataUid({ commit }, data) {
      commit("temporaryDataUid", data);
    },

    //Activar Recuperar Contraseña
    async recoveyPassword({ commit }, body) {
      commit("initLoading");
      commit("recoveryPassword", null);
      await axios
        .post(recoveyPassword(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("recoveryPassword", response.data);
          }
        })
        .catch((err) => {
          commit("errorRecoveryPassword", err);
        });
      commit("finishLoading");
    },

    //Cambiar contraseña 
    async changePassword({ commit }, body) {
      commit("initLoading");
      try {
        console.log(body)
        let response = null;

        const password = decryptPass(body.token)

        await axios
          .post(changePassword(), body)
          .then((res) => {
            commit("changePassword", res);

            //router.push("/");

          })
          .catch((error) => {
            commit("errorChangePassword", error.response);
          });


        const dataAPI = {
          email: body.email,
          password: password
        }

        console.log(dataAPI)

        await loginGoogle(dataAPI);

        await updatePasswordGoogle(body.password).catch((error) => {
          response = {
            error: true,
            message: error,
          };
          commit("errorChangePassword", response);
        });



      } catch (errorGlobal) {
        commit("errorChangePassword", errorGlobal);
      }
      commit("finishLoading");
    },
  },
};
