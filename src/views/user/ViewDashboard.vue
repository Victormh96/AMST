<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="dashboard">
    <div class="container">
      <!--Skeleton-->
      <a-skeleton active :paragraph="{ rows: 24 }" v-if="loading" />
      <!--Row-->
      <a-row v-else>
        <a-col :lg="24" :xl="24" class="m-auto">
          <h1 v-if="(sexo === 'M')">¡Bienvenido Tecleño!</h1>
          <h1 v-else>¡Bienvenida Tecleña!</h1>
          <h5>{{ nombre }}</h5>
        </a-col>
        <Item v-for="index in 8" :key="index" :index="index.toString()" />
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import Navbar from '@/components/user/ComponentNavbar.vue'
import Footer from '@/components/user/ComponentFooter.vue'
import Item from "@/components/user/ComponentItem.vue";

export default {
  data() {
    return {
      nombre: null,
      sexo: null,
      loading: true,
    };
  },
  created() {
    const { nombres, apellidos, sexo } = this.$store.state.auth.user
    this.nombre = nombres + " " + apellidos
    this.sexo = sexo

  },
  components: {
    Navbar,
    Footer,
    Item,
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

