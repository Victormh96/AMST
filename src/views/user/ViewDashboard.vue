<template>
  <!--Title-->
  <title>Alcaldia Municipal Santa Tecla</title>

  <!--Navbar-->
  <Navbar />

  <!--Main-->
  <a-layout-content id="dashboard">
    <div class="container">
      <!--Skeleton-->
      <Skeleton @loading="loading" v-if="(!skeleton)" />

      <!--Row-->
      <a-row v-else>
        <!--Text-->
        <a-col :lg="24" :xl="24">
          <h1 class="mb-1 mt-3" v-if="(sexo === 'M' || sexo === 'U')">¡Bienvenido Tecleño!</h1>
          <h1 class="mb-1 mt-3" v-else>¡Bienvenida Tecleña!</h1>
          <h3 class="mb-6 mt-0 ml-4">{{ nombre }}</h3>
        </a-col>
        <!--Items-->
        <Item v-for="index in 8" :key="index" :index="index.toString()" />
      </a-row>
    </div>
  </a-layout-content>

  <!--Footer-->
  <Footer />
</template>

<!--========Script========-->
<script>
import Item from "@/components/user/ComponentItem.vue"
import Navbar from '@/components/user/ComponentNavbar.vue'
import Footer from '@/components/user/ComponentFooter.vue'
import Skeleton from '@/components/user/ComponentSkeleton.vue'

export default {
  components: {
    Item,
    Navbar,
    Footer,
    Skeleton
  },

  data() {
    return {
      sexo: null,
      nombre: null,
      skeleton: false
    }
  },

  created() {
    const { names, lastNames, sex } = this.$store.state.auth.user
    this.nombre = names + " " + lastNames
    this.sexo = sex
  },

  methods: {
    loading(item) {
      this.skeleton = item
    }
  },
};
</script>

