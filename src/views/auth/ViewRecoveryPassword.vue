<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="auth">
    <div class="container">
      <!--Skeleton-->
      <Skeleton @loading="loading" v-if="(!skeleton)" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" class="m-auto">
          <!--Form---->
          <a-form class="title" layout="vertical" autocomplete="off" :rules="rules" :model="formState"
            @finish="onSubmit">
            <!--Title-->
            <h2 class="mb-5 text-center">Restablecer Contraseña</h2>

            <!--Row-->
            <a-row>
              <!--Password-->
              <a-col :xl="24" class="mb-5">
                <a-form-item name="password">
                  <a-input-password :disabled="this.$store.state.auth.loading" type="password"
                    v-model:value="formState.password" placeholder="Contraseña" />
                </a-form-item>
              </a-col>
              <!--Password Repeat-->
              <a-col :xl="24" class="mb-5">
                <a-form-item name="repeat">
                  <a-input-password :disabled="this.$store.state.auth.loading" type="password"
                    v-model:value="formState.repeat" placeholder="Confirmar Contraseña" />
                </a-form-item>
              </a-col>
            </a-row>
            <a-col :xl="24" class="mb-5 centered">
              <p class="error-login" v-if="errorStatus">{{ errorMessage }}</p>
            </a-col>
            <!--Button-->
            <div class="centered">
              <a-button :loading="this.$store.state.auth.loading" key="submit" htmlType="submit">Guardar</a-button>
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
import { Form, notification, message } from "ant-design-vue";
import Navbar from "@/components/public/ComponentNavbar.vue";
import Footer from "@/components/public/ComponentFooter.vue";
import Skeleton from '@/components/auth/ComponentSkeleton.vue'

const useForm = Form.useForm;

export default {
  data() {
    return {
      errorStatus: false,
      errorMessage: null,
      skeleton: false,
    }
  },

  components: {
    Navbar,
    Footer,
    Skeleton
  },

  setup() {
    const formState = reactive({
      password: null,
      repeat: null,
    });

    const openNotification = () => {
      notification.open({
        message: 'Alcaldia Santa Tecla',
        description: 'La contraseña fue restablecida con exito',
        placement: 'bottomRight',
      });
    };

    const openMessage = () => {
      message.success(
        'La contraseña fue restablecida con exito',
        4,
      );
    };

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
      openNotification,
      openMessage
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
          documentType:
            this.$store.state.auth.validateAccount.data[0].documentType,
          token: this.$store.state.auth.validateAccount.data[0].token,
          password: password,
        };


        await this.$store.dispatch("changePassword", body);

        if (!this.$store.state.auth.error) {
          this.openNotification();
          this.openMessage()
          setTimeout(() => {
            this.$router.push("/");
          }, 3500);



        } else {
          this.errorMessage = "Error " + this.$store.state.auth.errorChangePassword;
        }
        this.errorStatus = this.$store.state.auth.error;
      } catch (error) {
        this.errorMessage = "Error " + this.$store.state.auth.errorChangePassword;
      }
    },

    loading(item) {
      this.skeleton = item
    }
  },

};
</script>
