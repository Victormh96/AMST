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
      >
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item :name="nameDocument" class="mb-4">
      <a-input
        type="tel"
        v-model:value="formState[nameDocument]"
        :placeholder="placeholder || 'Documento'"
        :disabled="!formState.optionDocument"
        autocomplete="off"
      />
    </a-form-item>
    <!--Type-->
    <a-form-item :name="name">
      <a-input
        type="text"
        v-model:value="formState[name]"
        :placeholder="placeholder2"
        autocomplete="off"
        :disabled="!formState.optionDocument"
      />
    </a-form-item>
    <!--Type Option-->
    <a-form-item>
      <p @click="doTypesWith((exchange = !exchange))" class="link-style" value>
        Registro con {{ placeholder3 }}
      </p>
    </a-form-item>
    <!--Button-->
    <a-form-item>
      <a-button key="submit" htmlType="submit">Crear cuenta</a-button>
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
// import { reactive } from "vue";
// import { Form } from "ant-design-vue";
import { documentsType, documentName } from "@/utils/data";

// const useForm = Form.useForm;

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
      nameDocument: null,
      formState: {
        document: null,
        email: null,
        phone: null,
      },
    };
  },

  setup() {
    const rules = {
      document: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
      ],

      dui: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {
          parent: /^[0-9]\d{7}-\d{1}$/,
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
      ],
    };

    // const { resetFields } = useForm(formState, reactive({}));

    return {
      rules,
      // resetFields,
      documentsType,
    };
  },

  methods: {
    doDocumentsWith(item) {
      this.placeholder = documentName(item);
      if (this.placeholder === "DUI") {
        this.nameDocument = "dui";
      } else {
        this.nameDocument = "document";
      }
      console.log(this.nameDocument);

      //Others
      // this.resetFields();
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
      }
      //Others
      // this.resetFields();
    },

    onSubmit(values) {
      localStorage.removeItem("phone");
      console.log(values);
      this.$emit("exchange", 3);
      localStorage.setItem("document", values.document);
      this.name === "phone" && localStorage.setItem("phone", values.phone);
    },
  },
  emits: ["exchange"],
};
</script>
