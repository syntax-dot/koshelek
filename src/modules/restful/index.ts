import {Spot} from '@binance/connector-typescript';

const API_KEY = '';
const API_SECRET = '';
const BASE_URL = 'https://testnet.binance.vision';

const client = new Spot(API_KEY, API_SECRET, {baseURL: BASE_URL});
client.exchangeInformation().then((res) => {
  console.log(res);
}).catch(err => {
  console.log(err)
});
