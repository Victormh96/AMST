<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="home">
    <div class="container">
      <!--Skeleton-->
      <a-skeleton active :paragraph="{ rows: 9 }" v-if="loading" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="m-auto pl-6">
          <h1>Santa Tecla Digital Tus servicios municipales en línea</h1>
          <p>
            Ahora puedes pagar por tus impuestos, generar estado de cuentas,
            solicitar solvencias y mucho más.
          </p>
          <a href="">Información</a>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="text-left text-middle">
          <img src="../../public/img/assets/shapex3.png" alt="amst">
        </a-col>
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import Navbar from '@/components/ComponentNavbar.vue'
import Footer from '@/components/ComponentFooter.vue'

export default {
  components: {
    Navbar,
    Footer
  },

  data() {
    return {
      loading: true
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000)
  },
};
</script>