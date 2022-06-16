<template>
  <a-modal :footer="null" :maskClosable="false" centered class="auth">
    {{ status }}
    <a-skeleton active :paragraph="{ rows: 7 }" v-if="loading" />

    <div v-else>
      <Codgio/>
      <!--Login-->
      <Login @finished="finish" v-if="status == 0 || this.prueba == 0" />
      <!--Register-->
      <Register @finished="finish" v-else />
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
      prueba: null
    }
  },
 
  props: ['status'],

  components: {
    Login,
    Register
  },

  methods: {

    finish(data) {
      this.prueba = data
      this.loading = true
      setTimeout(() => {
        this.loading = false;
      }, 650);
    }
  }
}
</script>
