import { IResponseAPI, Service } from "./service";
import sinon from "sinon";
import { deepStrictEqual } from "assert";

const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";

interface IMock {
  tatooine: Promise<IResponseAPI>;
  alderaan: Promise<IResponseAPI>;
}

const mocks = {
  tatooine: import("../mocks/tatooine.json"),
  alderaan: import("../mocks/alderaan.json"),
} as IMock;

(async () => {
  /* { 
    // VAI PARA INTERNET
    const service = new Service();
    const withoutStub = await service.makeRequest(BASE_URL_1);
    console.log(withoutStub);
  } */

  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name as "makeRequest");

  stub.withArgs(BASE_URL_1).resolves(await mocks.tatooine);
  stub.withArgs(BASE_URL_2).resolves(await mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };
    const results = await service.getPlanets(BASE_URL_1);
    deepStrictEqual(results, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };
    const results = await service.getPlanets(BASE_URL_2);
    deepStrictEqual(results, expected);
  }
})();
