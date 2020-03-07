<template>
  <router-link to="/">
    <img
      v-bind:width="size"
      v-bind:height="size"
      alt="Application logo"
      src="../../../assets/icons/basket.svg"
    />
  </router-link>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {
  @Prop({ type: Number, default: 75 }) public size!: number;
}
</script>
