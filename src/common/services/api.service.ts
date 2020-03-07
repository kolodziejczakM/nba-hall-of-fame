import qs from "query-string";
import { camelize, decamelize } from "@ridi/object-case-converter";

const versionSign = "v1";
const basePath = `https://www.balldontlie.io/api/${versionSign}`;

export const routes = {
  players: () => "players",
  player: (id: string) => `players/${id}`,
  seasonAverages: () => "season_averages"
} as const;

type RouteKey = keyof typeof routes;
type Route = typeof routes[RouteKey];

const captureInvalidResponse = (invalidResponse: Response): void => {
  // TODO: send error to monitoring service e.g. Sentry
};

const handleResponseErrors = (response: Response): Promise<any> => {
  if (!response.ok) {
    captureInvalidResponse(response);
    throw Error(response.statusText);
  }

  return response.json();
};

const normalize = <T>(data: T): T => camelize(data, { recursive: true });

export const getJSON = <T>(
  route: ReturnType<Route>,
  queryParams = {}
): Promise<T> => {
  const query: string = qs.stringify(decamelize(queryParams), {
    arrayFormat: "bracket"
  });

  return fetch(`${basePath}/${route}?${query}`)
    .then(handleResponseErrors)
    .then(normalize)
    .catch((error: string) => {
      console.warn(error);
    });
};
