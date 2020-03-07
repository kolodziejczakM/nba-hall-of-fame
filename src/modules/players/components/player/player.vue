<template>
  <section class="player" @click="onClickHandler(details.id)">
    <div>
      <img
        class="star-icon"
        alt="Star icon"
        src="../../../../assets/icons/star.svg"
      />
    </div>
    <div>
      <h2 class="full-name">{{ fullName }}</h2>
      <span class="team-name">{{ details.team.fullName }}</span>
      <img
        class="star-icon-background"
        alt="Star icon"
        src="../../../../assets/icons/star.svg"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Player as IPlayer } from "@/modules/players/players.api";
import router, { routeNames } from "@/router";

@Component
export default class Player extends Vue {
  @Prop({ type: Object, required: true }) public details!: IPlayer;
  public fullName = `${this.details.firstName} ${this.details.lastName}`;
  public onClickHandler = (id: number): void => {
    router.push({
      name: routeNames.dashboard,
      params: { id: String(id) }
    });
  };
}
</script>

<style scoped lang="scss">
.player {
  position: relative;
  cursor: pointer;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px;
  padding: 30px 15px;
  border-radius: 25px;
  min-height: 150px;
}

.player:hover {
  background: var(--color-orange);

  .team-name {
    color: var(--color-primary);
  }

  .star-icon-background {
    opacity: 1;
  }
}

.star-icon {
  width: 20px;
  height: 20px;
}

.star-icon-background {
  position: absolute;
  bottom: 20px;
  right: 20px;
  opacity: 0.1;
  width: 30px;
  height: 30px;
}

.full-name {
  font-size: var(--font-size-secondary-header);
  margin-bottom: 6px;
}
.team-name {
  color: var(--color-red);
}
</style>
