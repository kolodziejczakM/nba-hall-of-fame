<template>
  <section class="home">
    <div class="player-list-wrapper">
      <PlayerList v-bind:players="players" />
    </div>
    <div class="loader-wrapper" v-show="isFetching">
      <Loader />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getPlayers,
  Player as IPlayer,
  PlayersResponse
} from "@/modules/players/players.api";
import PlayerList from "@/modules/players/components/playerList/playerList.vue";
import Loader from "@/common/components/loader/loader.vue";
import throttle from "lodash.throttle";

@Component({
  components: {
    PlayerList,
    Loader
  }
})
export default class Home extends Vue {
  players: IPlayer[] = [];
  metadata: PlayersResponse["meta"] = null;
  isFetching = true;

  assignFetched(players: PlayersResponse): void {
    this.players = players.data;
    this.metadata = players.meta;
    this.isFetching = false;
  }

  async created(): Promise<void> {
    const players = await getPlayers();
    this.assignFetched(players);
    window.addEventListener("scroll", this.handleScroll);
  }

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll: () => void = throttle(this.onScroll, 300);

  onScroll() {
    if (this.shouldLoadMore()) {
      this.loadMore();
    }
  }

  shouldLoadMore(): boolean {
    const preventingScrollStopThreshold = 150;
    return (
      this.canLoadMore() &&
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - preventingScrollStopThreshold
    );
  }

  canLoadMore(): boolean {
    return (
      !this.isFetching &&
      this.metadata?.currentPage !== this.metadata?.totalPages
    );
  }

  async loadMore(): Promise<void> {
    this.isFetching = true;

    const players = await getPlayers({
      page: this.metadata!.nextPage,
      isLoadMore: true
    });

    this.assignFetched(players);
  }
}
</script>
<style scoped lang="scss">
.home {
  display: flex;
  margin: 0 auto;
  padding: 25px;
  max-width: 1200px;
}

.player-list-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.loader-wrapper {
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
