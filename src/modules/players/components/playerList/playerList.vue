<template>
  <ul class="player-list">
    <li class="player-wrapper" v-for="player in players" :key="player.id">
      <Player v-bind:details="player" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Player from "@/modules/players/components/player/player.vue";
import { Player as IPlayer } from "@/modules/players/players.api";

@Component({
  components: {
    Player
  }
})
export default class PlayerList extends Vue {
  @Prop({ type: Array, required: true }) public players!: IPlayer[];
}
</script>

<style scoped lang="scss">
.player-list {
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.player-wrapper {
  margin-bottom: 5px;
}
</style>
