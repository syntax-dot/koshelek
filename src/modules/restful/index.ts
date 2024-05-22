import {Spot} from '@binance/connector-typescript';
import {Axios} from "axios";

const API_KEY = '';
const API_SECRET = '';
const BASE_URL = 'https://testnet.binance.vision';

const client = new Spot(API_KEY, API_SECRET, {baseURL: BASE_URL});
export const api = new Axios({
  baseURL: BASE_URL
})
