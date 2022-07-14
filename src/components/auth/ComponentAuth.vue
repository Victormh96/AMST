<template>
  <!--Modal-->
  <a-modal :footer="null" :maskClosable="false" centered>
    <!--Skeleton-->
    <Skeleton @loading="loading" v-if="(!skeleton)" />

    <!--Row-->
    <div id="auth" class="w-100" v-else>
      <!--Login-->
      <Login @exchange="exchange" v-if="changes === 2" />
      <!--Register-->
      <Register @exchange="exchange" v-else-if="changes === 1" />
      <!--Verify Account-->
      <Verify @exchange="exchange" v-else-if="changes === 0" />
      <!--Recovery Password-->
      <RecoveryPassword @exchange="exchange" v-else-if="changes === 3" />
    </div>
  </a-modal>
</template>

<!--========Script========-->
<script>
import Skeleton from '@/components/auth/ComponentSkeleton.vue'
import Login from '@/components/auth/partials/ComponentLogin.vue';
import Verify from '@/components/auth/partials/ComponentVerify.vue';
import Register from '@/components/auth/partials/ComponentRegister.vue';
import RecoveryPassword from '@/components/auth/partials/ComponentRecoveryPassword.vue'

export default {
  components: {
    Login,
    Verify,
    Register,
    Skeleton,
    RecoveryPassword
  },

  data() {
    return {
      skeleton: false,
      changes: null
    }
  },

  updated() {
    this.changes = this.change
  },

  methods: {
    exchange(item) {
      this.changes = item
      this.skeleton = false
    },

    loading(item) {
      this.skeleton = item
    }
  },

  props: ['change'],
};
</script>
