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
          <h1 v-if="sexo">¡Bienvenido Tecleño!</h1>
          <h1 v-else>¡Bienvenida Tecleña!</h1>
          <h5>{{ nombre }}</h5>
        </a-col>
        <Item v-for="index in 8" :key="index" :index="index" />      
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import Navbar from "@/components/dashboard/ComponentDashboardNabar.vue";
import Item from "@/components/dashboard/ComponentDashboardItem.vue";
import Footer from "@/components/ComponentFooter.vue";

export default {
  data() {
    return {
      nombre: "Delmy Callejas",
      sexo: false,
      loading: true,
    };
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

