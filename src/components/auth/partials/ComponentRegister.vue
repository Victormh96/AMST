<template>
  <!--Title-->
  <h2 class="mt-2 mb-4">Crear cuenta</h2>

  <!--Form-->
  <a-form layout="vertical" :rules="rules" :model="formState" @finish="onSubmit">
    <!--Option Document-->
    <a-form-item name="optionDocument" class="mb-4 select">
      <a-select @change="doDocumentsWith" placeholder="Seleccione Documento" v-model:value="formState.optionDocument"
        :options="
        documentsType.map((item) => ({ value: item.id, label: item.name }))"
        :disabled="this.$store.state.auth.loading">
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item :name="nameDocument" class="mb-4">
      <a-input type="text" v-model:value="formState[nameDocument]" placeholder="Documento"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" autocomplete="off"
        v-mask="nameDocument == 'DUI' ? '########-#' : 'X'.repeat(30)" />
    </a-form-item>
    <!--Email-->
    <a-form-item name="email" v-if="(validation)">
      <a-input type="text" v-model:value="formState.email" placeholder="Email" autocomplete="off"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" />
    </a-form-item>
    <!--Phone-->
    <a-form-item name="phone" v-else>
      <a-input type="tel" v-model:value="formState.phone" placeholder="Teléfono" autocomplete="off"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" v-mask="'(+503) ####-####'" />
    </a-form-item>
    <!--Method Option-->
    <a-form-item class="mb-3 mr-3">
      <p @click="doTypesWith((exchange = !exchange))" :disabled="this.$store.state.auth.loading">
        Registrar | {{ title }}
      </p>
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit" :loading="this.$store.state.auth.loading" class="button-xl">
        Crear cuenta
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
    <a-button v-on:click="$emit('exchange', 0)" :disabled="this.$store.state.auth.loading" class="button-xl">
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
      //Error
      errorStatus: false,
      errorMessage: null,

      //Form
      formState: {
        email: null,
        phone: null,
        document: null,
      },

      //Dynamic
      nameDocument: 'DUI',
      validation: true,
      title: 'Teléfono',

      //Modal
      exchange: true
    }
  },

  setup() {
    const openNotification = () => {
      notification.open({
        message: 'Alcaldia Santa Tecla',
        description: 'Se ha enviado un correo electrónico a su cuenta con un código de verificación de 6 dígitos.',
        placement: 'bottomRight'
      })
    }

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

      email: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },

        {
          type: "email",
          message: "Email no valido",
          trigger: "blur",
        },
      ],

      phone: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {

          pattern: /^\([+][0-9]{3}\)([ .-])[0-9]{4}-[0-9]{4}$/gm,
          message: "Formato Invalido",
          trigger: "blur",
        },
      ],
    }

    return {
      rules,
      documentsType,
      openNotification
    }
  },

  mounted() {
    this.setData()
  },

  methods: {
    doDocumentsWith(item) {
      this.nameDocument = documentName(item)
    },

    doTypesWith(item) {
      if (item) {
        this.validation = true
        this.title = "Teléfono"
      } else {
        this.validation = false
        this.title = "Email"
      }
    },

    async onSubmit(values) {
      this.errorStatus = false

      let body = null

      if (!this.validation) {
        body = {
          documentType: values.optionDocument,
          document: values.DUI ? values.DUI.replace("-", "") : values.pasaporte ? values.pasaporte : values.documento,
          phone: values.phone.substring(7, 16).replace("-", ""),
        }

        await this.$store.dispatch("temporaryData", body)

        await this.$store.dispatch("validateAccountPhone", body)

        if (this.$store.state.auth.validateAccountPhone.success) {
          this.$emit("exchange", 2)
        } else {
          this.errorStatus = true
          this.errorMessage = "El documento ya esta registrado"
        }

      } else {
        body = {
          documentType: values.optionDocument,
          document: values.DUI ? values.DUI.replace("-", "") : values.pasaporte ? values.pasaporte : values.documento,
          email: values.email,
          type: 1,
          active: 0,
          action: 0
        }

        await this.$store.dispatch("temporaryData", body)

        await this.$store.dispatch("createAccount", body)

        this.errorStatus = this.$store.state.auth.error

        if (this.errorStatus) {
          try {
            this.errorMessage =
              this.$store.state.auth.errorCreateAccount.message
          } catch (error) {
            this.errorMessage = "Error Interno de Servidor"
          }
        } else {
          this.openNotification()
        }
      }
    },

    setData() {
      try {
        this.$store.state.auth.temporaryData.documentType ? this.doDocumentsWith(this.$store.state.auth.temporaryData.documentType) : null
      } catch (error) {
        //
      }
    },
  },

  emits: ["exchange"],
};
</script>
