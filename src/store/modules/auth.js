import axios from "axios";
import router from "@/router";
import { decryptPass } from "@/utils/data"
import {
  loginGoogle,
  singOutGoogle,
  createUserGoogle,
  updatePasswordGoogle,
  deleteUserGoogle,
} from "@/utils/google"
import {
  LogInSesion,
  recoveyPassword,
  createAccount,
  validateAccount,
  registerDataAccount,
  changePassword,
  validateAccountPhone
} from "../../services/paths"

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
    //Inicializa el loading y se limpian los errores
    initLoading(state) {
      state.loading = true
      state.error = false
      state.errorLogin = false
      state.errorRegisterData = false
      state.errorRegister = false
    },

    //Finaliza el loading
    finishLoading(state) {
      state.loading = false
    },

    //Activa el error y guarda el error del modal login
    errorLogin(state, data) {
      state.error = true
      state.errorLogin = data
    },

    //Activa el error y guarda el error del modal crear cuenta
    errorCreateAccount(state, data) {
      state.error = true
      state.errorCreateAccount = data
    },

    //Activa el error y guarda el error en el la vista registrar datos adicionales
    errorRegisterData(state, data) {
      state.error = true
      state.errorRegisterData = data
    },

    //Activa el error de cambio de contrasenia
    errorChangePassword(state, data) {
      state.errorChangePassword = data
    },

    //Activa el error de cambio de contrasenia
    errorRecoveryPassword(state, data) {
      state.error = true
      state.errorRecoveryPassword = data
    },

    //Activa el error de cambio de contrasenia
    changePassword(state, data) {
      state.changePassword = data
    },

    //Almacena la respuesta a la peticion de validad cuenta por correo en validateAccount
    validateAccount(state, data) {
      state.validateAccount = data
    },

    //Almacena la respuesta a la peticion de validad cuenta por telefono en validateAccountPhone
    validateAccountPhone(state, data) {
      state.validateAccountPhone = data
    },

    //Almacena los datos temporales del usuario en temporaryData
    temporaryData(state, data) {
      state.temporaryData = data
    },

    //Agrega el uid de la cuenta temporal y los datos activo = 1 y tipo = 0
    temporaryDataUid(state, data) {
      state.temporaryData.uid = data
      state.temporaryData.active = 1
      state.temporaryData.type = 0
    },

    //Alamacena los datos del usuario activo en user
    setUser(state, data) {
      state.user = data
    },

    //Almacena la cuenta temporal en account
    createAccount(state, data) {
      state.account = data
    },

    //cambia estado a recuperar cuenta
    recoveryPassword(state, data) {
      state.recoveryPassword = data
    },

    //limpia los errores
    clearError(state) {
      state.error = false
      state.errorLogin = false
      state.errorRegister = false
      state.loading = false
    },

    //Borra los datos del usuario cuando se cierra sesion
    clearUser(state) {
      state.user = null
    },

    //Limpia los datos de validateAccount
    clearValidateAccount(state) {
      state.validateAccount = null
    },
  },

  actions: {
    /*------------------- Consumo de APIS  --------------------*/

    // API de Inicio de Session se utiliza en ComponentLogin
    async LogInSesion({ commit }, body) {
      commit("initLoading")

      this.signOut

      try {
        const resLoginDB = await axios.post(LogInSesion(), body)

        if (resLoginDB.status === 200) {
          const data = {
            email: resLoginDB.data?.data[0].email,
            password: body.password,
          };

          const resLoginFirebase = await loginGoogle(data)

          if (resLoginFirebase.error) {
            commit("errorLogin", resLoginFirebase)
          } else {
            resLoginDB.data.data[0].token = resLoginFirebase._tokenResponse
            commit("setUser", resLoginDB.data?.data[0])
            router.push("/dashboard")
          }
        }
      } catch (errorglobal) {
        commit("errorLogin", errorglobal.response.data)
      }
      commit("finishLoading")
    },

    // API de Crearcion de Cuenta Temporal se utiliza en ComponentRegister
    async createAccount({ commit }, body) {
      commit("initLoading")

      await axios
        .post(createAccount(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("createAccount", response.data?.data)
          } else {
            commit("errorCreateAccount", response.response.data)
          }
        })
        .catch((err) => {
          commit("errorCreateAccount", err)
        });
      commit("finishLoading")
    },

    // API que Registra los Datos Adicionales del usuario se utiliza en ViewRegister
    async RegisterData({ commit }, body) {
      commit("initLoading")

      try {
        let response = null
        const data = {
          email: body.email,
          password: body.password,
        }

        await createUserGoogle(data)
          .then((resCreateFirebase) => {
            console.log(resCreateFirebase)
            response = resCreateFirebase
            response._tokenResponse
            body.uid = response.user.uid
          })
          .catch((error) => {
            response = {
              error: true,
              message: error,
            };
            commit("errorRegisterData", response)
          })

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
            router.push("/dashboard")
          })
          .catch((error) => {
            commit("errorRegisterData", error.response)
            deleteUserGoogle()
          })

      } catch (errorGlobal) {
        commit("errorRegisterData", errorGlobal)

        await deleteUserGoogle()
      }
      commit("finishLoading")
    },

    // API que cierra session en google y en el sistema se utiliza en ComponentNavbar
    async signOut({ commit }) {
      try {
        commit("clearUser")
        const response = await singOutGoogle()
        if (response) {
          router.push("/")
        }
      } catch (error) {
        console.log(error)
      }
    },

    // API que Valida la cuenta mediante codigo enviado a Email se utiliza en ViewVerifyCode
    async validateAccount({ commit }, body) {
      commit("clearValidateAccount")
      await axios
        .post(validateAccount(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("validateAccount", response.data);
            commit("temporaryData", response.data.data[0])
          } else {
            console.error("Error ", response);
            commit("errorValidate", "Iniciar Sesion")
          }
        })
        .catch((err) => {
          console.error("Error ", err);
          commit("validateAccount", err.response.data)
        });
    },

    // API que Valida si existe un documento registrado en la base de datos cuando es creacion de cuenta por telefono se utiliza es ComponentVerify
    async validateAccountPhone({ commit }, body) {
      try {
        await axios
          .post(validateAccountPhone(), body)
          .then((response) => {
            if (response.status === 200) {
              commit("validateAccountPhone", response.data)
              singOutGoogle()
            }
          })
          .catch((err) => {
            console.error("Error ", err)
            commit("validateAccountPhone", err.response.data)
          });
      } catch (error) {
        commit("validateAccountPhone", error.response.data)
      }
    },

    // API que inicia el proceso de recuperar Contraseña, se utiliza en ComponentRecoveryPassword
    async recoveyPassword({ commit }, body) {
      commit("initLoading")

      commit("recoveryPassword", null)

      await axios
        .post(recoveyPassword(), body)
        .then((response) => {
          if (response.status === 200) {
            commit("recoveryPassword", response.data)
          }
        })
        .catch((err) => {
          commit("errorRecoveryPassword", err)
        })

      commit("finishLoading")
    },

    // API que cambia la Contraseña despues de pasar los procesos de validaciones se utiliza en ViewRecoveryPassword
    async changePassword({ commit }, body) {
      commit("initLoading")
      try {
        console.log(body)
        let response = null

        const password = decryptPass(body.token)

        await axios
          .post(changePassword(), body)
          .then((res) => {
            commit("changePassword", res)

          })
          .catch((error) => {
            commit("errorChangePassword", error.response)
          })

        const dataAPI = {
          email: body.email,
          password: password
        }

        await loginGoogle(dataAPI)

        await updatePasswordGoogle(body.password).catch((error) => {
          response = {
            error: true,
            message: error,
          }
          commit("errorChangePassword", response)
        })

        await singOutGoogle()

      } catch (errorGlobal) {
        commit("errorChangePassword", errorGlobal)
      }
      commit("finishLoading")
    },

    /*------------------- Funciones --------------------*/

    // Limpia los Datos temporales y errores 
    clearData({ commit }, data) {
      commit("temporaryData", data)
      commit("clearError");
    },

    // Guarda los datos temporales del usuario
    temporaryData({ commit }, data) {
      commit("temporaryData", data)
    },

    // Agrega el valor de uid a los datos temporales cuando es por creacion por metodo de telefono
    temporaryDataUid({ commit }, data) {
      commit("temporaryDataUid", data)
    },
  },
};
