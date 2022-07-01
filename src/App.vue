<template>
  <!--router-->
  <router-view />
</template>

<!--========Script========-->
<script>
import { geTheme } from "@/utils/index.js"

export default {
  name: 'App',

  created() {
    return geTheme()
  }
};
</script>