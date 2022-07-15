<template>
  <!--Title-->
  <h2 class="mt-2 mb-4">Recupera contraseña</h2>

  <!--Form-->
  <a-form layout="vertical" :model="formState" :rules="rules" @finish="onSubmit">
    <!--Type Document-->
    <a-form-item name="documentType" class="mb-4">
      <a-select @change="doDocumentsWith" placeholder="Seleccione Documento" v-model:value="formState.documentType"
        :disabled="this.$store.state.auth.loading" :options="
        documentsType.map((item) => ({ value: item.id, label: item.name }))">
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item :name="nameDocument" class="mb-4">
      <a-input type="tel" v-model:value="formState[nameDocument]" placeholder="Documento"
        :disabled="this.$store.state.auth.loading || !formState.documentType" autocomplete="off"
        v-mask="nameDocument == 'DUI' ? '########-#' : 'X'.repeat(30)" />
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit" :loading="this.$store.state.auth.loading" class="button-xl">
        Enviar
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
    <h5 class="mb-3">¿Ya tienes cuenta?</h5>
    <a-button :disabled="this.$store.state.auth.loading" v-on:click="$emit('exchange', 0)" class="button-xl">
      Iniciar sesión
    </a-button>
  </a-form-item>
</template>

<!--========Script========-->
<script>
import { notification } from "ant-design-vue"
import { documentsType, documentName } from "@/utils/data"

export default {
  data() {
    return {
      //Document
      errorStatus: false,
      errorMessage: null,

      //Form
      formState: {
        documentType: undefined,
        document: undefined
      },

      //Dynamic
      nameDocument: 'DUI',

      //Modal
      exchange: true,
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
    }

    const openNotification = () => {
      notification.open({
        message: 'Alcaldia Santa Tecla',
        description: 'Se ha enviado un correo electrónico a su cuenta con un código de verificación de 6 dígitos.',
        placement: 'bottomRight',
      });
    }

    return {
      rules,
      documentsType,
      openNotification,
    }
  },

  methods: {
    doDocumentsWith(item) {
      this.nameDocument = documentName(item)
    },

    async onSubmit(values) {
      this.errorStatus = false

      const body = {
        documentType: values.documentType,
        document: values.DUI ? values.DUI.replace("-", "") : (values.pasaporte ? values.pasaporte : values.documento)
      }

      await this.$store.dispatch("recoveyPassword", body)

      try {
        if (this.$store.state.auth.recoveryPassword.success) {
          this.openNotification();
        }
      } catch (error) {
        this.errorStatus = this.$store.state.auth.error;
        this.errorMessage = "Error, No existe el documento solicitado"
      }
    },
  },

  emits: ["exchange"],
};
</script>
