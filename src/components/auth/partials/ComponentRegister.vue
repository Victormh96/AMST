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
      <a-input type="text" v-model:value="formState[nameDocument]" :placeholder="placeholder || 'Documento'"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" autocomplete="off" />
    </a-form-item>
    <!--Method-->
    <a-form-item :name="name">
      <a-input :type="valueformat" v-model:value="formState[name]" :placeholder="placeholder2" autocomplete="off"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument" :pattern="patternformat"
        :title="tittleformat" />
    </a-form-item>
    <!--Method Option-->
    <a-form-item class="mt-1 mb-3 mr-3">
      <p @click="doTypesWith((exchange = !exchange))" :disabled="this.$store.state.auth.loading">
        Registro {{ placeholder3 }}
      </p>
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit" :loading="this.$store.state.auth.loading">Crear cuenta</a-button>
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
    <a-button v-on:click="$emit('exchange', 0)" :disabled="this.$store.state.auth.loading">Iniciar sesión</a-button>
  </a-form-item>
</template>

<!--========Script========-->
<script>

//Revisar Codigo fuente
import { documentsType, documentName } from "@/utils/data";
import { notification } from "ant-design-vue";

export default {
  data() {
    return {
      //Document
      placeholder: null,
      errorStatus: false,
      errorMessage: null,

      //Type
      exchange: true,
      name: "email",
      placeholder2: "Email",
      placeholder3: "Teléfono",
      placeholder4: "Seleccione un documento",
      typeDocument: "",
      nameDocument: "document",
      patternformat: null,
      valueformat: null,
      tittleformat: null,

      formState: {
        document: null,
        email: null,
        phone: null,
        optionDocument: null,
      },
    };
  },

  setup() {
    const openNotification = () => {
      notification.open({
        message: 'Alcaldia Santa Tecla',
        description: 'Se ha enviado un correo electrónico a su cuenta con un código de verificación de 6 dígitos.',
        placement: 'bottomRight',
      });
    };

    const rules = {
      document: [
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
    };

    return {
      rules,
      openNotification,
      documentsType,
    };
  },

  mounted() {
    this.setData()
  },

  methods: {
    doDocumentsWith(item) {
      this.placeholder = documentName(item);
      this.nameDocument = documentName(item);
    },

    doTypesWith(item) {
      if (item == true) {
        this.name = "email";
        this.placeholder2 = "Email";
        this.placeholder3 = "Teléfono";
      } else if (item == false) {
        this.name = "phone";
        this.placeholder2 = "Teléfono";
        this.placeholder3 = "Email";
        this.patternformat = "\\+(503)[0-9]{8}";
        this.valueformat = "tel";
        this.tittleformat = "El formato debe de ser +503XXXXXXXX";
      }
      //Others
      // this.resetFields();
    },

    // metodo enviar
    async onSubmit(values) {

      let body = null
      if (this.name === "phone") {
        body = {
          documentType: values.optionDocument,
          document: values.DUI
            ? values.DUI.replace("-", "")
            : values.pasaporte
              ? values.pasaporte
              : values.documento,
          phone: values.phone.substring(4, 12),
        };
        await this.$store.dispatch("temporaryData", body);
        await this.$store.dispatch("validateAccountPhone", body);

        if (this.$store.state.auth.validateAccountPhone.success) {
          this.$emit("exchange", 2);
        } else {
          this.errorStatus = true;
          this.errorMessage = "El documento ya esta registrado";
        }
      } else {
        this.errorStatus = false;
        body = {
          documentType: values.optionDocument,
          document: values.DUI
            ? values.DUI.replace("-", "")
            : values.pasaporte
              ? values.pasaporte
              : values.documento,
          email: values.email,
          type: 1,
          active: 0,
          action: 0,
        };
        await this.$store.dispatch("temporaryData", body);
        await this.$store.dispatch("createAccount", body);

        this.errorStatus = this.$store.state.auth.error;

        if (this.errorStatus) {
          try {
            this.errorMessage =
              this.$store.state.auth.errorCreateAccount.message;
          } catch (error) {
            this.errorMessage = "Error Interno de Servidor";
          }
        } else {
          this.openNotification();
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
