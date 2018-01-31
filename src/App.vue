<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted: function () {
            this.$store.dispatch("LOAD_PHOTOS");
        }
    }
</script>

<style lang="scss">
    @import 'main.scss';
</style>
