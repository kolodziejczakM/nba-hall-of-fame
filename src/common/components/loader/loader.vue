<template>
  <img
    class="loader"
    v-bind:width="size"
    v-bind:height="size"
    alt="Loader"
    src="../../../assets/icons/ball.svg"
  />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Loader extends Vue {
  @Prop({ type: Number, default: 80 }) public size!: number;
}
</script>
<style scoped lang="scss">
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  animation: spin 2.5s linear infinite;
  transition-property: transform;
}
</style>
