<template>
  <!--Navbar-->
  <Navbar />
  <!--Skeleton-->
  <a-skeleton active :paragraph="{ rows: 12 }" class="container" v-if="loading" />
  <!--Main-->
  <router-view v-else />
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
    }, 2500);
  },
}
</script>