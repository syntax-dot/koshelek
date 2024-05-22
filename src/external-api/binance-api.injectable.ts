import {Spot} from "@binance/connector-typescript";
import {createInjectable} from "../utils/composition/create-injectable";

const BASE_URL = '/binance';

export const binanceApiInjectable = createInjectable(() => {
  const client = new Spot('', '', {
    baseURL: BASE_URL,
  });

  return {client}
})
