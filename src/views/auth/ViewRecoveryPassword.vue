<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Main-->
  <a-layout-content id="auth" class="mt-0 layout-max">
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
            <h2 class="mb-6 text-center">Restablecer Contraseña</h2>

            <!--Row-->
            <a-row>
              <!--Password-->
              <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb-6">
                <a-form-item name="password">
                  <a-input-password :disabled="this.$store.state.auth.loading" type="password"
                    v-model:value="formState.password" placeholder="Contraseña" autocomplete="off" />
                </a-form-item>
              </a-col>
              <!--Password Repeat-->
              <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb-6">
                <a-form-item name="repeat">
                  <a-input-password :disabled="this.$store.state.auth.loading" type="password"
                    v-model:value="formState.repeat" placeholder="Confirmar Contraseña" autocomplete="off" />
                </a-form-item>
              </a-col>
            </a-row>
            <!--Error-->
            <div class="mt-2" v-if="errorStatus">
              <strong>{{ errorMessage }}</strong>
            </div>
            <!--Button-->
            <a-form-item class="text-center">
              <a-button key="submit" htmlType="submit" class="button-md" :loading="this.$store.state.auth.loading">
                Guardar</a-button>
            </a-form-item>
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
import { reactive } from "vue"
import { notification } from "ant-design-vue"
import Footer from "@/components/auth/ComponentFooter.vue"
import Skeleton from '@/components/auth/ComponentSkeleton.vue'

export default {
  components: {
    Footer,
    Skeleton
  },

  data() {
    return {
      //Error
      errorStatus: false,
      errorMessage: null,

      //Skeleton
      skeleton: false
    }
  },
  created() {
    if (this.code === undefined) {
      this.openNotification('No existe proceso de recuperación de cuenta')
      this.$router.push("/")
    }
  },
  setup() {
    const formState = reactive({
      password: null,
      repeat: null,
    });

    const openNotification  = (index) => {
      notification.open({
        message: 'Alcaldia Santa Tecla',
        description: index,
        placement: 'bottomRight',
      })
    }

    const rules = {
      password: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
      ],
      repeat: [
        {
          required: true,
          message: "Campo requerido",
          trigger: "blur",
        },
        {
          validator: async (_, value) => {
            const { password, repeat } = formState
            if (password !== repeat) {
              console.log(value)
              return Promise.reject(
                new Error("los campos no coincidencia")
              )
            }
          },
          trigger: "blur",
        },
      ],
    }

    return {
      rules,
      formState,
      openNotification
    }
  },

  methods: {
    async onSubmit(values) {
      this.errorStatus = false

      const { password } = values

      try {
        const body = {
          email: this.$store.state.auth.validateAccount.data[0].email,
          document: this.$store.state.auth.validateAccount.data[0].document,
          documentType: this.$store.state.auth.validateAccount.data[0].documentType,
          token: this.$store.state.auth.validateAccount.data[0].token,
          password: password
        }

        await this.$store.dispatch("changePassword", body)

        if (!this.$store.state.auth.error) {
          this.openNotification('La contraseña fue restablecida con exito')
          setTimeout(() => {
            this.$router.push("/")
          }, 1500)
        } else {
          this.errorMessage = "Error " + this.$store.state.auth.errorChangePassword
        }
        this.errorStatus = this.$store.state.auth.error
      } catch (error) {
        this.errorMessage = "Error " + this.$store.state.auth.errorChangePassword
      }
    },

    loading(item) {
      this.skeleton = item
    }
  },
  props: ['code']
};
</script>
