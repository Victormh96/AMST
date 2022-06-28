<template>
  <!--Main-->
  <h2>Recupera tu contraseña</h2>

  <!--Formulario-->
  <a-form layout="vertical" :rules="rules" :model="formState" @finish="get">
    <!--Option-->
    <a-form-item name="option" class="mb-4 select" >
      <a-select v-model:value="formState.option" @change="doDocumentsWith" placeholder="Seleccione documento">
        <a-select-option v-for="(item, index) in documentsType" :key="index">{{ item?.name }}</a-select-option>
      </a-select>
    </a-form-item>
    <!--Documents-->
    <a-form-item name="document" class="mb-4">
      <a-input type="tel" v-model:value="formState.document" :placeholder="placeholder || 'Documento'" :disabled="formState.option"
        autocomplete="off" />
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
import { reactive } from "vue";
import { Form } from "ant-design-vue";
import { documentsType, documentName } from '@/utils/data'

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
    };

    const { resetFields } = useForm(formState, reactive({}));

    return {
      formState,
      rules,
      resetFields,
      documentsType
    };
  },

  methods: {
    doDocumentsWith(item) {
      this.placeholder = documentName(item)
      //Others
      this.disabled = false;
      this.resetFields();
    },
    get(values) {
      console.log(values);
    },
  },
  emits: ['exchange']
};
</script>
