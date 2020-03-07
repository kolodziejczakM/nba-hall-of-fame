<template>
  <section class="dashboard">
    <h1 class="player-full-name">{{ getFullName() }}</h1>
    <div class="season-stats-wrapper" v-if="seasonStats">
      <h2 class="games-played">
        <strong class="games-played-number">{{ getGamesPlayed() }}</strong>
        <span class="games-played-label">{{ gamesPlayedMessage }}</span>
        <span class="season-label">{{ season }}</span>
      </h2>
      <div>
        <div class="radial-charts-wrapper" v-if="!isPlayerWithoutGames()">
          <apexchart
            width="280"
            type="radialBar"
            :options="fieldGoalOptions"
            :series="fieldGoalSeries"
          ></apexchart>
          <apexchart
            width="280"
            type="radialBar"
            :options="turnoverOptions"
            :series="turnoverSeries"
          ></apexchart>
        </div>

        <div v-if="isPlayerWithoutGames()" class="no-data-placeholder-message">
          {{ this.noDataMessage }}
        </div>
      </div>
    </div>
    <div class="season-stats-wrapper" v-if="!isPlayerWithoutGames()">
      <h2>{{ reboundingMessage }}</h2>
      <apexchart
        type="bar"
        :options="barOptions"
        :series="barSeries"
        :height="300"
      ></apexchart>
    </div>
    <div class="loader-wrapper" v-show="isFetching">
      <Loader />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router";
import Loader from "@/common/components/loader/loader.vue";
import {
  getPlayerById,
  getPlayerSeasonAverages,
  Player as IPlayer,
  PlayerAverage
} from "@/modules/players/players.api";

@Component({
  components: { Loader }
})
export default class Dashboard extends Vue {
  // TODO: translations mechanism
  reboundingMessage = "Rebounding";
  gamesPlayedMessage = "games played in";
  noDataMessage = "Sorry, not enough data ;(";
  isFetching = true;
  season = 2018;
  player: IPlayer | null = null;
  seasonStats: PlayerAverage[] | null = null;

  fieldGoalOptions = {
    labels: ["Field Goal"],
    colors: ["#D94E4E"]
  };

  fieldGoalSeries: string[] = [];

  turnoverOptions = {
    labels: ["Turnover"],
    colors: ["#D94E4E"]
  };

  turnoverSeries: string[] = [];

  barOptions = {
    colors: ["#1D428A"],
    xaxis: {
      categories: [["Offensive"], ["Defensive"]],
      labels: {
        style: {
          colors: ["#D94E4E"],
          fontSize: "14px"
        }
      }
    }
  };

  barSeries = [
    {
      data: [0, 0]
    }
  ];

  async created(): Promise<void> {
    this.player = await getPlayerById(Number(router.currentRoute.params.id));
    this.seasonStats = await getPlayerSeasonAverages(
      this.player!.id,
      this.season
    );

    this.isFetching = false;
    this.fillRadialCharts();
    this.fillBarChart();
  }

  fillRadialCharts(): void {
    const fgPct = this.convertPercentageValues(
      this.seasonStats?.[0]?.fgPct as number
    );
    const turnover = this.convertPercentageValues(
      this.seasonStats?.[0]?.turnover as number
    );
    this.fieldGoalSeries = [fgPct];
    this.turnoverSeries = [turnover];
  }

  fillBarChart(): void {
    const stats = this.seasonStats?.[0];
    const oreb = stats?.oreb as number;
    const dreb = stats?.dreb as number;

    this.barSeries[0].data = [oreb, dreb];
  }

  getFullName(): string {
    return this.player
      ? `${this.player.firstName} ${this.player.lastName}`
      : "";
  }

  getGamesPlayed(): number | undefined {
    return this.seasonStats?.[0]?.gamesPlayed || 0;
  }

  isPlayerWithoutGames(): boolean {
    return this.getGamesPlayed() === 0;
  }

  convertPercentageValues(val: number): string {
    return (val * 100).toFixed();
  }
}
</script>
<style scoped lang="scss">
@import "../common/styles/theme/colors";
@import "../common/styles/theme/mediaQueries";

.dashboard {
  display: flex;
  flex-direction: column;
  padding: 25px;
}
.player-full-name {
  display: block;
  font-size: var(--font-size-header);
  line-height: var(--font-size-header);
  margin-bottom: 25px;
}

.season-stats-wrapper {
  padding: 20px;
  background: $orange-a01;
  border-radius: 25px;
  margin-bottom: 15px;
}

.games-played {
  display: flex;
  align-items: center;
  padding: 5px;
  margin-bottom: 30px;

  @media (max-width: $media-440) {
    flex-direction: column;

    .games-played-number {
      margin-right: 0;
    }

    .games-played-label {
      margin-right: 0;
    }
  }
}

.games-played-number {
  line-height: 60px;
  font-size: var(--font-size-banner);
  margin-right: 15px;
}

.games-played-label {
  margin-right: 15px;
  color: var(--color-orange);
  line-height: 28px;
}

.season-label {
  font-size: var(--font-size-banner);
  line-height: 60px;
}

.radial-charts-wrapper {
  max-width: 600px;
  display: grid;
  gap: 10px;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
}

.no-data-placeholder-message {
  width: 100%;
  display: flex;
  padding: 25px;
  color: var(--color-red);
  font-size: var(--font-size-header);
  line-height: 34px;
}

.loader-wrapper {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
