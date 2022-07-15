<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="home">
    <div class="container">
      <!--Skeleton-->
      <Skeleton @loading="loading" v-if="(!skeleton)" />

      <!--Row-->
      <a-row v-else>
        <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14" class="m-auto pl-6">
          <h1 class="mb-4">Santa Tecla Digital Tus servicios municipales en línea</h1>
          <p class="mb-5">
            Ahora puedes pagar tus impuestos, generar estado de cuentas,
            solicitar solvencias y mucho más.
          </p>
          <span class="button-lg">Información</span>
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10" class="text-left text-middle">
          <img src="@/../public/img/assets/shapex3.png" alt="amst" class="animation">
        </a-col>
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import { resetData } from "@/utils/index.js"
import Navbar from '@/components/public/ComponentNavbar.vue'
import Footer from '@/components/public/ComponentFooter.vue'
import Skeleton from '@/components/public/ComponentSkeleton.vue'

export default {
  components: {
    Navbar,
    Footer,
    Skeleton
  },

  data() {
    return {
      skeleton: false,
    }
  },

  mounted() {
    this.$store.dispatch("temporaryData")
    resetData()
  },

  methods: {
    loading(item) {
      this.skeleton = item
    }
  },
};
</script>