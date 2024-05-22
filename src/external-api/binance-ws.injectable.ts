import {createInjectable} from "../utils/composition/create-injectable";
import {webSocket} from "rxjs/webSocket";

const BASE_URL = '/binance';


export const binanceWsInjectable = createInjectable(() => {
  let reqID = 0

  const binance$ = webSocket({
    url: 'wss://fstream.binance.com/ws/stream',
    // serializer: (value) => JSON.stringify(value),
    // deserializer: (value) => JSON.parse(value.data),
  });

  function subscribe(symbols: string[]) {

    return binance$.multiplex(
      () => (
        {
          method: "SUBSCRIBE",
          params: symbols,
          id: ++reqID
        }
      ),
      () => (
        {
          method: "UNSUBSCRIBE",
          params: symbols,
          id: ++reqID
        }
      ),
      msg => msg.e === 'depthUpdate'
    )
  }

  return {binance$, subscribe}
})
