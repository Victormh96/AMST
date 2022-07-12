<template>
  <a-layout-header id="navbar">
    <div class="container">
      <a-row>
        <!--Logo-->
        <a-col :xs="14" :sm="13" :md="13" :lg="15" :xl="15" class="text-left">
          <router-link :to="{ name: 'Home' }">
            <img src="@/../public/img/iconox2.png" alt="Alcaldia Municipal Santa Tecla" />
          </router-link>
        </a-col>
        <!--Menu-->
        <a-col :lg="8" :xl="8" class="m-auto text-center d-sm-none">
          <a href="" target="_blank">
            <img src="@/../public/img/assets/dahsboard/shape.png" class="notify mr-5">
          </a>

          <a href="tel:0000-0000" target="_blank">
            <img src="@/../public/img/assets/dahsboard/shape2.png" class="notify mr-5">
          </a>

          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <img src="@/../public/img/assets/dahsboard/shape3.png" class="notify" />
            </a>
            <template #overlay>
              <a-menu>
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
            <router-link :to="{ name: 'Home' }">
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
            <a href="#" @click="doChangeWith(0)">
              <i class="fa-solid fa-circle-user"></i>
            </a>
          </a-menu-item>
        </a-menu>
      </a-row>
    </div>
  </a-layout-header>
  <!--Components-->
  <Modal v-model:visible="modal" :change="change" />
</template>

<!--========Script========-->
<script>
import Modal from "@/components/auth/ComponentAuth.vue";
import Theme from "@/components/public/ComponentTheme.vue";

export default {
  components: {
    Theme,
    Modal,
  },

  data() {
    return {
      modal: false,
      change: null,
    };
  },

  methods: {
    doChangeWith(item) {
      this.modal = true;
      this.change = item;
    },

    cerrarSession() {
      this.$store.dispatch("signOut");
      this.$router.push("/");
    },
  },
};
</script>

