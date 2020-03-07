import { getJSON, routes } from "@/common/services/api.service";
import Cache from "@/common/services/cache.service";

interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  fullName: string;
  name: string;
}

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  heightFeet: number;
  heightInches: number;
  weightPounds: number;
  team: Team;
}

export interface PlayersMetadata {
  totalPages: number;
  currentPage: number;
  nextPage: number;
  perPage: number;
  totalCount: number;
}

export interface PlayersResponse {
  data: Player[];
  meta: PlayersMetadata | null;
}

export interface PlayerAverage {
  gamesPlayed: number;
  playerId: number;
  season: number;
  min: string;
  fgm: number;
  fga: number;
  fg3M: number;
  fg3A: number;
  ftm: number;
  fta: number;
  oreb: number;
  dreb: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  turnover: number;
  pf: number;
  pts: number;
  fgPct: number;
  fg3Pct: number;
  ftPct: number;
}

interface PlayerAverageResponse {
  data: PlayerAverage[];
}

interface RequestDetails {
  page?: number;
  perPage?: number;
  cacheFirst?: boolean;
  cacheResponse?: boolean;
  isLoadMore?: boolean;
}

const playersMeta = {
  page: 0,
  perPage: 25,
  cacheFirst: true,
  cacheResponse: true,
  isLoadMore: false
};

export const getPlayers = async ({
  page = playersMeta.page,
  perPage = playersMeta.perPage,
  cacheFirst = playersMeta.cacheFirst,
  cacheResponse = playersMeta.cacheResponse,
  isLoadMore = playersMeta.isLoadMore
}: RequestDetails = playersMeta): Promise<PlayersResponse> => {
  if (!isLoadMore && Cache.hasPlayers() && cacheFirst) {
    return Cache.getPlayers();
  }

  const data: PlayersResponse = await getJSON(routes.players(), {
    page,
    perPage
  });

  if (cacheResponse) {
    Cache.setPlayers(data, isLoadMore);
  }

  return Cache.getPlayers();
};

const playerMeta = {
  cacheFirst: true,
  cacheResponse: true
};

export const getPlayerById = async (
  id: number,
  {
    cacheFirst = playerMeta.cacheFirst,
    cacheResponse = playerMeta.cacheResponse
  }: RequestDetails = playerMeta
): Promise<Player | null> => {
  if (Cache.hasPlayerWithId(id) && cacheFirst) {
    return Cache.getPlayerById(id);
  }

  const data: Player = await getJSON(routes.player(String(id)));

  if (cacheResponse) {
    Cache.setPlayer(data);
  }

  return Cache.getPlayer();
};

export const getPlayerSeasonAverages = async (
  playerId: number,
  season: number,
  {
    cacheFirst = playerMeta.cacheFirst,
    cacheResponse = playerMeta.cacheResponse
  }: RequestDetails = playerMeta
): Promise<PlayerAverage[] | null> => {
  if (Cache.hasPlayerSeasonAverages(playerId, season) && cacheFirst) {
    return Cache.getPlayerSeasonAverages();
  }
  const response: PlayerAverageResponse = await getJSON(
    routes.seasonAverages(),
    {
      playerIds: [playerId],
      season
    }
  );

  if (cacheResponse) {
    Cache.setPlayerSeasonAverages(response.data);
  }

  return Cache.getPlayerSeasonAverages();
};
