import {createInjectable} from "../utils/composition/create-injectable";
import Axios from "axios";

const BASE_URL = 'https://api.binance.com/api/v3';

export const binanceApiInjectable = createInjectable(() => {
  // TODO not working in hosting
  // const client = new Spot('', '', {
  //   baseURL: BASE_URL,
  // });
  //
  // return {client}
  const client = Axios.create({
    baseURL: BASE_URL,
  });
  return {client}
})
