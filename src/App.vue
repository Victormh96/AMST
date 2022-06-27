<template>
  <!--router-->
  <router-view />
</template>

<!--========Script========-->
<script>
import { getheme } from "@/utils/index.js";

export default {
  name: 'App',

  created() {
    //this.$store.dispatch("getMenu", "hola")
    return getheme()
  }
}
</script>