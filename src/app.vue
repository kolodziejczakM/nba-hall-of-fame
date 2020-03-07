<template>
  <section id="app">
    <Header />
    <router-view />
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/common/components/header/header.vue";

@Component({
  components: { Header }
})
export default class App extends Vue {}
</script>
<style lang="scss">
@import "common/styles/global";
</style>
