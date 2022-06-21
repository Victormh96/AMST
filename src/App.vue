<template>
  <!--Main-->
  <router-view />
</template>

<!--========Script========-->
<script>
import { getheme } from "@/utils/index.js";

export default {
  name: 'App',

  created() {
    return getheme()
  }
}
</script>