<template>
  <!--Main-->
  <h2>Recupera tu contraseña</h2>
  <!--Formulario-->
  <a-form layout="vertical" :rules="rules" :model="formState" @finish="onSubmit">
    <!--Option-->
    <a-form-item name="documentType" class="mb-4 select">
      <a-select @change="doDocumentsWith" placeholder="Seleccione documento" v-model:value="formState.documentType"
        :options="
          documentsType.map((item) => ({ value: item.id, label: item.name }))
        ">
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item name="document" class="mb-4">
      <a-input type="tel" v-model:value="formState.document" :placeholder="placeholder || 'Documento'"
        :disabled="!formState?.documentType" autocomplete="off" />
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit">Enviar</a-button>
    </a-form-item>
  </a-form>
  <hr />
  <!--Others-->
  <div class="footer">
    <a-form-item>
      <h5>¿Ya tienes cuenta?</h5>
      <a-button v-on:click="$emit('exchange', 0)">Iniciar sesión</a-button>
    </a-form-item>
  </div>
</template>

<!--========Script========-->
<script>
import { h, reactive } from "vue";
import { Form, notification, Button } from "ant-design-vue";
import { documentsType, documentName } from "@/utils/data";

const useForm = Form.useForm;

export default {
  data() {
    return {
      //Document
      placeholder: null,
      //Type
      exchange: true,
      name: "email",
      placeholder2: "Email",
      placeholder3: "Teléfono",
    };
  },
  setup() {
    const formState = reactive({
      document: null,
    });
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
          required: true,
          message: "Campo requerido",
          trigger: "change",
        },
      ],
    };

    const { resetFields } = useForm(formState, reactive({}));

    return {
      formState,
      rules,
      resetFields,
      documentsType,
      openNotification,
    };
  },

  methods: {
    doDocumentsWith(item) {
      this.placeholder = documentName(item);
    },
    async onSubmit(values) {
      const body = {
        documentType: values.documentType,
        document: values.document.replace("-", ""),
      };
      console.log(body)
      await this.$store.dispatch("recoveyPassword", body)
      try {
        if (this.$store.state.auth.recoveryPassword.success) {
          this.openNotification("");
        }
      } catch (error) {
        //
      }
    },
  },
  emits: ["exchange"],
};
</script>
