<template>
  <!--Modal-->
  <a-modal class="auth" :footer="null" :maskClosable="false" centered>
    <!--Skeleton-->
    <a-skeleton active :paragraph="{ rows: 6 }" v-if="loading" />

    <!--Body-->
    <div class="w-100" v-else>
      <!--Login-->
      <Login @exchange="exchange" v-if="changes === 0" />
      <!--Register-->
      <Register @exchange="exchange" v-else-if="changes === 1" />
      <!-- Recovery Password -->
      <RecoveryPassword @exchange="exchange" v-else-if="changes === 2" />
    </div>
  </a-modal>
</template>

<!--========Script========-->
<script>
import Login from '@/components/auth/partials/ComponentLogin.vue';
import Register from '@/components/auth/partials/ComponentRegister.vue';
import RecoveryPassword from '@/components/auth/partials/ComponentRecoveryPassword.vue'

export default {
  components: {
    Login,
    Register,
    RecoveryPassword
  },

  props: ['change'],

  data() {
    return {
      loading: false,
      changes: null
    }
  },

  updated() {
    this.changes = this.change
  },

  methods: {
    exchange(item) {
      this.changes = item
      this.loading = true

      //loading
      setTimeout(() => {
        this.loading = false;
      }, 650);
    }
  },
};
</script>
