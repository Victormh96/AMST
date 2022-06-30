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
          <h1>¡Bienvenido Tecleño!</h1>
          <h5>{{ nombre }}</h5>
        </a-col>

        <div>

        </div>


        <!--Pago en Linea-->
        <Item index="1"   />
        <!--Emisión Estado De Cuenta-->
        <Item  index="2" />
        <!--Solvencias-->
        <Item  index="3" />
        <!--Calificación-->
        <Item index="4" />
        <!--Licencias-->
        <Item  index="5" />
        <!--Constancia Contribuyente De Inmueble-->
        <Item  index="6" />
        <!--Traspaso Inmueble-->
        <Item  index="7" />
        <!--Reserva Espacios Publicos-->
        <Item  index="8" />
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
      loading: true,
      index: [1, 2, 3, 4, 5, 6, 7, 8]
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

