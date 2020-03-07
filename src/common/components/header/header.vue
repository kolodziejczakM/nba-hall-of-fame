<template>
  <header class="header">
    <Logo />
    <h1 class="heading">{{ heading }}</h1>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Logo from "../logo/logo.vue";

@Component({
  components: { Logo }
})
export default class Header extends Vue {
  heading = "NBA - Hall of Fame";
}
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  align-items: center;
  background: var(--color-gray-blue);
  color: var(--color-white);
  padding: 8px;
}
.heading {
  font-size: var(--font-size-header);
  line-height: 28px;
}
</style>
