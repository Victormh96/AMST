<template>
    <a-layout-footer id="footer">
        <div class="container">
            <a-row>
                <!--Ubicacion-->
                <a-col :lg="8" :xl="8" class="text-left d-sm-none">
                    <div class="ubicacion">
                        <img src="../../public/img/assets/shape.png" alt="location">
                        <p>2a Av. Norte y 1a C Poniente.
                            No. 2-3, Santa Tecla.
                            La Libertad, El Salvador</p>
                    </div>
                </a-col>
                <!--logo-->
                <a-col :lg="8" :xl="8" class="text-center d-sm-none">
                    <div class="logo">
                        <img src="../../public/img/iconox2.png" alt="Alcaldia Municipal Santa Tecla">
                    </div>
                </a-col>
                <!--Redes-->
                <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="m-auto text-right text-middle">
                    <div class="social-media">
                        <a href="tel:0000-0000" target="_blank">
                            <i class="fa-solid fa-phone"></i>
                        </a>
                        <a href="https://es-la.facebook.com/SantaTeclaSV" target="_blank">
                            <i class="fa-brands fa-facebook-f"></i>
                        </a>
                        <a href="https://twitter.com/santateclasv" target="_blank">
                            <i class="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.instagram.com/santateclasv/" target="_blank" class="instagram">
                            <i class="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </a-col>
                <!--Año-->
                <a-col :span="24" class="pt-4 text-center">
                    <div class="ano">
                        <p>© {{ year() }} - Alcaldía Municipal de Santa Tecla , La Libertad, El Salvador. Todos los
                            Derechos
                            Reservados</p>
                    </div>
                </a-col>
            </a-row>
        </div>
    </a-layout-footer>
</template>

<!--========Script========-->
<script>
import { getYear } from "@/utils/index.js";

export default {
    methods: {
        year() {
            return getYear();
        }
    },
};
</script>