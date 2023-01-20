import https from "https";

export interface IResponseAPI {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export class Service {
  async makeRequest(url: string) {
    return new Promise<IResponseAPI>((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => resolve(JSON.parse(data)));
        response.on("error", () => reject);
      });
    });
  }
  async getPlanets(url: string) {
    const { name, surface_water, films } = await this.makeRequest(url);

    return {
      name,
      surfaceWater: surface_water,
      appearedIn: films.length,
    };
  }
}

/* (async () => {
  const response = await new Service().makeRequest(
    "https://swapi.dev/api/planets/1/"
  );
  console.log("response", response);
})(); */
