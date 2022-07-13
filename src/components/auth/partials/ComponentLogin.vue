<template>
  <!--Main-->
  <h2 class="mt-2 mb-5">Inicio de sesión</h2>

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
      <a-input type="tel" v-model:value="formState[nameDocument]" :placeholder="placeholder || 'Documento'"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" autocomplete="off" />
    </a-form-item>
    <!--Password-->
    <a-form-item name="password">
      <a-input-password type="password" v-model:value="formState.password" placeholder="Contraseña" :disabled="
      this.$store.state.auth.loading || !formState.optionDocument" autocomplete="off" />
    </a-form-item>
    <!--Reset Password-->
    <a-form-item class="mt-1 mb-3 mr-3">
      <p @click="$emit('exchange', 3)">
        ¿Olvidaste tu contraseña?
      </p>
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit" :loading="this.$store.state.auth.loading">Entrar</a-button>
    </a-form-item>
    <!--Error-->
    <div class="mt-2" v-if="errorStatus">
      <strong>{{ errorMessage }}</strong>
    </div>
  </a-form>
  <!--Divider-->
  <hr>
  <!--Others-->
  <a-form-item>
    <h5 class="mb-3">¿No tienes cuenta?</h5>
    <a-button :disabled="this.$store.state.auth.loading" v-on:click="$emit('exchange', 1)">Crear cuenta</a-button>
  </a-form-item>
</template>

<!--========Script========-->
<script>
import { documentsType, documentName } from "@/utils/data";

export default {
  data() {
    return {
      //Error
      placeholder: null,
      errorStatus: false,
      errorMessage: null,

      //Form
      formState: {
        document: undefined,
        password: undefined,
      },
      nameDocument: null
    }
  },

  setup() {
    const rules = {
      dui: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {
          pattern: /^[0-9]\d{7}-\d{1}$/gm,
          transform(value) {
            return value.trim();
          },
          message: "Formato Invalido",
          trigger: "blur",
        },
      ],
      email: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "change",
        },
        {
          type: "email",
          message: "Email no valido",
          trigger: "change",
        },
      ],
      phone: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "change",
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
          message: "Debe tener 6 digitos como minimo",
          trigger: "blur",
        },
      ],
    };

    return {
      rules,
      documentsType,
    }
  },

  methods: {
    doDocumentsWith(item) {
      //falta cambiar a varios tipos de documentos
      this.placeholder = documentName(item);

      if (this.placeholder === "DUI") {
        this.nameDocument = "dui";
        return;
      }
      if (this.placeholder === "Pasaporte") {
        this.nameDocument = "pasaporte";
        return;
      }
      if (this.placeholder === "document") {
        this.nameDocument = "documento";
        return;
      }
    },

    async onSubmit(values) {
      this.errorStatus = false;

      //falta cambiar a varios tipos de documentos

      const body = {
        documentType: values.optionDocument,
        document: values.dui.replace("-", ""),
        password: values.password,
      };

      await this.$store.dispatch("LogInSesion", body);

      this.errorStatus = this.$store.state.auth.error;

      try {
        this.errorMessage = this.$store.state.auth.errorLogin.message;
      } catch (error) {
        this.errorMessage = "Error Interno de Servidor";
      }
    },
  },
  emits: ["exchange"],
};
</script>
