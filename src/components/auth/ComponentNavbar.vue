<template>
  <a-layout-header id="navbar">
    <div class="container">
      <a-row>
        <!--Logo-->
        <a-col :xs="14" :sm="13" :md="13" :lg="5" :xl="5" class="text-left">
          <router-link :to="{ name: 'Home' }">
            <img class="logo-amst" src="@/../public/img/iconox2.png" alt="Alcaldia Municipal Santa Tecla" />
          </router-link>
        </a-col>
        <!--Menu-->
        <a-col :lg="10" :xl="10" class="m-auto text-center d-sm-none">

        </a-col>
        <a-col :lg="8" :xl="8" class="m-auto text-center d-sm-none">

        </a-col>
        <!--Theme-->
        <a-col :xs="10" :sm="10" :md="10" :lg="1" :xl="1" class="m-auto text-right">
          <Theme />
        </a-col>

      </a-row>
    </div>
  </a-layout-header>

</template>

<!--========Script========-->
<script>
import Theme from "@/components/public/ComponentTheme.vue";

export default {
  components: {
    Theme,

  },

  data() {
    return {
      change: null,
    };
  },

  methods: {
    doChangeWith(item) {
      this.change = item;
    },
  },
};
</script>

