<template>
  <a-layout-header id="navbar">
    <div class="container">
      <a-row>
        <!--Logo-->
        <a-col :xs="14" :sm="13" :md="13" :lg="5" :xl="5" class="text-left">
          <router-link :to="{ name: 'Home' }">
            <img src="@/../public/img/iconox2.png" alt="Alcaldia Municipal Santa Tecla" />
          </router-link>
        </a-col>
        <!--Menu-->
        <a-col :lg="10" :xl="10" class="m-auto text-center d-sm-none">
          <router-link :to="{ name: 'Home' }"> Inicio </router-link>
          <router-link :to="{ name: 'Home' }"> Servicios </router-link>
          <router-link :to="{ name: 'Home' }"> Privacidad </router-link>
        </a-col>
        <a-col :lg="8" :xl="8" class="m-auto text-center d-sm-none">
          <span class="pr-3 span-xs" @click="doChangeWith(0)">Iniciar sesión</span>
          <span @click="doChangeWith(1)" class="button-xs">Crear cuenta</span>
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
import Modal from "@/components/auth/ComponentAuth.vue"
import Theme from "@/components/public/ComponentTheme.vue"

export default {
  components: {
    Theme,
    Modal
  },

  data() {
    return {
      modal: false,
      change: null,
    };
  },

  methods: {
    doChangeWith(item) {
      this.modal = true
      this.change = item
    },
  },
};
</script>

