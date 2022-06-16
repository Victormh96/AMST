<template>

<img src="./../public/img/assets/shape2.png" class="watermark">

  <!--Navbar-->
  <Navbar />
  <div class="container">
    <!--Skeleton-->
    <a-skeleton active :paragraph="{ rows: 8 }" v-if="loading" />
    <!--Main-->
    <router-view v-else />
  </div>
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