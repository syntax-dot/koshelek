import {createInjectable} from "../utils/composition/create-injectable";
import {webSocket} from "rxjs/webSocket";

const WS_BASE_URL = 'wss://fstream.binance.com/ws/stream';

export const binanceWsInjectable = createInjectable(() => {
  let reqID = 0

  const binance$ = webSocket({
    url: WS_BASE_URL
  });

  function subscribeForSymbols(symbols: string[]) {

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


  return {binance$, subscribeForSymbols}
})
