<template>
  <!--Main-->
  <h2>Crear cuenta</h2>
  <!--Formulario-->
  <a-form
    layout="vertical"
    :rules="rules"
    :model="formState"
    @finish="onSubmit"
  >
    <!--Option-->
    <a-form-item name="optionDocument" class="mb-4 select">
      <a-select
        @change="doDocumentsWith"
        placeholder="Seleccione documento"
        v-model:value="formState.optionDocument"
        :options="
          documentsType.map((item) => ({ value: item.id, label: item.name }))
        "
        :disabled="this.$store.state.auth.loading"
      >
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item :name="nameDocument" class="mb-4">
      <a-input
        type="text"
        v-model:value="formState[nameDocument]"
        :placeholder="placeholder || 'Documento'"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument"
        autocomplete="off"
      />
    </a-form-item>

    <!--Type-->
    <a-form-item :name="name">
      <a-input
        :type="valueformat"
        v-model:value="formState[name]"
        :placeholder="placeholder2"
        autocomplete="off"
        :disabled="this.$store.state.auth.loading || !formState.optionDocument"
        :pattern="patternformat"
        :title="tittleformat"
        @focus="togglePicker()"
      />
    </a-form-item>

    <!--Type Option-->
    <a-form-item>
      <p
        @click="doTypesWith((exchange = !exchange))"
        class="link-style"
        :disabled="this.$store.state.auth.loading"
        value
      >
        Registro con {{ placeholder3 }}
      </p>
    </a-form-item>

    <!--Button-->
    <a-form-item>
      <a-button
        key="submit"
        htmlType="submit"
        :disabled="this.$store.state.auth.loading"
        >Crear cuenta
      </a-button>
    </a-form-item>
  </a-form>

  <span v-if="this.$store.state.auth.loading">
    <img src="@/../public/img/assets/LoadingCircle.svg" />
  </span>
  <p class="error-login" v-if="errorStatus">{{ errorMessage }}</p>

  <hr />
  <!--Others-->
  <div class="footer">
    <a-form-item>
      <h5>¿Ya tienes cuenta?</h5>
      <a-button
        v-on:click="$emit('exchange', 0)"
        :disabled="this.$store.state.auth.loading"
        >Iniciar sesión
      </a-button>
    </a-form-item>
  </div>
</template>

<!--========Script========-->
<script>
import { h } from "vue";

import { isDUI } from "sivar-utils";

// import { Form } from "ant-design-vue";
import { documentsType, documentName, agregarCaracter } from "@/utils/data";
import { notification, Button } from "ant-design-vue";

// const useForm = Form.useForm;
const str = "test";
const fakeDUI = "00000000-0";
const validDUI = "02495046-3";

isDUI(str); // false
isDUI(fakeDUI); // false
isDUI(validDUI); // true

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
    const openNotification = (placement) => {
      const key = `open${Date.now()}`;

      notification.open({
        message: `Notificación ${placement}`,
        description:
          "Se ha enviado un correo electrónico a su cuenta con un código de verificación de 6 dígitos.",
        placement,

        btn: h(
          Button,
          {
            onClick: () => notification.close(key),
          },
          "Reenviar"
        ),
        key,
        onClose: close,
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
          validator: async (_, value) => {
            if (!isDUI(value)) {
              return Promise.reject();
            }
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
    };

    return {
      rules,
      openNotification,
      documentsType,
      agregarCaracter,
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    doDocumentsWith(item) {
      this.placeholder = documentName(item);

      if (this.placeholder === "DUI") {
        try {
          this.nameDocument = "dui";
          this.formState.dui = this.agregarCaracter(
            this.$store.state.auth.temporaryData.document,
            "-",
            8
          );
        } catch (error) {
          //
        }
        return;
      }
      if (this.placeholder === "Pasaporte") {
        try {
          this.nameDocument = "Pasaporte";
          this.formState.pasaporte =
            this.$store.state.auth.temporaryData.pasaporte;
        } catch (error) {
          //
        }
        return;
      } else {
        try {
          this.nameDocument = "document";
          this.formState.document =
            this.$store.state.auth.temporaryData.carneResidencia;
        } catch (error) {
          //
        }
        return;
      }
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
      console.log(values);

      const body = {
        documentType: values.optionDocument,
        document: values.dui?.replace("-", ""),
        pasaporte: values?.pasaporte,
        carneResidencia: values?.document,
        email: values.email,
        phone: values.phone,
      };

      await this.$store.dispatch("temporaryData", body);

      if (this.name === "phone") {
        this.$emit("exchange", 3);
      } else {
        this.errorStatus = false;

        body.type = 1;
        body.active = 0;

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
          this.openNotification("");
        }
      }
    },

    setData() {
      try {
        const documentType = this.$store.state.auth.temporaryData.documentType;
        console.log(documentType);

        this.doDocumentsWith(documentType);

        switch (documentType) {
          case "DUI":
            this.formState.optionDocument = "DUI";
            this.formState.nameDocument = "dui";
            break;
          case "PST":
            this.formState.optionDocument = "Pasaporte";
            this.formState.nameDocument = "pasaporte";
            break;
          case "CDR":
            this.nameDocument = "document";
            break;
        }
      } catch (error) {
        //
      }

      /*
      if (doc !== undefined && type !== undefined) {
        switch (type) {
          case 1:
            this.formState.optionDocument = "DUI";
            this.formState.nameDocument = "dui";
            break;
          case 2:
            this.formState.optionDocument = "DUI";
            this.formState.nameDocument = "pasaporte";
            break;
          case 3:
            this.nameDocument = "document";
            break;
        }
        this.formState.optionDocument = true;
        this.formState.document = doc;
      }
      */
    },

    /*
     * trigger input is @focus="togglePicker()" @focus is native event vue
     * togglePicker is method
     * trigger event are click and focus or onfocus (They are the same) documentation event ->https://cutt.ly/1K4OvEy
     * valueformat variable is definid anteriorly (charge tel or text)
     * matter tel validate
     * event blur is used clear input
     */

    togglePicker() {
      if (this.name === "phone") {
        if (this.valueformat == "tel") {
          var telefono = document.querySelector('input[type="tel"]');
          telefono.addEventListener("click", (event) => {
            event.target.value = "+503";
          });
          telefono.addEventListener("focus", (event) => {
            event.target.value = "+503";
          });
          telefono.addEventListener("onfocus", (event) => {
            event.target.value = "+503";
          });
          telefono.addEventListener("blur", (event) => {
            event.target.style.background = "";
          });
        }
      }
    },
  },
  emits: ["exchange"],
};
</script>
