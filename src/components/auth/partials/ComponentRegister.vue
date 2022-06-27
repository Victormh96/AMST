<template>
  <!--Main-->
  <h1>Únete hoy mismo</h1>

  <!--Formulario-->
  <a-form layout="vertical" autocomplete="off" :rules="rules" :model="formState" @finish="get">
    <!--Option-->
    <a-form-item name="option" class="mb-4 select">
      <a-select ref="select" v-model:value="value1" @focus="focus" @change="handleChange" placeholder="Tipo Documento">
        <a-select-option value="DUI">DUI</a-select-option>
        <a-select-option value="Otros">Otros</a-select-option>
      </a-select>
    </a-form-item>
    <!--Document-->
    <a-form-item name="dui" class="mb-4">
      <a-input type="tel" v-model:value="formState.dui" placeholder="DUI" />
    </a-form-item>
    <!--Email-->
    <a-form-item name="email" class="mb-4" v-if="this.thing == 0">
      <a-input type="text" v-model:value="formState.email" placeholder="Email" />
      <a href="#" @click="hideSomethingwith(1)" class="component">Registrarse con Teléfono</a>
    </a-form-item>
    <!--Phone-->
    <a-form-item name="phone" class="mb-4" v-else>
      <a-input type="tel" v-model:value="formState.phone" placeholder="Teléfono" />
      <a href="#" @click="hideSomethingwith(0)" class="component">Registrarse con Email</a>
    </a-form-item>
    <a-form-item name="termsAndConditions" class="mb-4" >
        <a-checkbox v-model:checked="checked" >Acepto los Terminos y Condiciones</a-checkbox>
    </a-form-item>
    
    <!--Button-->
    <a-button key="submit" htmlType="submit">Crear cuenta</a-button>
  </a-form>
  <hr />
  <!--Others-->
  <div class="footer">
    <h3>¿Ya tienes cuenta?</h3>
    <a-button v-on:click="$emit('exchange', 0)">Iniciar sesión</a-button>
  </div>
</template>

<!--========Script========-->
<script>
import { reactive } from "vue";
import { Form } from "ant-design-vue";

const useForm = Form.useForm;

export default {
  setup() {
    const formState = reactive({
      dui: null,
      email: null,
      phone: null,
    });

    const rules = {
      dui: [
        {
          required: true,
          message: "El número de Dui es invalido 00000000-0",
          pattern: /^[0-9]\d{7}-\d{1}$/gm,
          trigger: 'blur',
        },
      ],
      phone: [
        {
          required: true,
          message: "El numero de teléfono es ivalido",
          pattern: /^[0-9]\d{7}$/gm,
          trigger: 'blur',
        },
      ],
      email: [
        {
          required: true,
          message: "",
          trigger: 'blur',

        },
        {
          type: "email",
          message: "Email invalido",
          trigger: 'blur',
        },
      ],
      termsAndConditions: [
        {
          required: true,
          message: "Acepte los Terminos y Condiciones",
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
    hideSomethingwith(item) {
      this.thing = item;
    },

    get(values) {
      console.log(values);
    },

  },
};
</script>
