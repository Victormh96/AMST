<template>
  <!--Title-->
  <h2 class="mt-2 mb-4">Inicio de sesión</h2>

  <!--Form-->
  <a-form layout="vertical" :model="formState" :rules="rules" @finish="onSubmit">
    <!--Option Document-->
    <a-form-item name="optionDocument" class="mb-4">
      <a-select @change="doDocumentsWith" placeholder="Seleccione Documento" v-model:value="formState.optionDocument"
        :disabled="this.$store.state.auth.loading" :options="
        documentsType.map((item) => ({ value: item.id, label: item.name }))">
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item :name="nameDocument" class="mb-4">
      <a-input type="tel" v-model:value="formState[nameDocument]" :placeholder="'Documento'"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" autocomplete="off"
        v-mask="nameDocument == 'DUI' ? '########-#' : 'X'.repeat(30)" />
    </a-form-item>
    <!--Password-->
    <a-form-item name="password">
      <a-input-password type="password" v-model:value="formState.password" placeholder="Contraseña"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" autocomplete="off" />
    </a-form-item>
    <!--Reset Password-->
    <a-form-item class="mt-1 mb-3 mr-3">
      <p @click="$emit('exchange', 3)">¿Olvidaste tu contraseña?</p>
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit" :loading="this.$store.state.auth.loading" class="button-xl">
        Entrar
      </a-button>
    </a-form-item>
  </a-form>
  <!--Error-->
  <div class="mt-2" v-if="errorStatus">
    <strong>{{ errorMessage }}</strong>
  </div>
  <!--Divider-->
  <hr>
  <!--Others-->
  <a-form-item>
    <h5 class="mb-3">¿No tienes cuenta?</h5>
    <a-button :disabled="this.$store.state.auth.loading" v-on:click="$emit('exchange', 1)" class="button-xl">
      Crear cuenta
    </a-button>
  </a-form-item>
</template>

<!--========Script========-->
<script>
import { documentsType, documentName } from "@/utils/data"

export default {
  data() {
    return {
      //Error
      errorStatus: false,
      errorMessage: null,

      //Form
      formState: {
        document: undefined,
        password: undefined,
      },

      //Dynamic
      nameDocument: 'DUI',
    }
  },

  setup() {
    const rules = {
      DUI: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {
          pattern: /^[0-9]\d{7}-\d{1}$/gm,
          message: "Formato Invalido",
          trigger: "blur",
        },
      ],

      pasaporte: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
      ],

      documento: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
      ],

      password: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {
          min: 6,
          message: "Minimo 6 caracteres",
          trigger: "blur",
        },
      ],
    }

    return {
      rules,
      documentsType
    }
  },

  methods: {
    doDocumentsWith(item) {
      this.nameDocument = documentName(item)
    },

    async onSubmit(values) {
      this.errorStatus = false

      const body = {
        documentType: values.optionDocument,
        document: values.DUI ? values.DUI.replace("-", "") : (values.pasaporte ? values.pasaporte : values.documento),
        password: values.password,
      }

      await this.$store.dispatch("LogInSesion", body)

      this.errorStatus = this.$store.state.auth.error

      try {
        this.errorMessage = this.$store.state.auth.errorLogin.message
      } catch (error) {
        this.errorMessage = "Error Interno de Servidor"
      }
    },
  },

  emits: ["exchange"],
};
</script>
