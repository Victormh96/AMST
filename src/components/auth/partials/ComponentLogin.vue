<template>
  <!--Main-->
  <h2>Inicio de sesión</h2>
  <!--Formulario-->
  <a-form layout="vertical" :model="formState" :rules="rules" @finish="onSubmit">
    <!--Option-->
    <a-form-item name="optionDocument" class="mb-4 select">
      <a-select @change="doDocumentsWith" placeholder="Seleccione documento" v-model:value="formState.optionDocument"
        :disabled="this.$store.state.auth.loading" :options="
          documentsType.map((item) => ({ value: item.id, label: item.name }))
        ">
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
        this.$store.state.auth.loading || !formState.optionDocument
      " autocomplete="off" />
    </a-form-item>
    <!--Reset-->
    <a-form-item>
      <p @click="$emit('exchange', 2)" class="link-style">
        ¿Olvidaste tu contraseña?
      </p>
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit" :disabled="this.$store.state.auth.loading">Entrar</a-button>
    </a-form-item>

    <span v-if="this.$store.state.auth.loading">
      <img src="@/../public/img/assets/LoadingCircle.svg">
    </span>
    <p class="error-login" v-if="errorStatus">{{ errorMessage }}</p>
  </a-form>

  <hr />
  <!--Others-->
  <div class="footer">
    <a-form-item>
      <h5>¿No tienes cuenta?</h5>
      <a-button :disabled="this.$store.state.auth.loading" v-on:click="$emit('exchange', 1)">Crear cuenta</a-button>
    </a-form-item>
  </div>
</template>

<!--========Script========-->
<script>
import { isDUI } from "sivar-utils";
import { documentsType, documentName } from "@/utils/data";

const str = "test";
const fakeDUI = "00000000-0";
const validDUI = "02495046-3";

isDUI(str); // false
isDUI(fakeDUI); // false
isDUI(validDUI); // true

export default {
  data() {
    return {
      placeholder: null,
      errorStatus: false,
      errorMessage: null,
      nameDocument: "",
      formState: {
        document: undefined,
        password: undefined,
      },
    };
  },

  setup() {
    const rules = {
      documento: [
        {
          type: "string",
          required: true,
          message: "Campo requerido",
          trigger: "change",
        },
      ],
      pasaporte: [
        {
          type: "string",
          required: true,
          message: "Campo requerido",
          trigger: "change",
        },
      ],
      dui: [
        {
          type: "string",
          required: true,
          message: "Se requiere ingresar el número de DUI",
          trigger: "blur",
        },
        {
          required: true,
          pattern: /^[0-9]\d{7}-\d{1}$/gm,
          transform(value) {
            return value.trim();
          },
          message: "Formato Invalido",
          trigger: "change",
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
          message: "La contraseña debe tener 6 digitos como minimo",
          trigger: "blur",
        },
      ],
    };

    return {
      rules,
      documentsType,
    };
  },
  methods: {
    doDocumentsWith(item) {
      console.log(item);
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
