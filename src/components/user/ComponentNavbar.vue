<template>
  <a-layout-header id="navbar" class="v2">
    <div class="container">
      <a-row>
        <!--Logo-->
        <a-col :xs="14" :sm="13" :md="13" :lg="15" :xl="15" class="text-left">
          <router-link :to="{ name: 'Dashboard' }">
            <img src="@/../public/img/iconox2.png" alt="Alcaldia Municipal Santa Tecla" />
          </router-link>
        </a-col>
        <!--Menu-->
        <a-col :lg="8" :xl="8" class="m-auto text-center d-sm-none">
          <a href="" target="_blank">
            <img src="@/../public/img/dashboard/shapex11.png" class="notify mr-5">
          </a>
          <a href="tel:0000-0000" target="_blank">
            <img src="@/../public/img/dashboard/shapex10.png" class="notify mr-5">
          </a>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link v3" @click.prevent>
              <img src="@/../public/img/dashboard/shapex9.png" class="notify" />
            </a>
            <template #overlay>
              <a-menu class="v2">
                <a-menu-item key="0">
                  <a href="">Mi Cuenta</a>
                </a-menu-item>
                <a-menu-item key="1">
                  <a href="">Configuración</a>
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3" @click="cerrarSession">Cerrar Sesión</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-col>
        <!--Theme-->
        <a-col :xs="10" :sm="10" :md="10" :lg="1" :xl="1" class="m-auto text-right">
          <Theme />
        </a-col>
        <!--Responsive Menu-->
        <a-menu class="d-lg-none">
          <a-menu-item>
            <router-link :to="{ name: 'Dashboard' }">
              <i class="fa-solid fa-house"></i>
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link :to="{ name: 'Home' }">
              <i class="fa-solid fa-bullseye"></i>
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <router-link :to="{ name: 'Home' }">
              <i class="fa-solid fa-bullseye"></i>
            </router-link>
          </a-menu-item>
          <a-menu-item>
            <a href="#">
              <i class="fa-solid fa-circle-user"></i>
            </a>
          </a-menu-item>
        </a-menu>
      </a-row>
    </div>
  </a-layout-header>
</template>

<!--========Script========-->
<script>
import Theme from "@/components/user/ComponentTheme.vue";

export default {
  components: {
    Theme
  },

  data() {
    return {
      change: null
    }
  },

  methods: {
    cerrarSession() {
      this.$store.dispatch("signOut");
      this.$router.push("/");
    },
  },
};
</script>

