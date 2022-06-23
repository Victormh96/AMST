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
                    <a href="#" @click="doSomethingWith(0)">Iniciar sesión</a>
                    <a href="#" @click="doSomethingWith(1)"><span>Crear cuenta</span></a>
                </a-col>
                <!--Theme-->
                <a-col :xs="10" :sm="10" :md="10" :lg="1" :xl="1" class="m-auto text-right">
                    <a-switch :checked="theme" @change="changeTheme" class="theme" />
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
                        <a href="#" @click="doSomethingWith(0)">
                            <i class="fa-solid fa-circle-user"></i>
                        </a>
                    </a-menu-item>
                </a-menu>
            </a-row>
        </div>
    </a-layout-header>
    <!--Components-->
    <Modal v-model:visible="modal" :status="thing" />
</template>

<!--========Script========-->
<script>
import Modal from '@/views/auth/ViewAuth.vue'

export default {

    components: {
        Modal
    },

    data() {
        return {
            modal: false,
            theme: null,
            data: localStorage.data
        }
    },

    created() {
        if (this.data === 'true') {
            this.theme = true
        } else {
            this.theme = false
        }
    },

    methods: {
        doSomethingWith(item) {
            this.modal = true
            this.thing = item
        },

        changeTheme(checked) {
            if (checked) {
                this.theme = true
                document.querySelector('html').setAttribute('data-theme', 'dark')
            } else {
                this.theme = false
                document.querySelector('html').setAttribute('data-theme', '')
            }
            localStorage.setItem('data', checked);
        }
    },
}
</script>

