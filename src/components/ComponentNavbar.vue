<template>
    <a-layout-header id="navbar">
        <div class="container">
            <a-row>
                <!--Logo-->
                <a-col :xs="14" :sm="14" :md="14" :lg="5" :xl="5" class="text-left">
                    <img src="../../public/img/iconox2.png" alt="Alcaldia Municipal Santa Tecla">
                </a-col>
                <!--Menu-->
                <a-col :lg="10" :xl="10" class="m-auto text-center d-sm-none">
                    <router-link :to="{ name: 'Home' }">
                        Inicio
                    </router-link>
                    <router-link :to="{ name: 'Home' }">
                        Servicios
                    </router-link>
                    <router-link :to="{ name: 'Home' }">
                        Privacidad
                    </router-link>
                </a-col>
                <a-col :lg="8" :xl="8" class="m-auto text-center d-sm-none">
                    <a href="#" @click="doChangeWith(0)">Iniciar sesión</a>
                    <a href="#" @click="doChangeWith(1)"><span>Crear cuenta</span></a>
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
import Theme from '@/components/ComponentTheme.vue'
import Modal from '@/components/auth/ComponentAuth.vue'

export default {
    components: {
        Theme,
        Modal
    },

    data() {
        return {
            modal: false,
            change: null,
            theme: localStorage.theme
        }
    },

    methods: {
        doChangeWith(item) {
            this.modal = true
            this.change = item
        },

        doChangeTheme(checked) {
            if (checked) {
                this.theme = "true"
                document.querySelector("html").setAttribute("data-theme", "dark")

            } else {
                this.theme = "false"
                document.querySelector("html").setAttribute("data-theme", "")
            }
            localStorage.setItem('theme', checked)
        }
    },
};
</script>

