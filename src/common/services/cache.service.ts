import {
  PlayersResponse,
  Player,
  PlayerAverage
} from "@/modules/players/players.api";

interface CacheState {
  players: PlayersResponse;
  player: Player | null;
  playerSeasonAverages: PlayerAverage[] | null;
}

class Cache {
  private state: CacheState = {
    players: {
      data: [],
      meta: null
    },
    player: null,
    playerSeasonAverages: null
  };

  public getPlayers(): PlayersResponse {
    return this.state.players;
  }

  public hasPlayers(): boolean {
    return Boolean(this.state.players.data.length);
  }

  public setPlayers(
    { data, meta }: PlayersResponse,
    isLoadMore: boolean
  ): void {
    this.state.players = {
      data: isLoadMore ? [...this.state.players.data, ...data] : data,
      meta
    };
  }

  public getPlayerById(id: number): Player {
    const player = this.state.players.data.find(
      (player: Player) => player.id === id
    ) as Player;
    this.setPlayer(player);

    return this.getPlayer() as Player;
  }

  public hasPlayerWithId(id: number): boolean {
    return this.getPlayers().data.some((player: Player) => player.id === id);
  }

  public setPlayer(data: Player): void {
    this.state.player = data;
  }

  public getPlayer(): Player | null {
    return this.state.player;
  }

  public getPlayerSeasonAverages(): PlayerAverage[] | null {
    return this.state.playerSeasonAverages;
  }

  public hasPlayerSeasonAverages(playerId: number, season: number): boolean {
    const first = this.state.playerSeasonAverages?.[0];
    return first?.playerId === playerId && first.season === season;
  }

  public setPlayerSeasonAverages(data: PlayerAverage[]): void {
    this.state.playerSeasonAverages = data;
  }
}

export default new Cache();
