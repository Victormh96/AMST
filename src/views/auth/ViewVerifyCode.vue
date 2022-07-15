<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Main-->
  <a-layout-content id="auth" class="mt-0 layout-max text-center">
    <div class="container">
      <!--Skeleton-->
      <Skeleton @loading="loading" v-if="(!skeleton)" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-spin size="large" />
        </a-col>
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
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
      //Notify
      message: null,

      //Skeleton
      skeleton: false
    }
  },

  setup() {
    const openNotification = (data) => {
      notification.open({
        message: 'Alcaldia Santa Tecla',
        description: data,
        placement: 'bottomRight'
      })
    }

    return {
      openNotification
    }
  },

  async created() {
    //We get the url
    const values = window.location.search

    //We create the instance
    const urlParams = new URLSearchParams(values)

    //We access the code
    const code = urlParams.get("code")
    const action = urlParams.get("action")

    if (urlParams.has("code")) {
      const body = {
        codigo: code,
      }

      if (action == "recovery") {
        body.recovery = 1
      }

      await this.$store.dispatch("validateAccount", body)

      try {
        if (this.$store.state.auth.validateAccount.success) {
          setTimeout(() => {
            if (action == "recovery") {
               this.$router.push({
                name: 'Recuperar',
                params: {
                  code: code
                }
              })
            }
            if (action == "create") {
              this.$router.push({
                name: 'Registrar',
                params: {
                  code: code
                }
              })
            }
          }, 1500)
        } else {
          if (!this.$store.state.auth.validateAccount.success) {
            this.message = this.$store.state.auth.validateAccount.message
            this.openNotification(this.message)
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
          } else {
            this.message = "Error en la validación"
            this.openNotification(this.message)
            setTimeout(() => {
              this.$router.push("/")
            }, 1500)
          }
        }
      } catch (error) {
        this.$router.push("/")
      }
    } else {
      this.$router.push("/")
    }
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("userAccount", this.formState)
    },

    loading(item) {
      this.skeleton = item
    }
  },
};
</script>
