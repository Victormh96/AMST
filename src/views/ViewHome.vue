<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Skeleton-->
  <a-skeleton active :paragraph="{ rows: 8 }" class="container skeleton-main" v-if="loading" />

  <!--Main-->
  <a-layout-content id="home" v-else>
    <div class="container">
      <a-row>
        <!--Texto-->
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="14" class="m-auto pl-5">
          <h1>Santa Tecla Digital Tus servicios municipales en línea</h1>
          <p>
            Ahora puedes pagar por tus impuestos, generar estado de cuentas,
            solicitar solvencias y mucho más.
          </p>
          <center>
            <a href="">Información</a>
          </center>
        </a-col>
        <!--Logo-->
        <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="10" class="text-start">
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
  name: 'App',

  components: {
    Navbar,
    Footer,
  },

  data() {
    return {
      loading: true
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2500);
  },
}
</script>