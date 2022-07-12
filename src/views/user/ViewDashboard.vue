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
        <a-col :lg="24" :xl="24" class="m-auto">
          <h1 v-if="(sexo === 'M' || sexo === 'U')">¡Bienvenido Tecleño!</h1>
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
import Item from "@/components/user/ComponentItem.vue";
import Navbar from '@/components/user/ComponentNavbar.vue'
import Footer from '@/components/user/ComponentFooter.vue'
import Skeleton from '@/components/user/ComponentSkeleton.vue'

export default {
  data() {
    return {
      nombre: null,
      sexo: null,
      skeleton: false,
    };
  },
  created() {
    const { names, lastNames, sex } = this.$store.state.auth.user
    this.nombre = names + " " + lastNames
    this.sexo = sex

  },
  components: {
    Navbar,
    Footer,
    Item,
    Skeleton
  },

  methods: {
    loading(item) {
      this.skeleton = item
    }
  },
};
</script>

