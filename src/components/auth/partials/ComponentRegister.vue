<template>
  <!--Main-->
  <h1>Únete hoy mismo</h1>

  <!--Formulario-->
  <a-form layout="vertical" :rules="rules" :model="formState" @finish="get">
    <!--Option-->
    <a-form-item name="option" class="mb-4 select" v-model:value="formState.option">
      <a-select ref="select" v-model:value="formState.option" @change="doDocumentsWith" placeholder="Tipo Documento">
        <a-select-option value="0">DUI</a-select-option>
        <a-select-option value="1">Pasaporte</a-select-option>
        <a-select-option value="2">Carné de residencia</a-select-option>
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item name="document" class="mb-4">
      <a-input type="tel" v-model:value="formState.document" :placeholder="placeholder" :disabled="disabled"
        autocomplete="off" />
    </a-form-item>
    <!--Type-->
    <a-form-item :name="name">
      <a-input type="text" v-model:value="formState[name]" :placeholder="placeholder2" autocomplete="off" />
    </a-form-item>
    <!--Type Option-->
    <a-form-item>
      <a href="#" @click="doTypesWith((exchange = !exchange))" class="component">Registro con {{ placeholder3 }}</a>
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
      <h3>¿Ya tienes cuenta?</h3>
      <a-button v-on:click="$emit('exchange', 0)">Iniciar sesión</a-button>
    </a-form-item>
  </div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;

export default {
  data() {
    return {
      //Document
      placeholder: null,
      disabled: true,

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
      email: null,
      phone: null,
    });

    const rules = {
      document: [
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
          pattern: /^[0-9]\d{7}$/gm,
          message: "Teléfono no valido",
          trigger: "blur",
        },
      ],
    };

    const { resetFields } = useForm(formState, reactive({}));

    return {
      formState,
      rules,
      resetFields,
    };
  },

  methods: {
    doDocumentsWith(item) {
      if (item == 0) {
        this.placeholder = "DUI";
      } else if (item == 1) {
        this.placeholder = "Pasaporte";
      } else if (item == 2) {
        this.placeholder = "Carné de residencia";
      }
      //Others
      this.disabled = false;
      this.resetFields();
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
      this.resetFields();
    },

    get(values) {
      console.log(values);
    },
  },
};
</script>
