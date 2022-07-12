<template>
    <!--Skeleton-->
    <a-skeleton active :paragraph="{ rows: 8 }" />
</template>

<!--========Script========-->
<script>
export default {
    mounted() {
        setTimeout(() => {
            this.$emit('loading', true)
        }, 2000)
    },
};
</script>