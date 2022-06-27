<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <a-layout-content id="data">
    <div class="container">
      <a-row>
        <a-col :xl="15">
          <!--Formulario---->
          <a-form class="title" layout="vertical" autocomplete="off" :model="formState" @finish="post">
            <h1>Datos Personales</h1>
            <br />
            <a-row>
              <a-col :xs="14" :sm="14" :md="14" :lg="12" :xl="12" class="box_right">
                <!--Datos-->
                <a-form-item name="nome" :rules="[{ type: 'text', required: true, message: '' }]">
                  <a-input type="text" v-model:value="formState.nome" placeholder="Nombre" />
                </a-form-item>

                <a-form-item name="contact" :rules="[{ type: 'tel', required: true, message: '' }]">
                  <a-input type="tel" v-model:value="formState.contact" placeholder="Número de contacto" />
                </a-form-item>

                <a-form-item name="pass" :rules="[{ type: 'password', required: true, message: '' }]">
                  <a-input-password type="password" v-model:value="formState.pass" placeholder="Contraseña" />
                </a-form-item>
              </a-col>

              <a-col :xs="14" :sm="14" :md="14" :lg="12" :xl="12" class="box_left">
                <a-form-item name="lastname" :rules="[{ required: true, message: '' }]">
                  <a-input type="text" v-model:value="formState.lastname" placeholder="Apellido" />
                </a-form-item>

                <a-form-item name="email" :rules="[{ type: 'email', required: true, message: '' }]">
                  <a-input type="email" v-model:value="formState.email" placeholder="Correo Electrónico" />
                </a-form-item>

                <a-form-item name="repass" :rules="[{ type: 'password', required: true, message: '' }]">
                  <a-input-password style="margin-left: 20px;" type="password" v-model:value="formState.repass"
                    placeholder="Confirmar Contraseña" />
                </a-form-item>
              </a-col>
            </a-row>

            <!--Button-->
            <center>
              <button @click="guardar()">Guardar</button>
            </center>
          </a-form>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import { reactive } from "vue";
import { Form } from "ant-design-vue";
import axios from "axios";
import Navbar from '@/components/ComponentNavbar.vue'
import Footer from '@/components/ComponentFooter.vue'

const useForm = Form.useForm;

export default {
  name: 'App',
  data() {
    return {
      usuarios: { nome: "", email: "", contact: "", pass: "", lastname: "", repass: "" },
    };
  },

  components: {
    Navbar,
    Footer,
  },

  setup() {
    const formState = reactive({
      nome: null,
      contact: null,
      pass: null,
      lastname: null,
      email: null,
      repass: null,
    });

    const { resetFields } = useForm(formState, reactive({}));

    return {
      formState,
      resetFields,
    };
  },

  methods: {
    addItem() {
      var parametros = {
        nome: this.usuario.title,
        contact: this.usuario.title,
        pass: this.usuario.title,
        lastname: this.usuario.title,
        email: this.usuario.title,
        repass: this.usuario.title,
      };
      axios
        .post("http://localhost:8080//", parametros)
        .then(res => {
          console.log(res);
          parametros = this.datos.push({
            nome: this.usuario.title,
            contact: this.usuario.title,
            pass: this.usuario.title,
            lastname: this.usuario.title,
            email: this.usuario.title,
            repass: this.usuario.title,
          });
        })
        .chatch(e => {
          console.log("No llegan los datos" + e);
        });
    },
  },
  async mounted() {

  }
};
</script>

