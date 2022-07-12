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
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="m-auto">
          <!--Formulario---->
          <a-form
            class="title"
            layout="vertical"
            autocomplete="off"
            :rules="rules"
            :model="formState"
            @finish="onSubmit"
          >
            <!--Main-->
            <h2>Restablecer Contraseña</h2>

            <a-row class="mb">
              <!--Datos-->
              <a-col :xl="24" class="mb-5">
                <a-form-item name="password">
                  <a-input-password
                    :disabled="this.$store.state.auth.loading"
                    class="bordered"
                    type="password"
                    v-model:value="formState.password"
                    placeholder="Contraseña"
                  />
                </a-form-item>
              </a-col>

              <a-col :xl="24" class="mb-5">
                <a-form-item name="repeat">
                  <a-input-password
                    :disabled="this.$store.state.auth.loading"
                    type="password"
                    v-model:value="formState.repeat"
                    placeholder="Confirmar Contraseña"
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-col :xl="24" class="mb-5 centered">
              <span v-if="this.$store.state.auth.loading">
                <img src="@/../public/img/assets/LoadingCircle.svg" />
              </span>
              <p class="error-login" v-if="errorStatus">{{ errorMessage }}</p>
            </a-col>
            <!--Button-->
            <div class="centered">
              <a-button
                :disabled="this.$store.state.auth.loading"
                key="submit"
                htmlType="submit"
                >Guardar</a-button
              >
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
import Navbar from "@/components/public/ComponentNavbar.vue";
import Footer from "@/components/public/ComponentFooter.vue";

const useForm = Form.useForm;

export default {
  data() {
    return {
      loading: true,
      errorStatus: false,
      errorMessage: null,
    };
  },

  components: {
    Navbar,
    Footer,
  },

  setup() {
    const formState = reactive({
      password: null,
      repeat: null,
    });

    const { resetFields } = useForm(formState, reactive({}));

    const rules = {
      password: [
        {
          required: true,
          message: "La Contraseña es requerida",
          trigger: "change",
        },
      ],
      repeat: [
        {
          required: true,
          message: "La Contraseña es requerida",
          trigger: "change",
        },
        {
          validator: async (_, value) => {
            const { password, repeat } = formState;
            if (password !== repeat) {
              console.log(value);
              return Promise.reject(
                new Error("Las Contraseñas no son iguales")
              );
            }
          },
          trigger: "change",
        },
      ],
    };

    return {
      formState,
      rules,
      resetFields,
    };
  },

  methods: {
    async onSubmit(values) {
       const { password } = values;

      this.errorStatus = false;
      try {
        const body = {
          email: this.$store.state.auth.validateAccount.data[0].email,
          document: this.$store.state.auth.validateAccount.data[0].document,
          documentType: this.$store.state.auth.validateAccount.data[0].documentType,
          token: this.$store.state.auth.validateAccount.data[0].token,
          password: password,
        };

        
        await this.$store.dispatch("changePassword", body);



        this.errorStatus = this.$store.state.auth.error;
      } catch (error) {
        this.errorMessage = "Error Interno de servidor"
      }
    },
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>
