<template>
  <!--Title-->
  <h2 class="mt-2 mb-4">Se ha enviado un código</h2>

  <!--Form-->
  <a-form layout="vertical" :rules="rules" :model="formState" @finish="VerifyCode">
    <!--Alert-->
    <a-form-item class="mb-4 content">
      <small>
        Introdúcelo para verificar
        <div>
          {{ this.$store.state.auth.temporaryData.phone }}
        </div>
      </small>
    </a-form-item>
    <!--Code-->
    <a-form-item name="code" class="mb-1">
      <a-input type="tel" v-model:value="formState.code" placeholder="Código de verificación" v-mask="'######'"
        autocomplete="off" />
    </a-form-item>
    <!--Dropdown-->
    <a-dropdown :trigger="['click']" :disabled="timerCount > 0 ? true : false" class="mt-2 mb-3 mr-3">
      <div class="d-flex-right" @click.prevent>
        <p :class="[timerCount > 0 && 'danger']">¿No recibiste un SMS?</p>
        <div class="mr-1 ml-1 timeCount" :class="[timerCount === 0 && 'd-none']">
          {{ timerCount }}
        </div>
        <div>
          <i class="fa-regular fa-clock" :class="[timerCount === 0 && 'd-none']" />
        </div>
      </div>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a v-on:click="sendCode(1)">Reenviar SMS</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a v-on:click="$emit('exchange', 1)">Usar correo</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <!--Button-->
    <a-button key="submit" htmlType="submit" :loading="this.$store.state.auth.loading">Siguiente</a-button>
  </a-form>
  <!--Error-->
  <div class="mt-2" v-if="errorStatus">
    <strong>{{ errorMessage }}</strong>
  </div>
  <!--Divider-->
  <hr>
  <!--Others-->
  <a-form-item>
    <h5 class="mb-3">¿Ya tienes cuenta?</h5>
    <a-button v-on:click="$emit('exchange', 0)">Iniciar sesión</a-button>
  </a-form-item>
  <!--Recaptcha-->
  <div id="recaptcha-container"></div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue"
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut

} from "firebase/auth"

const auth = getAuth()

export default {
  data() {
    return {
      //Error
      errorStatus: false,
      errorMessage: null,

      //Modal
      thing: 0,

      //Counter
      timerCount: 30
    }
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
          }, 1000);
        }
      },
      immediate: true,
    },
  },

  setup() {
    const formState = reactive({
      code: null
    })

    const rules = {
      code: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {
          pattern: /^[0-9]{6}$/gm,
          message: "Formato Invalido",
          trigger: "blur",
        },
      ],
    }

    return {
      rules,
      formState
    }
  },

  mounted() {
    this.Recaptcha()
    this.sendCode()
  },

  methods: {
    async sendCode(index = 0) {
      const phoneNumber = "+503" + this.$store.state.auth.temporaryData.phone
      const appVerifier = window?.recaptchaVerifier

      if (phoneNumber) {
        if (index === 1) {
          this.RecaptchaReset()
          this.timerCount = 30
          this.errorStatus = false
        }
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult
          })
          .catch((error) => {
            this.RecaptchaReset();
            this.errorStatus = true
            this.errorMessage = "Codigo no enviado"
            console.log(error)
          });
      }
    },

    VerifyCode(values) {
      const code = values.code
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          this.$store
            .dispatch("temporaryDataUid", result.user.uid)
            .then(() =>
              this.$store.dispatch(
                "createAccount",
                this.$store.state.auth.temporaryData
              )
            )
          signOut(auth);
          this.$router.replace({ name: "Register" })
        })
        .catch((error) => {
          this.errorStatus = true
          this.errorMessage = "Codigo no valido"
          console.log(error)
        })
    },

    Recaptcha() {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response)
          },
        },
        auth
      )
    },

    RecaptchaReset() {
      window.recaptchaVerifier.render().then(function (widgetId) {
        window.grecaptcha.reset(widgetId)
      })
    },
  },

  emits: ["exchange"],
};
</script>
