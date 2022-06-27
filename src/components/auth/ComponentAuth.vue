<template>
  <!--Modal-->
  <a-modal class="auth" :footer="null" :maskClosable="false" centered>
    <!--Skeleton-->
    <a-skeleton active :paragraph="{ rows: 7 }" v-if="loading" />

    <!--Body-->
    <div class="w-100" v-else>
      <!--Login-->
      <Login @exchange="exchange" v-if="things === 0" />
      <!--Register-->
      <Register @exchange="exchange" v-else-if="things === 1" />
    </div>
  </a-modal>
</template>

<!--========Script========-->
<script>
import Login from '@/components/auth/partials/ComponentLogin.vue';
import Register from '@/components/auth/partials/ComponentRegister.vue';

export default {
  components: {
    Login,
    Register
  },

  props: ['thing'],

  data() {
    return {
      loading: false,
      things: null
    }
  },

  updated() {
    this.things = this.thing
  },

  methods: {
    exchange(item) {
      this.things = item
      this.loading = true
      setTimeout(() => {
        this.loading = false;
      }, 650);
    }
  },
}
</script>
