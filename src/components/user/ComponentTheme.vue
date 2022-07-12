<template>
    <!--Theme-->
    <a-switch :checked="theme" @change="doChangeTheme">
        <!--On-->
        <template #checkedChildren>
            <i class="fa-solid fa-sun"></i>
        </template>
        <!--Off-->
        <template #unCheckedChildren>
            <i class="fa-solid fa-moon"></i>
        </template>
    </a-switch>
</template>

<!--========Script========-->
<script>
export default {
    data() {
        return {
            theme: null,
        }
    },

    created() {
        if (localStorage.theme === "true") {
            this.theme = true
            document.querySelector("html").setAttribute("data-theme", "Dark-Mode")
        }
    },

    methods: {
        doChangeTheme(checked) {
            if (checked) {
                document.querySelector("html").setAttribute("data-theme", "Dark-Mode")
            } else {
                document.querySelector("html").setAttribute("data-theme", "")
            }
            this.theme = checked
            localStorage.setItem('theme', checked)
        }
    },
}
</script>
