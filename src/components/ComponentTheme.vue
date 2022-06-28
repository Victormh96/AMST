<template>
    <!--Theme-->
    <i class="fa-solid fa-lightbulb" @click="doChangeTheme((exchange = !exchange))"></i>
</template>

<!--========Script========-->
<script>
export default {
    data() {
        return {
            theme: localStorage.theme
        }
    },

    methods: {
        doChangeTheme(checked) {
            if (checked) {
                document.querySelector("html").setAttribute("data-theme", "dark")

            } else {
                document.querySelector("html").setAttribute("data-theme", "")
            }
            localStorage.setItem('theme', checked)
        }
    },
};
</script>


<style>
:root {
    --bg-planet-bright: #f1cb04;
    --bg-planet-shadow: #828894;
    --bg-planet-lightshadow: #d7d7d8;
}

html[data-theme="dark"] {
    --bg-planet-bright: #828894;

}

.fa-lightbulb {
    font-size: 30px;
    color: var(--bg-planet-bright);
    transform: rotate(180deg);
    cursor: pointer;

}

html[data-theme="dark"] .fa-lightbulb {
    animation-duration: 2s;
    animation-name: slidein;
}

@keyframes slidein {
    0% {
        transform: rotate(180deg);
    }

    33% {
        transform: rotate(200deg);
    }

    66% {
        transform: rotate(170deg);
    }

    100% {
        transform: rotate(180deg);
    }
}
</style>

