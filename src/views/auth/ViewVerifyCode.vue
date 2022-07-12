<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="">
    <div class="container">
      <!--Skeleton-->
      <a-skeleton active :paragraph="{ rows: 9 }" v-if="loading" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="15" class="m-auto">
          <div class="loading">
            <span class="centered">
              <img src="@/../public/img/assets/LoadingSquare.svg"
            /></span>

            <h3 class="centered loading-text">
              {{ message }} <br />Seras redireccionado en breve...
            </h3>
          </div>
        </a-col>
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
</template>

<!--========Script========-->
<script>
import Navbar from "@/components/auth/partials/ComponentNavbarLogo.vue";

export default {
  data() {
    return {
      loading: true,
      message: "Validando cuenta",
    };
  },

  components: {
    Navbar,
  },

  setup() {
    return {};
  },

  async created() {
    //obtenemos la url
    const values = window.location.search;
    //Creamos la instancia
    const urlParams = new URLSearchParams(values);
    //Accedemos a el codigo
    const code = urlParams.get("code");
    const action = urlParams.get("action");

    if (urlParams.has("code")) {
      const body = {
        codigo: code,
      };

      if (action == "recovery") {
        body.recovery = 1
      }

      await this.$store.dispatch("validateAccount", body);
      try {
        if (this.$store.state.auth.validateAccount.success) {
          setTimeout(() => {
            if (action == "recovery") {
              this.$router.push("/recuperar");
            }
            if (action == "create") {
              this.$router.push("/register");
            }
          }, 2500);
        } else {
          if (!this.$store.state.auth.validateAccount.success) {
            this.message = this.$store.state.auth.validateAccount.message;
            setTimeout(() => {
              // this.$router.push("/");
            }, 3500);
          } else {
            this.message = "Error en la validación";
            setTimeout(() => {
              //this.$router.push("/");
            }, 3500);
          }
        }
      } catch (error) {
        //this.$router.push("/");
      }
    } else {
      //this.$router.push("/");
    }
  },

  methods: {
    onSubmit() {
      this.$store.dispatch("userAccount", this.formState);
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 300);
  },
};
</script>
