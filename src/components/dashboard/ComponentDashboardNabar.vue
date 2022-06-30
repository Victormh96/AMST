<template>
  <a-layout-header id="navbar-dashboard">
    <div class="container">
      <a-row>
        <!--Logo-->
        <a-col :xs="14" :sm="14" :md="14" :lg="5" :xl="5" class="text-left">
          <img
            src="../../../public/img/iconox2.png"
            alt="Alcaldia Municipal Santa Tecla"
          />
        </a-col>
        <!--Menu-->
        <a-col :lg="10" :xl="10" class="m-auto text-center d-sm-none"> </a-col>
        <!--Theme-->
        <a-col :lg="8" :xl="8" class="m-auto text-center d-md-none">
          <a href="" target="_blank">
            <i class="fa-solid fa-bell"></i>
          </a>
          <a href="tel:0000-0000" target="_blank">
            <i class="fa-solid fa-message"></i>
          </a>
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <i class="fas fa-user-circle"></i>
              <DownOutlined />
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
                <a-menu-item key="3">Cerrar Sesión</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <Theme />
        </a-col>

        <a-col :lg="4" :xl="4" class="m-auto text-center d-ms-none">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click.prevent>
              <i class="fas fa-user-circle"></i>
              <DownOutlined />
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
                <a-menu-item key="3">Cerrar Sesión</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <Theme />
        </a-col>

        <!--Responsive Menu-->
        <a-menu class="d-mdd-none">
          <a-menu-item>
            <a href="" target="_blank">
              <i class="fa-solid fa-bell"></i>
            </a>
          </a-menu-item>
          <a-menu-item>
            <a href="tel:0000-0000" target="_blank">
              <i class="fa-solid fa-message"></i>
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
import Theme from "@/components/ComponentTheme.vue";
import Modal from "@/components/auth/ComponentAuth.vue";

export default {
  components: {
    Theme,
    Modal,
  },

  data() {
    return {
      modal: false,
      change: null,
      theme: localStorage.theme,
    };
  },

  methods: {
    doChangeWith(item) {
      this.modal = true;
      this.change = item;
    },

    doChangeTheme(checked) {
      if (checked) {
        this.theme = "true";
        document.querySelector("html").setAttribute("data-theme", "dark");
      } else {
        this.theme = "false";
        document.querySelector("html").setAttribute("data-theme", "");
      }
      localStorage.setItem("theme", checked);
    },
  },
};
</script>

