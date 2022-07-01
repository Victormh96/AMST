<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="register">
    <div class="container">
      <!--Skeleton-->
      <a-skeleton active :paragraph="{ rows: 9 }" v-if="loading" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="15" class="m-auto">
          <!--Formulario---->
          <a-form class="title" layout="vertical" autocomplete="off" :rules="rules" :model="formState" @finish="onSubmit">
            <!--Main-->
            <h2>Datos Personales</h2>

            <a-row class="mb">
              <!--Datos-->
              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="name" >
                  <a-input
                    type="text"
                    v-model:value="formState.name"
                    placeholder="Nombre"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="lastname">
                  <a-input
                    type="text"
                    v-model:value="formState.lastname"
                    placeholder="Apellido"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="contact">
                  <a-input
                    type="tel"
                    v-model:value="formState.contact"
                    placeholder="Número de contacto"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="email">
                  <a-input
                    type="email"
                    v-model:value="formState.email"
                    placeholder="Correo Electrónico"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="password">
                  <a-input-password
                    type="password"
                    v-model:value="formState.password"
                    placeholder="Contraseña"
                  />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb-5">
                <a-form-item name="repeat">
                  <a-input-password
                    type="password"
                    v-model:value="formState.repeat"
                    placeholder="Confirmar Contraseña"
                  />
                </a-form-item>
              </a-col>
            </a-row>

            <!--Button-->
            <div class="centered">
              <a-button key="submit" htmlType="submit">Guardar</a-button>
            </div>
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
import Navbar from "@/components/ComponentNavbar.vue";
import Footer from "@/components/ComponentFooter.vue";

const useForm = Form.useForm;

export default {
  data() {
    return {
      loading: true,
    };
  },

  components: {
    Navbar,
    Footer,
  },

  setup() {
    const formState = reactive({
      name: null,
      contact: null,
      password: null,
      lastname: null,
      email: null,
      repeat: null,
    });

    const { resetFields } = useForm(formState, reactive({}));

    const rules = {};

    return {
      formState,
      rules,
      resetFields,
    };
  },

  methods: {
  onSubmit() {
    this.$store.dispatch("userAccount", this.formState);
  },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

