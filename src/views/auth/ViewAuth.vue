<template>
  <!--Modal-->
  <a-modal class="auth" :footer="null" :maskClosable="false" centered>
{{prueba == 0}}
    <!--Skeleton-->
    <a-skeleton active :paragraph="{ rows: 7 }" v-if="loading" />

    <!--Body-->
    <div class="w-100" v-else>
      <!--Login-->
      <Login @finished="finish" v-if="prueba === 0" />
      <!--Register-->
      <Register @finished="finish" v-if="prueba === 1" />
    </div>

  </a-modal>
</template>

<!--========Script========-->
<script>
import Login from '@/components/auth/ComponentLogin.vue';
import Register from '@/components/auth/ComponentRegister.vue';

export default {

  data() {
    return {
      loading: false,
      prueba: this.status
    }
  },

  props: ['status'],

  components: {
    Login,
    Register
  },

  methods: {
    finish(data) {
      console.log(data)

      this.prueba = 1

      this.loading = true
      setTimeout(() => {
        this.loading = false;
      }, 650);
    }
  }
}
</script>
